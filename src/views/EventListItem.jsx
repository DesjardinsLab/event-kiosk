import Paper from 'material-ui/lib/paper';
import React from 'react'

import MapsPlace from 'material-ui/lib/svg-icons/maps/place'
import Person from 'material-ui/lib/svg-icons/social/person'

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
        zDepth={1}>
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
            {event.speaker ?
              <div className='speaker'><Person />{event.speaker}</div> :
              ''
            }
            <div className='locationInfo'>
              <div className='location'><MapsPlace />{event.location}</div>
            </div>
          </div>
        </div>
      </Paper>
    )
  }
}

export default EventListItem
