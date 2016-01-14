import Paper from 'material-ui/lib/paper';

export class EventListItem extends React.Component {
  render () {
    var event = this.props.event

    var startDateTime = new Date(event.startTime)
    var endDateTime = new Date(event.endTime)

    var LOCALE = this.props.LOCALE

    var date = new Intl.DateTimeFormat(LOCALE, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }).format(startDateTime)

    var startTime = new Intl.DateTimeFormat(LOCALE, {hour: 'numeric', minute: 'numeric'}).format(startDateTime)
    var endTime = new Intl.DateTimeFormat(LOCALE, {hour: 'numeric', minute: 'numeric'}).format(endDateTime)

    var timeInterval = startTime + ' - ' + endTime

    return (
      <Paper
        className='eventListItem'
        zDepth={3}>
        <div className='thumbnailWrapper'>
          <img className='thumbnail' src={event.img} />
        </div>
        <div className='details'>
          <h2 className='title'>{event.title}</h2>
          <div className='date'>{date}</div>
          <div className='time'>{timeInterval}</div>
          <div className='desc'>{event.desc}</div>
          <div className='location'>{event.location}</div>
          {event.speaker ?
            <div className='speaker'>{event.speaker}</div> :
            ''
          }
        </div>
      </Paper>
    )
  }
}

export default EventListItem
