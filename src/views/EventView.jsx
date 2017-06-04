import React from 'react';

import provideEvents from '../providers/provideEvents';
import EventListView from './EventListView/';
import EventDetailView from './EventDetailView';

export default provideEvents(class EventView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isStatic: false,
      selectedEvent: props.selectedEvent,
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
          event={this.props.isStatic ? this.props.event : this.state.selectedEvent}
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
});
