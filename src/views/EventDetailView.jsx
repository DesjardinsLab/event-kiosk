import Paper from 'material-ui/lib/paper';

export class EventDetailView extends React.Component {
  render () {
    var event = this.props.event

    return (
      <div
        className='eventDetail'>
        <div className='headerImageWrapper'>
          <img className='headerImage' src={event.img} />
        </div>
        <div className='details'>
          <div className='dateInfo'>
            <div className='date'>{event.date}</div>
            <div className='time'>{event.timeInterval}</div>
          </div>
          <div className='locationInfo'>
            <div className='location'>{event.location}</div>
            {event.speaker ?
              <div className='speaker'>{event.speaker}</div> :
              ''
            }
          </div>
          <div className='desc'>{event.desc}</div>
        </div>
      </div>
    )
  }
}

export default EventDetailView
