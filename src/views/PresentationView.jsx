import React from 'react'

import AppBar from 'material-ui/lib/app-bar'
import LeftNav from 'material-ui/lib/left-nav'
import MenuItem from 'material-ui/lib/menus/menu-item'
import Divider from 'material-ui/lib/divider'

import IconButton from 'material-ui/lib/icon-button'
import NavigationBack from 'material-ui/lib/svg-icons/navigation/arrow-back'

import LinearProgress from 'material-ui/lib/linear-progress'

import ReactSwipe from 'react-swipe'
import EventView from './EventView'
import EventDetailView from './EventDetailView'

import ObjectHash from 'object-hash'

const EVENT_LIST_SLIDE_TYPE = 'eventList'
const EVENT_SLIDE_TYPE = 'event'
const IMAGE_SLIDE_TYPE = 'image'

const LINEAR_PROGRESS_REFRESH_RATE = 250;

export class PresentationView extends React.Component {
  constructor () {
    super()

    this.state = {
      transitionProgress: 0
    }
  }

  componentDidMount () {
    var currentSlide = this.props.presentation.slides[0]
    this.setState({
      currentSlideIndex: 0,
      currentSlide: currentSlide
    })
    this.props.setAppTitle(currentSlide.title)
    this.props.hideAppBar(currentSlide.type === IMAGE_SLIDE_TYPE && !this.props.interactiveMode)

    // Start slideshow timer when view is mounted
    if (this.props.presentation.transitionTime > 0 && !this.state.progressRefreshInterval) {
      this.setState({ progressRefreshInterval: setInterval(this.handleTransitionTimer.bind(this), LINEAR_PROGRESS_REFRESH_RATE) })
    }
  }

  componentWillUnmount () {
    clearInterval(this.state.progressRefreshInterval)
  }

  handleTransitionTimer () {
    if (!this.props.interactiveMode) {
      if (this.props.transitionProgress < this.props.presentation.transitionTime) {
        this.props.setProgressBarValue(this.props.transitionProgress + LINEAR_PROGRESS_REFRESH_RATE)
      } else {
        this.doTransition()
      }
    }
  }

  doTransition () {
    // Reset progress bar to 0 and go to next slide
    // Figure out which slide is "next"
    if (!this.state.transitioning) {
      this.setState({ transitioning: true })
      var nextSlideIndex = this.state.currentSlideIndex + 1
      if (nextSlideIndex > this.props.presentation.slides.length) { nextSlideIndex = 0 }

      this.props.setProgressBarValue(0)
      this.setState({
        currentSlideIndex: nextSlideIndex,
        currentSlide: this.props.presentation.slides[nextSlideIndex]
      })
      this.setState({ transitioning: false })
    }
  }

  handleTouch (event) {
    this.props.hideAppBar(false)
  }

  onSlideChange (index, element) {
    var currentSlide = this.props.presentation.slides[index]
    this.setState({
      currentSlide: currentSlide,
      currentSlideIndex: index
    })

    // set title
    this.props.setAppTitle(currentSlide.title)
    this.props.hideAppBar(currentSlide.type === IMAGE_SLIDE_TYPE && !this.props.interactiveMode)

    scroll(0,0)
  }

  setSelectedEvent (event) {
    this.props.setAppTitle(event.shortTitle ? event.shortTitle : event.title)
    this.props.setAppBarIconElementLeft(<IconButton onClick={() => this.clearSelectedEvent()}><NavigationBack/></IconButton>)

    this.setState({
      selectedEvent: event,
      eventDetailTimer: setTimeout(this.clearSelectedEvent.bind(this), this.props.presentation.pauseTimeOnTouch)
    })
    scroll(0,0)
  }

  clearSelectedEvent () {
    this.props.setAppTitle(this.state.currentSlide.title)
    this.props.setAppBarIconElementLeft()

    if (this.state.eventDetailTimer) {
      clearTimeout(this.state.eventDetailTimer)
    }

    this.setState({
      selectedEvent: null
    })
  }

  buildSwipeComponent () {
    return (
      <div className='kiosk-swiper' onTouchStart={((event) => this.handleTouch(event))} onTouchEnd={(event) => this.props.onInteraction(event)}>
        <ReactSwipe
          continuous={this.props.presentation.slides.length > 2}
          slideToIndex={this.state.currentSlideIndex}
          startSlide={this.state.currentSlideIndex}
          key='react-swipe'
          callback={(index, element) => this.onSlideChange(index, element)}>
          {this.props.presentation.slides.map(function (item, index) {
            if (item.type === EVENT_LIST_SLIDE_TYPE) {
              return (
                <div key={index}>
                  <EventView
                    {...this.props}
                    {...item}
                    selectedEvent={this.state.selectedEvent}
                    title={this.state.currentSlide ? this.state.currentSlide.title : ''}
                    setSelectedEvent={(value) => this.setSelectedEvent(value)}
                    clearSelectedEvent={() => this.clearSelectedEvent()}
                  />
                </div>
              )
            } else if (item.type === IMAGE_SLIDE_TYPE) {
              return (
                <div key={index} style={{backgroundImage: 'url('+item.img+')', backgroundSize: 'cover', height: '100vh'}}/>
              )
            } else if (item.type === EVENT_SLIDE_TYPE) {
              return (
                <div key={index}>
                  <EventView
                    {...this.props}
                    event={item.event}
                    isStatic={true}
                  />
                </div>
              )
            }
          }.bind(this))}
        </ReactSwipe>
        <div className='navDots'>
          {this.props.presentation.slides.map(function (item, index) {
            return (
              <div key={index} className={'navDot ' + (this.state.currentSlideIndex === index ? 'active' : 'inactive')} />
            )
          }.bind(this))}
        </div>
      </div>
    )
  }

  render () {
    // if slides have not yet been added to state, render nothing.
    var reactSwipeComponent = <div />

    if (this.props.presentation.slides) {
      reactSwipeComponent = this.buildSwipeComponent()
    }

    /*
     * render single EventView if in detail mode (selectedEvent is set),
     * else render slideshow.
     */
    return (
      <div className='kiosk-presentation'>
        {this.state.selectedEvent ?
          <div>
            {this.props.presentation.slides.filter(function (item) {
              return item.type === EVENT_LIST_SLIDE_TYPE
            }).map(function (item, index) {
                return (
                  <div key={index}>
                    <EventView
                      {...this.props}
                      {...item}
                      selectedEvent={this.state.selectedEvent}
                      title={this.state.currentSlide ? this.state.currentSlide.title : ''}
                      setSelectedEvent={(value) => this.setSelectedEvent(value)}
                      clearSelectedEvent={() => this.clearSelectedEvent()}
                    />
                  </div>
                )}.bind(this))}
          </div> :
          reactSwipeComponent}
      </div>
    )
  }
}

export default PresentationView
