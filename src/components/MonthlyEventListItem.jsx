import React from 'react';
import PropTypes from 'prop-types';

import Paper from 'material-ui/Paper';
import ChevronRight from 'material-ui/svg-icons/navigation/chevron-right';

const MonthlyEventListItem = (props) => {
  const event = props.event;

  return (
    <div className="eventCard">
      <div className="dateInfo monthly">
        <div className="dateDisplay" style={{ opacity: props.hideDate ? 0 : 1 }}>
          <h3 className="day">{event.day}</h3>
          <h3 className="date">{event.shortDate}</h3>
        </div>
      </div>
      <Paper
        className="eventListItem"
        onClick={() => props.onEventClick(event)}
        zDepth={1}
      >
        <article className="details">
          <h2 className="title">{event.shortTitle ? event.shortTitle : event.title}</h2>
          {event.subTitle ? <h3 className="subTitle">{event.subTitle}</h3> : '' }
          <div className="timeInfo">
            <div className="time">{event.timeInterval}</div>
          </div>
        </article>
        <div className="chevronRight">
          <ChevronRight />
        </div>
      </Paper>
    </div>
  );
};

MonthlyEventListItem.propTypes = {
  event: PropTypes.shape({}).isRequired,
  onEventClick: PropTypes.func.isRequired,
  hideDate: PropTypes.bool,
};

MonthlyEventListItem.defaultProps = {
  hideDate: false,
};

export default MonthlyEventListItem;
