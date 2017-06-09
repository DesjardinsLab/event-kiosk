import React from 'react';
import PropTypes from 'prop-types';

import MonthlyEventListItem from '../../components/MonthlyEventListItem';

const formatEventByMonths = (props) => {
  const eventsByMonth = {};
  const monthFormat = props.monthFormat;

  props.events.forEach((event) => {
    const month = monthFormat.format(new Date(event.startTime));

    if (eventsByMonth[month]) {
      eventsByMonth[month].push(event);
    } else {
      eventsByMonth[month] = [event];
    }
  });
  return eventsByMonth;
};

export default class EventListMonthlyView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      eventsByMonth: formatEventByMonths(props),
    };
  }

  onEventClick(event) {
    this.props.onEventSelect(event);
  }

  getEvents(month) {
    let currentDay = null;

    return this.state.eventsByMonth[month].map((event) => {
      const eventElement = (
        <MonthlyEventListItem
          {...this.props}
          key={event.key}
          event={event}
          hideDate={currentDay === event.date}
          onEventClick={clickedEvent => this.onEventClick(clickedEvent)}
        />
      );

      currentDay = event.date;
      return eventElement;
    });
  }

  render() {
    let listContent = <div />;

    if (this.state.eventsByMonth) {
      listContent = (
        <div>
          {Object.keys(this.state.eventsByMonth).map((month) => {
            const startTime = new Date(this.state.eventsByMonth[month][0].startTime);
            return (
              <div className={`eventsByMonth month${startTime.getMonth()}`} key={`events ${month}`}>
                <h1 className="month">{month}</h1>
                <div className="eventsList">
                  {this.getEvents(month)}
                </div>
              </div>
            );
          })}
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

EventListMonthlyView.propTypes = {
  headerImage: PropTypes.string,
  footerImage: PropTypes.string,
  onEventSelect: PropTypes.func.isRequired,
};

EventListMonthlyView.defaultProps = {
  headerImage: '',
  footerImage: '',
};
