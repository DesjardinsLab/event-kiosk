import EventListItem from './EventListItem'

const LOCALE = 'fr-CA'

export class EventListView extends React.Component {

  constructor (props) {
    super()

    this.state = {
      eventsByMonth: {}
    }
  }

  componentDidMount () {
    var eventsByMonth = {}
    var monthFormat = new Intl.DateTimeFormat(LOCALE, { month: 'long', year: 'numeric' })

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

  getEvents (month) {
    return (
      this.state.eventsByMonth[month].map(function (event, index) {
        console.log(event)
        return (
          <EventListItem
            key={event.key}
            event={event}
            LOCALE={LOCALE}
          />
        )
      })
    )
  }

  render () {
    var listContent = <div />

    if (this.state.eventsByMonth) {
      listContent = (
        <div>
          {Object.keys(this.state.eventsByMonth).map(function (month, index) {
            return (
              <div className='eventsByMonth'>
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
