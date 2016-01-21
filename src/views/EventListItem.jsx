import Paper from 'material-ui/lib/paper'
import React from 'react'

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
            <h2 className='title'>{event.shortTitle ? event.shortTitle : event.title}</h2>
            {event.subTitle ? <h3 className='subTitle'>{event.subTitle}</h3> : '' }
            <div className='timeInfo'>
              <div className='time'>{event.timeInterval}</div>
            </div>
          </div>

        </Paper>
      </div>
    )
  }
}

export default EventListItem
