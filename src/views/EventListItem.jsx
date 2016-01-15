import Paper from 'material-ui/lib/paper';

import MapsPlace from 'material-ui/lib/svg-icons/maps/place'
import Face from 'material-ui/lib/svg-icons/action/face'


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
          <div className='dateInfo'>
            <div className='date'>{event.date}</div>
            <div className='time'>{event.timeInterval}</div>
          </div>
          <div className='eventInfo'>
            <div className='locationInfo'>
              <div className='location'><MapsPlace />{event.location}</div>
            </div>
            {event.speaker ?
              <div className='speaker'><Face />{event.speaker}</div> :
              ''
            }
          </div>
        </div>
      </Paper>
    )
  }
}

export default EventListItem
