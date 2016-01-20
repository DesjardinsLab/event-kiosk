import Paper from 'material-ui/lib/paper'
import React from 'react'

import QRCode from 'qrcode.react'

export class EventDetailView extends React.Component {

  render () {
    var event = this.props.event
    this.props.addFormattedDatesToEvent(event)

    return (
      <div className='eventDetail'>
        <div className='headerImageWrapper'>
          <img className='headerImage' src={event.img} />
        </div>
        <div className='details'>
          <div className='dateInfo'>
            <div className='dateDisplay'>
              <div className='month'>{event.shortMonth}</div>
              <div className='date'>{event.shortDate}</div>
            </div>
          </div>
          <div className='timeLocationInfo'>
            <div className='time'>{event.timeInterval}</div>
            <div className='location'>{event.location}</div>
            {event.speaker ?
              <div className='speaker'>{event.speaker}</div> :
              ''
            }
          </div>
          <div className='QRCodeWrapper'>
            {event.registrationUrl ? <QRCode className='QRCode' value={event.registrationUrl} /> : <div className='QRCode' />}
          </div>
        </div>
        <div className='desc'>{event.desc.split(/\r?\n/).map(function (item, index) {
            return <p key={index}>{item}</p>
          })}
        </div>
      </div>
    )
  }
}

export default EventDetailView
