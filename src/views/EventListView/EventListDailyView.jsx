import React from 'react';
import PropTypes from 'prop-types';

import DailyEventListItem from '../../components/DailyEventListItem';

const formatEventByDays = (props) => {
  const eventsByDay = {};
  const dayFormat = props.dayFormat;

  props.events.forEach((event) => {
    const day = dayFormat.format(new Date(event.startTime));

    if (eventsByDay[day]) {
      eventsByDay[day].push(event);
    } else {
      eventsByDay[day] = [event];
    }
  });
  return eventsByDay;
};

export default class EventListDailyView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      eventsByDay: formatEventByDays(props),
    };
  }

  onEventClick(event) {
    this.props.onEventSelect(event);
  }

  getEvents(day) {
    let currentTime = null;

    return this.state.eventsByDay[day].map((event) => {
      const eventElement = (
        <DailyEventListItem
          {...this.props}
          key={event.key}
          event={event}
          hideDate={currentTime === event.startTime}
          onEventClick={clickedEvent => this.onEventClick(clickedEvent)}
        />
      );

      currentTime = event.startTime;
      return eventElement;
    });
  }

  render() {
    let listContent = <div />;

    if (this.state.eventsByDay) {
      listContent = (
        <div>
          {Object.keys(this.state.eventsByDay).map(day =>
            (
              <div className={'eventsByDay day'} key={`events ${day}`}>
                <h1 className="day">{day}</h1>
                <div className="eventsList">
                  {this.getEvents(day)}
                </div>
              </div>
            ),
          )}
        </div>
      );
    }

    return (
      <div className="eventListView">
        {this.props.headerImage ?
          <div className="headerWrapper">
            <div className="headerContentWrapper">
              <img src={this.props.headerImage} alt="" />
            </div>
          </div> : ''
       }
        {listContent}
        {this.props.footerImage ? <img src={this.props.footerImage} alt="" /> : ''}
      </div>
    );
  }
}

EventListDailyView.propTypes = {
  headerImage: PropTypes.string,
  footerImage: PropTypes.string,
  onEventSelect: PropTypes.func.isRequired,
};

EventListDailyView.defaultProps = {
  headerImage: '',
  footerImage: '',
};
