import React from 'react'

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

const LINEAR_PROGRESS_REFRESH_RATE = 300;

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
        console.log('setting progress to ' + (this.props.transitionProgress + LINEAR_PROGRESS_REFRESH_RATE))
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

      console.log('moving to slide: ' + nextSlideIndex)
      this.props.setProgressBarValue(0)
      this.setState({
        currentSlideIndex: nextSlideIndex,
        currentSlide: this.props.presentation.slides[nextSlideIndex]
      })
      this.setState({ transitioning: false })
    }
  }

  onSlideChange (index, element) {
    var currentSlide = this.props.presentation.slides[index]
    this.setState({
      currentSlide: currentSlide,
      currentSlideIndex: index
    })

    // set title
    this.props.setAppTitle(currentSlide.title)
    // hide app bar on image slides
    this.props.hideAppBar(currentSlide.type === IMAGE_SLIDE_TYPE)

    scroll(0,0)
  }

  hideAppBar (hide) {
    this.setState({ hideAppBar: hide })
  }

  handleImageScroll (event) {
    if (this.state.currentSlide.type === IMAGE_SLIDE_TYPE) {
      scroll(0,0)
    }
  }

  buildSwipeComponent () {
    return (
      <div className='kiosk-swiper'>
        <ReactSwipe
          continuous={this.props.presentation.slides.length > 2}
          onTouchStart={(event) => this.props.onInteraction(event)}
          onTouchEnd={(event) => this.handleImageScroll(event)}
          slideToIndex={this.state.currentSlideIndex}
          key='react-swipe'
          callback={(index, element) => this.onSlideChange(index, element)}>
          {this.props.presentation.slides.map(function (item, index) {
            if (item.type === EVENT_LIST_SLIDE_TYPE) {
              return (
                <div key={'eventListWrapper' + index}>
                  <EventView
                    {...this.props}
                    events={item.events}
                    title={this.state.currentSlide ? this.state.currentSlide.title : ''}
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
                  />
                </div>
              )
            }
          }.bind(this))}
        </ReactSwipe>
      </div>
    )
  }

  render () {
    var progressBarClasses = 'progressBar'

    // if slides have not yet been added to state, render nothing.
    var reactSwipeComponent = <div />

    if (this.props.presentation.slides) {
      reactSwipeComponent = this.buildSwipeComponent()
    }

    return (
      <div className='kiosk-presentation' onClick={(event) => this.props.onInteraction(event)}>
        {reactSwipeComponent}
      </div>
    )
  }
}

export default PresentationView
