import AppBar from 'material-ui/lib/app-bar'
import LeftNav from 'material-ui/lib/left-nav'
import MenuItem from 'material-ui/lib/menus/menu-item'
import Divider from 'material-ui/lib/divider'

import LinearProgress from 'material-ui/lib/linear-progress'

import ReactSwipe from 'react-swipe'
import EventListView from './EventListView'

const EVENT_LIST_SLIDE_TYPE = 'eventList'
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
        slides: []
      },
      transitionProgress: 0,
      pauseTimeOnTouch: 5000,
      allowInput: true
    }
  }

  componentDidMount () {
    var presentation = fetch('./example-data.json').then(function (response) {
      return response.json()
    }).then(function (content) {
      content.currentSlide = content.presentation.slides[0]
      content.currentSlideIndex = 0
      content.slides = content.presentation.slides

      this.setState(content)

      // Start slideshow timer when view is mounted
      if (this.state.presentation.transitionTime > 0) {
        requestAnimationFrame(this.handleTransitionTimer.bind(this))
      }
    }.bind(this))
  }

  handleClick (event) {
    if (this.state.allowInput) {
      if (this.state.activityTime) {
        clearTimeout(this.state.activityTimer)
      }
      this.setState({
        interactiveMode: true, transitionProgress: 0, start: null,
        activityTimer: setTimeout(this.handleInactivityTimer.bind(this), this.state.pauseTimeOnTouch)
      })
    }
  }

  componentWillUnmount () {
    clearTimeout(this.state.activityTimer)
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
      } else {
        this.setState({transitionProgress: 0, start: timestamp})
        requestAnimationFrame(this.handleTransitionTimer.bind(this))
      }
    }
  }

  handleInactivityTimer () {
    this.setState({interactiveMode: false})
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
  }

  render () {
    var slides = this.state.presentation.slides

    var progressBarClasses = 'progressBar'

    if (this.state.transitionProgress === 0) {
      // Allows the removal of the transition from full to empty
      progressBarClasses += ' empty'
    }

    var reactSwipeContent = <div />

    if (this.state.slides) {
      reactSwipeContent = (
        <ReactSwipe
          shouldUpdate={() => true}
          callback={(index, element) => this.onSlideChange(index, element)}>
          {this.state.slides.map(function (item, index) {
            if (item.type === EVENT_LIST_SLIDE_TYPE) {
              return <EventListView key={index} events={item.events}/>
            } else if (item.type === IMAGE_SLIDE_TYPE) {
              return (
                <div key={index}>
                  <img src={item.img} key={index} />
                </div>
              )
            }
          })}
        </ReactSwipe>
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
            transition: 'opacity'
          }}
        />
        <LeftNav
          open={this.state.navOpen}
          onRequestChange={navOpen => this.setState({navOpen})}
          docked={false}>
          <MenuItem>À propos du lab</MenuItem>
          <Divider />
          {slides.map(function (item, index) {
            return (<MenuItem key={index}>{item.title}</MenuItem>)
          })}
        </LeftNav>
        {reactSwipeContent}
      </div>
    )
  }
}

export default PresentationView
