import React from 'react'

import EventListView from './EventListView'
import EventDetailView from './EventDetailView'

export class EventView extends React.Component {

  constructor (props) {
    super()

    this.state = {
      isStatic: false,
      selectedEvent: props.selectedEvent
    }
  }

  componentWillUnmount () {
    if (this.state.eventDetailTimer) {
      clearTimeout(this.state.eventDetailTimer)
    }
  }

  // since all events go through this view, we define the date formatting here
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

  // logic for event selection is handled in Presentation view
  onEventSelect (event) {
    this.props.setSelectedEvent(event)
  }

  returnToListView () {
    this.props.clearSelectedEvent()
  }

  getElementToRender () {
    // returns the list component or the detail component
    var elementToRender = <div />

    if (this.props.selectedEvent || this.props.isStatic) {
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
