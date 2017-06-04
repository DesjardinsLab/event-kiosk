import React from 'react';
import PropTypes from 'prop-types';

import provideEvents from '../providers/provideEvents';
import EventListView from './EventListView/';
import EventDetailView from './EventDetailView';

class EventView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isStatic: false,
    };
  }

  componentWillUnmount() {
    if (this.state.eventDetailTimer) {
      clearTimeout(this.state.eventDetailTimer);
    }
  }

  render() {
    // returns the list component or the detail component
    let elementToRender = <div />;

    if (this.props.selectedEvent || this.props.isStatic) {
      elementToRender = (
        <EventDetailView
          {...this.props}
          event={this.props.isStatic ? this.props.event : this.props.selectedEvent}
        />
      );
    } else {
      elementToRender = (
        <EventListView
          {...this.props}
          onEventSelect={event => this.props.setSelectedEvent(event)}
        />
      );
    }

    return elementToRender;
  }
}

EventView.propTypes = {
  selectedEvent: PropTypes.shape({}),
  event: PropTypes.shape({}),
  isStatic: PropTypes.bool,
  setSelectedEvent: PropTypes.func,
};

EventView.defaultProps = {
  selectedEvent: null,
  event: null,
  isStatic: false,
  setSelectedEvent: () => {},
};

export default provideEvents(EventView);
