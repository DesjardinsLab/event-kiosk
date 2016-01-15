import EventListItem from './EventListItem'

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

  addFormattedDatesToEvent(event) {
    var startDateTime = new Date(event.startTime)
    var endDateTime = new Date(event.endTime)

    event.date = this.props.dateFormat.format(startDateTime)

    var startTime = this.props.timeIntervalFormat.format(startDateTime)
    var endTime = this.props.timeIntervalFormat.format(endDateTime)

    event.timeInterval = startTime + ' - ' + endTime
  }

  getEvents (month) {
    return (
      this.state.eventsByMonth[month].map(function (event, index) {
        this.addFormattedDatesToEvent(event)
        return (
          <EventListItem
            key={event.key}
            event={event}
            onEventClick={(event) => this.onEventClick(event)}
          />
        )
      }.bind(this))
    )
  }

  render () {
    var listContent = <div />

    if (this.state.eventsByMonth) {
      listContent = (
        <div>
          {Object.keys(this.state.eventsByMonth).map(function (month, index) {
            return (
              <div className='eventsByMonth' key={'events' + month}>
                <h1 className='month'>{month}</h1>
                {this.getEvents(month)}
              </div>
            )
          }.bind(this))}
        </div>
      )
    }

    return (
      <div className='eventList'>
          {listContent}
      </div>
    )
  }
}

export default EventListView
