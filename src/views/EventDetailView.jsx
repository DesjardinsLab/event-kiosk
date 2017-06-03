import React from 'react'
import QRCode from 'qrcode.react'

import Paper from 'material-ui/Paper';

import SpeakerListView from './SpeakerListView'

export class EventDetailView extends React.Component {
  componentDidMount() {

  }

  render () {
    var event = this.props.event
    this.props.addFormattedDatesToEvent(event)

    return (
      <article className={'eventDetails month' + event.month}>
        <div className='headerImageWrapper'>
          <img className='headerImage' src={event.img} />
          {event.prettyUrl ?
            <div className='eventUrlWrapper'>
              <h3 className='eventUrl'>{event.prettyUrl}</h3>
            </div> : ''
          }
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
        <div className='desc' dangerouslySetInnerHTML={{__html: event.desc}}/>
        {event.speakers ? <SpeakerListView speakers={event.speakers} /> : ''}
      </article>
    )
  }
}

export default EventDetailView
