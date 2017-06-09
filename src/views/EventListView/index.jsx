import React from 'react';
import PropTypes from 'prop-types';

import EventListMonthlyView from './EventListMonthlyView';
import EventListDailyView from './EventListDailyView';

const EventListView = (props) => {
  if (props.displayType === 'DAILY') {
    return <EventListDailyView {...props} />;
  }
  return <EventListMonthlyView {...props} />;
};

EventListView.propTypes = {
  displayType: PropTypes.string.isRequired,
};

export default EventListView;
