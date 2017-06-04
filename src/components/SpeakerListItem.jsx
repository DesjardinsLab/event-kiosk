import React from 'react';
import PropTypes from 'prop-types';

const SpeakerListItem = (props) => {
  const speaker = props.speaker;

  return (
    <div className="speaker">
      <div className="avatar">
        <img src={speaker.image} alt="" />
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
