import React from 'react';
import PropTypes from 'prop-types';
import QRCode from 'qrcode.react';

import SpeakerListView from './SpeakerListView';

const EventDetailView = (props) => {
  const event = props.event;

  return (
    <article className={`eventDetails month ${event.month}`}>
      <div className="headerImageWrapper">
        <img className="headerImage" src={event.img} alt="" />
        {event.prettyUrl ?
          <div className="eventUrlWrapper">
            <h3 className="eventUrl">{event.prettyUrl}</h3>
          </div> : ''
        }
      </div>
      <div className="details">
        <div className="dateInfo">
          <div className="dateDisplay">
            <div className="month">{event.shortMonth}</div>
            <div className="date">{event.shortDate}</div>
          </div>
        </div>
        <div className="timeLocationInfo">
          <div className="time">{event.timeInterval}</div>
          <div className="location">{event.location}</div>
          {event.speaker ?
            <div className="speaker">{event.speaker}</div> :
            ''
          }
        </div>
        <div className="QRCodeWrapper">
          {event.registrationUrl ?
            <QRCode className="QRCode" value={event.registrationUrl} /> :
            <div className="QRCode" />
          }
        </div>
      </div>
      {/* eslint-disable react/no-danger */}
      <div className="desc" dangerouslySetInnerHTML={{ __html: event.desc }} />
      {/* eslint-enable react/no-danger */}
      {event.speakers ? <SpeakerListView speakers={event.speakers} /> : ''}
    </article>
  );
};

EventDetailView.propTypes = {
  event: PropTypes.shape({}).isRequired,
};

export default EventDetailView;
