import React from 'react'
import Paper from 'material-ui/Paper'

import ChevronRight from 'material-ui/svg-icons/navigation/chevron-right'

export class EventListItem extends React.Component {

  render () {
    var event = this.props.event

    return (
      <div className='eventCard'>
        <div className='dateInfo'>
          <div className='dateDisplay' style={{opacity: this.props.hideDate ? 0 : 1}}>
            <h3 className='day'>{event.day}</h3>
            <h3 className='date'>{event.shortDate}</h3>
          </div>
        </div>
        <Paper
          className='eventListItem'
          onClick={() => this.props.onEventClick(event)}
          zDepth={1}>
          <article className='details'>
            <h2 className='title'>{event.shortTitle ? event.shortTitle : event.title}</h2>
            {event.subTitle ? <h3 className='subTitle'>{event.subTitle}</h3> : '' }
            <div className='timeInfo'>
              <div className='time'>{event.timeInterval}</div>
            </div>
          </article>
          <div className='chevronRight'>
            <ChevronRight />
          </div>
        </Paper>
      </div>
    )
  }
}

export default EventListItem
