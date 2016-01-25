import React from 'react'

import AppBar from 'material-ui/lib/app-bar'
import IconButton from 'material-ui/lib/icon-button'
import NavigationBack from 'material-ui/lib/svg-icons/navigation/arrow-back'

import EventListView from './EventListView'
import EventDetailView from './EventDetailView'

export class EventView extends React.Component {

  constructor (props) {
    super()

    this.state = {
      isStatic: false,
      detailMode: false,
      selectedEvent: null
    }
  }

  componentWillUnmount () {
    if (this.state.eventDetailTimer) {
      clearTimeout(this.state.eventDetailTimer)
    }
  }

  addFormattedDatesToEvent (event) {
    var startDateTime = new Date(event.startTime)
    var endDateTime = new Date(event.endTime)

    event.date = this.props.dateFormat.format(startDateTime)

    var startTime = this.props.timeIntervalFormat.format(startDateTime)
    var endTime = this.props.timeIntervalFormat.format(endDateTime)

    event.timeInterval = startTime + ' - ' + endTime
    event.month = startDateTime.getMonth()

    event.shortMonth = this.props.shortMonthFormat.format(startDateTime)
    event.shortDate = startDateTime.getDate()
    event.day = this.props.dayFormat.format(startDateTime)
  }

  onEventSelect (event) {
    this.props.setAppTitle(event.shortTitle ? event.shortTitle : event.title)
    this.props.setAppBarIconElementLeft(<IconButton onClick={() => this.returnToListView()}><NavigationBack/></IconButton>)

    this.setState({
      detailMode: true,
      selectedEvent: event,
      eventDetailTimer: setTimeout(this.returnToListView.bind(this), this.props.presentation.pauseTimeOnTouch)
    })

    scroll(0,0)
  }

  returnToListView () {
    this.props.setAppTitle(this.props.title)
    this.props.setAppBarIconElementLeft(null)

    if (this.state.eventDetailTimer) {
      clearTimeout(this.state.eventDetailTimer)
    }

    this.setState({
      detailMode: false,
      selectedEvent: null
    })
  }

  getElementToRender () {
    // returns the list component or the detail component
    var elementToRender = <div />

    if (this.state.detailMode || this.props.isStatic) {
      elementToRender = (
        <div>
          <EventDetailView
            {...this.props}
            event={this.props.isStatic ? this.props.event : this.state.selectedEvent}
            addFormattedDatesToEvent={(event) => this.addFormattedDatesToEvent(event)}
          />
        </div>
      )
    } else {
      elementToRender = (
        <EventListView
          {...this.props}
          onEventSelect={(event) => this.onEventSelect(event)}
          addFormattedDatesToEvent={(event) => this.addFormattedDatesToEvent(event)}
        />
      )
    }

    return elementToRender
  }

  render () {
    return this.getElementToRender()
  }
}

export default EventView
