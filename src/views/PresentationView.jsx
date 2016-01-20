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
  componentDidMount () {
    // Start slideshow timer when view is mounted
    if (this.props.transitionTime > 0 && !this.state.progressRefreshInterval) {
      this.setState({ progressRefreshInterval: setInterval(this.handleTransitionTimer.bind(this), LINEAR_PROGRESS_REFRESH_RATE) })
    }
  }

  handleTransitionTimer () {
    if (!this.props.interactiveMode) {
      if (this.state.transitionProgress + LINEAR_PROGRESS_REFRESH_RATE < this.state.presentation.transitionTime) {
        this.setState({transitionProgress: this.state.transitionProgress ? this.state.transitionProgress + LINEAR_PROGRESS_REFRESH_RATE : LINEAR_PROGRESS_REFRESH_RATE})
      } else { // Reset progress bar to 0 and go to next slide
        // Figure out which slide is "next"
        var nextSlideIndex = this.state.currentSlideIndex + 1
        if (nextSlideIndex > this.state.slides.length) { nextSlideIndex = 0 }

        this.setState({
          transitionProgress: 0,
          currentSlideIndex: nextSlideIndex,
          currentSlide: this.state.presentation.slides[nextSlideIndex]
        })
      }
    }
  }

  onSlideChange (index, element) {
    this.setState({
      currentSlide: this.state.presentation.slides[index],
      currentSlideIndex: index
    })

    scroll(0,0)
  }

  hideAppBar (hide) {
    this.setState({ hideAppBar: hide })
  }

  handleImageScroll(event) {
    if (this.state.currentSlide.type === IMAGE_SLIDE_TYPE) {
      scroll(0,0)
    }
  }

  buildSwipeComponent () {
    return (
      <div className='kiosk-swiper'>
        <ReactSwipe
          continuous={this.props.slides.length > 2}
          onTouchStart={(event) => this.handleClick(event)}
          onTouchEnd={(event) => this.handleImageScroll(event)}
          slideToIndex={this.state.currentSlideIndex}
          key='react-swipe'
          callback={(index, element) => this.onSlideChange(index, element)}>
          {this.props.slides.map(function (item, index) {
            if (item.type === EVENT_LIST_SLIDE_TYPE) {
              return (
                <div key={'eventListWrapper' + index}>
                  <EventView
                    {...this.props}
                    events={item.events}
                    hideAppBar={(hide) => this.hideAppBar(hide)}
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
                    hideAppBar={(hide) => this.hideAppBar(hide)}
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

    if (this.state.transitionProgress === 0) {
      // Allows the removal of the transition from full to empty
      progressBarClasses += ' empty'
    }

    // if slides have not yet been added to state, render nothing.
    var reactSwipeComponent = <div />

    if (this.props.slides) {
      reactSwipeComponent = this.buildSwipeComponent()
    }

    return (
      <div className='kiosk-presentation' style={this.props.allowInput ? {} : {pointerEvents: 'none'}} onClick={(event) => this.handleClick(event)}>
        {reactSwipeComponent}
      </div>
    )
  }
}

export default PresentationView
