import React from 'react';
import PropTypes from 'prop-types';

export default function provideEvents(ComposedComponent) {
  class EventProvider extends React.Component {
    constructor(props) {
      super(props);

      const generateFormattedEvent = (event, index) => {
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
      };

      // Support both events lists and single events for list/detail views.
      if (props.events && props.events.length > 0) {
        this.state = {
          events: props.events.map(generateFormattedEvent),
        };
      } else if (props.event) {
        this.state = {
          event: generateFormattedEvent(props.event, 0),
        };
      } else {
        // Failsafe
        this.state = {
          events: [],
        };
      }
    }

    render() {
      if (!this.state.events && !this.state.event) {
        return <div />;
      }

      return (
        <ComposedComponent
          {...this.props}
          {...this.state}
        />
      );
    }
  }

  EventProvider.propTypes = {
    events: PropTypes.arrayOf(PropTypes.object),
    event: PropTypes.shape({}),
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
    event: null,
  };

  return EventProvider;
}
