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

    for(var i = 0; i < this.props.events.length; i++) {
      var event = this.props.events[i]
      event.key = i

      var month = new Intl.DateTimeFormat(LOCALE, { month: 'long' }).format(new Date(event.startTime))

      if (eventsByMonth[month]) {
        eventsByMonth[month].push(event)
      } else {
        eventsByMonth[month] = [event]
      }
    }

    this.setState({eventsByMonth})
  }

  render () {

    return (
      <div className='eventList'>
          {this.props.events.map(function (item, index) {
            return (
              <EventListItem
                key={index}
                event={item}
                LOCALE={LOCALE}
              />
            )
          })}
      </div>
    )
  }
}

export default EventListView
