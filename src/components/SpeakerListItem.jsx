import React from 'react';
import PropTypes from 'prop-types';

const SpeakerListItem = (props) => {
  const speaker = props.speaker;

  return (
    <div className="speaker">
      <div className="avatar">
        {speaker.image ?
          <img src={speaker.image} alt="" /> :
          <div className={`color${Math.floor(Math.random() + 11)}`}>
            <span className="letter">
              {speaker.name[0].toUpperCase()}
            </span>
          </div>
        }

      </div>
      <div className="details">
        <h3 className="name">
          {speaker.name}
        </h3>
        <div className="bio">
          {speaker.bio}
        </div>
      </div>
    </div>
  );
};

SpeakerListItem.propTypes = {
  speaker: PropTypes.shape({}).isRequired,
};

export default SpeakerListItem;
