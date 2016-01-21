import EventListItem from './EventListItem'
import React from 'react'

export class EventListView extends React.Component {
  constructor (props) {
    super()

    this.state = {
      eventsByMonth: {}
    }
  }

  componentDidMount () {
    var eventsByMonth = {}
    var monthFormat = this.props.monthFormat

    for(var i = 0; i < this.props.events.length; i++) {
      var event = this.props.events[i]
      event.key = i

      var month = monthFormat.format(new Date(event.startTime))

      if (eventsByMonth[month]) {
        eventsByMonth[month].push(event)
      } else {
        eventsByMonth[month] = [event]
      }
    }

    this.setState({eventsByMonth})
  }

  onEventClick (event) {
    this.props.onEventSelect(event)
  }

  getEvents (month) {
    var events = []
    var currentDay = null;

    for (var i = 0; i < this.state.eventsByMonth[month].length; i++) {
      var event = this.state.eventsByMonth[month][i]
      this.props.addFormattedDatesToEvent(event)

      var eventElement = (
        <EventListItem
          {...this.props}
          key={event.key}
          event={event}
          hideDate={currentDay === event.date}
          onEventClick={(event) => this.onEventClick(event)}
        />
      )

      currentDay = event.date
      events.push(eventElement)
    }

    return events
  }

  render () {
    var listContent = <div />

    if (this.state.eventsByMonth) {
      listContent = (
        <div>
          {Object.keys(this.state.eventsByMonth).map(function (month, index) {
            var startTime = new Date(this.state.eventsByMonth[month][0].startTime)
            return (
              <div className={'eventsByMonth month' + startTime.getMonth()} key={'events' + month}>
                <h1 className='month'>{month}</h1>
                <div className='eventsList'>
                  {this.getEvents(month)}
                </div>
              </div>
            )
          }.bind(this))}
        </div>
      )
    }

    return (
      <div className='eventListView'>
        {this.props.headerImage ? <img src={this.props.headerImage}/> : ''}
        {listContent}
        {this.props.footerImage ? <img src={this.props.footerImage}/> : ''}
      </div>
    )
  }
}

export default EventListView
