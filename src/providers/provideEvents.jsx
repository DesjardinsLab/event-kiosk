import React from 'react';
import PropTypes from 'prop-types';

export default function provideEvents(ComposedComponent) {
  class EventProvider extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        events: props.events.map((event, index) => {
          const eventWithFormattedDates = event;
          const startDateTime = new Date(event.startTime);
          const endDateTime = new Date(event.endTime);

          // Add a bonus key prop to event
          eventWithFormattedDates.key = index;

          eventWithFormattedDates.date = props.dateFormat.format(startDateTime);

          const startTime = props.timeIntervalFormat.format(startDateTime);
          const endTime = props.timeIntervalFormat.format(endDateTime);

          eventWithFormattedDates.shortStartTime = startTime;
          eventWithFormattedDates.timeInterval = `${startTime} - ${endTime}`;
          eventWithFormattedDates.month = startDateTime.getMonth();

          eventWithFormattedDates.shortMonth = props.shortMonthFormat.format(startDateTime);
          eventWithFormattedDates.shortDate = startDateTime.getDate();
          eventWithFormattedDates.day = props.dayFormat.format(startDateTime);

          return eventWithFormattedDates;
        }),
      };
    }

    render() {
      if (!this.state.events) {
        return <div />;
      }

      return (
        <ComposedComponent
          {...this.props}
          events={this.state.events}
        />
      );
    }
  }

  EventProvider.propTypes = {
    events: PropTypes.arrayOf(PropTypes.object),
    dateFormat: PropTypes.shape({
      format: PropTypes.func.isRequired,
    }).isRequired,
    dayFormat: PropTypes.shape({
      format: PropTypes.func.isRequired,
    }).isRequired,
    timeIntervalFormat: PropTypes.shape({
      format: PropTypes.func.isRequired,
    }).isRequired,
    shortMonthFormat: PropTypes.shape({
      format: PropTypes.func.isRequired,
    }).isRequired,
  };

  EventProvider.defaultProps = {
    events: [],
  };

  return EventProvider;
}
