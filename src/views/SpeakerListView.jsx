import React from 'react';
import PropTypes from 'prop-types';

import SpeakerListItem from '../components/SpeakerListItem';

const SpeakerListView = props => (
  <div className="speakersList">
    {props.speakers.map((speaker, index) => (
      <SpeakerListItem key={speaker.id || index} speaker={speaker} />
    ),
    )}
  </div>
);

SpeakerListView.propTypes = {
  speakers: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default SpeakerListView;
