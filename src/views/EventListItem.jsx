import Paper from 'material-ui/lib/paper';

export class EventListItem extends React.Component {

  handleEventClick (event) {
    this.props.onEventClick(event)
  }

  render () {
    var event = this.props.event

    return (
      <Paper
        className='eventListItem'
        onClick={() => this.handleEventClick(event)}
        zDepth={3}>
        <div className='thumbnailWrapper'>
          <img className='thumbnail' src={event.img} />
        </div>
        <div className='details'>
          <h2 className='title'>{event.title}</h2>
          <div className='date'>{event.date}</div>
          <div className='time'>{event.timeInterval}</div>
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
