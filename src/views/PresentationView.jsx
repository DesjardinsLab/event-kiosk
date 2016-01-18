import AppBar from 'material-ui/lib/app-bar'
import LeftNav from 'material-ui/lib/left-nav'
import MenuItem from 'material-ui/lib/menus/menu-item'
import Divider from 'material-ui/lib/divider'

import LinearProgress from 'material-ui/lib/linear-progress'

import ReactSwipe from 'react-swipe'
import EventView from './EventView'
import EventDetailView from './EventDetailView'

import ObjectHash from 'object-hash'

const EVENT_LIST_SLIDE_TYPE = 'eventList'
const EVENT_SLIDE_TYPE = 'event'
const IMAGE_SLIDE_TYPE = 'image'

export class PresentationView extends React.Component {

  constructor (props) {
    super()

    this.state = {
      start: null,
      interactiveMode: false,
      navOpen: false,
      presentation: {
        transitionTime: 0,
        pauseTimeOnTouch: 60000,
        slides: []
      },
      transitionProgress: 0,
      allowInput: true
    }
  }

  componentDidMount () {
    this.getPresentation()
    this.setState({reloadInterval: setInterval(this.getPresentation.bind(this), 60000)})
  }

  componentWillUnmount () {
    clearTimeout(this.state.activityTimer)
    clearInterval(this.state.reloadInterval)
  }

  getPresentation () {
    var url = typeof PRESENTATION_SOURCE !== 'undefined' ? PRESENTATION_SOURCE : 'example-data.json'

    fetch(url).then(function (response) {
      return response.json()
    }).then(function (content) {
      // If data changed, reload page.
      var hashedData = ObjectHash(content, {algorithm: 'md5'})
      if (this.state.dataHash && hashedData !== this.state.dataHash) {
        location.reload()
      }
      this.setState({ dataHash: hashedData })

      content.currentSlide = content.presentation.slides[0]
      content.currentSlideIndex = 0
      content.slides = content.presentation.slides

      this.setState(content)

      // Start slideshow timer when view is mounted
      if (this.state.presentation.transitionTime > 0) {
        requestAnimationFrame(this.handleTransitionTimer.bind(this))
      }
    }.bind(this)).catch(function (error) {
      console.log(error)
      console.log('Error while fetching data. Will try again in a minute.')
    })
  }

  handleClick (event) {
    if (this.state.allowInput) {
      if (this.state.activityTimer) {
        clearTimeout(this.state.activityTimer)
      }
      this.setState({
        interactiveMode: true, transitionProgress: 0, start: null,
        activityTimer: setTimeout(this.handleInactivityTimer.bind(this), this.state.presentation.pauseTimeOnTouch)
      })
    }
  }

  handleTransitionTimer (timestamp) {
    var timeElapsed = 0

    if (!this.state.start) {
      this.setState({start: timestamp})
    } else {
      timeElapsed = timestamp - this.state.start
    }

    if (!this.state.interactiveMode) {
      var transitionTime = this.state.presentation.transitionTime

      if (timeElapsed < this.state.presentation.transitionTime) {
        this.setState({transitionProgress: timeElapsed*100/this.state.presentation.transitionTime})
        requestAnimationFrame(this.handleTransitionTimer.bind(this))
      } else { // Reset progress bar to 0 and go to next slide
        // Figure out which slide is "next"
        var nextSlideIndex = this.state.currentSlideIndex + 1
        if (nextSlideIndex > this.state.slides.length) { nextSlideIndex = 0 }

        this.setState({
          transitionProgress: 0,
          start: timestamp,
          currentSlideIndex: nextSlideIndex,
          currentSlide: this.state.presentation.slides[nextSlideIndex]
        })
        requestAnimationFrame(this.handleTransitionTimer.bind(this))
      }
    }
  }

  handleInactivityTimer () {
    this.setState({
      interactiveMode: false
    })
    requestAnimationFrame(this.handleTransitionTimer.bind(this))
  }

  toggleNav (event) {
    this.setState({navOpen: !this.state.navOpen})
  }

  onSlideChange (index, element) {
    this.setState({
      currentSlide: this.state.presentation.slides[index],
      currentSlideIndex: index
    })

    console.log(element)
    console.log(index)

    scroll(0,0)
  }

  handleImageScroll(event) {
    if (this.state.currentSlide.type === IMAGE_SLIDE_TYPE) {
      scroll(0,0)
    }
  }

  render () {
    var slides = this.state.presentation.slides

    var progressBarClasses = 'progressBar'

    if (this.state.transitionProgress === 0) {
      // Allows the removal of the transition from full to empty
      progressBarClasses += ' empty'
    }

    var reactSwipeComponent = <div />

    if (this.state.slides) {
      reactSwipeComponent = (
        <div className='kiosk-swiper'>
          <ReactSwipe
            continuous={this.state.slides.length > 2}
            onTouchStart={(event) => this.handleClick(event)}
            onTouchEnd={(event) => this.handleImageScroll(event)}
            slideToIndex={this.state.currentSlideIndex}
            key='react-swipe'
            callback={(index, element) => this.onSlideChange(index, element)}>
            {this.state.slides.map(function (item, index) {
              if (item.type === EVENT_LIST_SLIDE_TYPE) {
                return (
                  <div key={'eventListWrapper' + index}>
                    <EventView
                      {...this.props}
                      events={item.events}
                      monthFormat={this.props.monthFormat}
                      dateFormat={this.props.dateFormat}
                      timeIntervalFormat={this.props.timeIntervalFormat}
                      pauseTimeOnTouch={this.state.presentation.pauseTimeOnTouch}
                    />
                  </div>
                )
              } else if (item.type === IMAGE_SLIDE_TYPE) {
                return (
                  <div key={'imgWrapper' + index} style={{backgroundImage: 'url('+item.img+')', backgroundSize: 'cover', height: '100vh'}}/>
                )
              } else if (item.type === EVENT_SLIDE_TYPE) {
                return (
                  <div key={'eventWrapper' + index}>
                    <EventView
                      {...this.props}
                      event={item.event}
                      isStatic={true}
                      pauseTimeOnTouch={this.state.presentation.pauseTimeOnTouch}
                    />
                  </div>
                )
              }
            }.bind(this))}
          </ReactSwipe>
        </div>
      )
    }

    return (
      <div className='kiosk-presentation' style={this.state.allowInput ? {} : {pointerEvents: 'none'}} onClick={(event) => this.handleClick(event)}>
        <LinearProgress
          className={progressBarClasses}
          mode='determinate'
          value={this.state.transitionProgress}
        />
        <AppBar
          title='Événement'
          onLeftIconButtonTouchTap={(event) => this.toggleNav(event)}
          zDepth={0}
          style={{
            opacity: (this.state.interactiveMode ? 1 : 0),
            transition: 'opacity .75s ease-in-out',
            display: 'none'
          }}
        />
        <LeftNav
          open={this.state.navOpen}
          onRequestChange={navOpen => this.setState({navOpen})}
          docked={false}>
          {slides.map(function (item, index) {
            return (
              <MenuItem key={index} onClick={() => function() {
                this.setState({currentSlideIndex: index})
              }}>
                {item.title}
              </MenuItem>
            )
          })}
        </LeftNav>
        {reactSwipeComponent}
      </div>
    )
  }
}

export default PresentationView
