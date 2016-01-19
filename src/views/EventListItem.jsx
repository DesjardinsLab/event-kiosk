import Paper from 'material-ui/lib/paper'
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
      <div className="eventCard">
        <div className='dateInfo'>
          <div className='dateDisplay' style={{opacity: this.props.hideDate ? 0 : 1}}>
            <div className='day'>{event.day}</div>
            <div className='date'>{event.shortDate}</div>
          </div>
        </div>
        <Paper
          className='eventListItem'
          onClick={() => this.handleEventClick(event)}
          zDepth={1}>
          <div className='details'>
            <h2 className='title'>{event.title}</h2>
            <div className='timeInfo'>
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
      </div>
    )
  }
}

export default EventListItem
