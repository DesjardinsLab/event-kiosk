import AppBar from 'material-ui/lib/app-bar'
import IconButton from 'material-ui/lib/icon-button'
import NavigationBack from 'material-ui/lib/svg-icons/navigation/arrow-back'

import EventListView from './EventListView'
import EventDetailView from './EventDetailView'

export class EventView extends React.Component {

  constructor (props) {
    super()

    this.state = {
      detailMode: false,
      selectedEvent: null
    }
  }

  onEventSelect (event) {
    this.setState({
      detailMode: true,
      selectedEvent: event,
      eventDetailTimer: setTimeout(this.returnToListView.bind(this), this.props.pauseTimeOnTouch)
    })
  }

  returnToListView () {
    this.setState({
      detailMode: false,
      selectedEvent: null
    })
  }

  getElementToRender () {
    // returns the list component or the detail component
    var elementToRender = <div />

    if (this.state.detailMode) {
      elementToRender = (
        <div>
          <AppBar
            title={this.state.selectedEvent.title}
            iconElementLeft={<IconButton onClick={() => this.returnToListView()}><NavigationBack/></IconButton>}
            zDepth={0}
          />
          <EventDetailView
            event={this.state.selectedEvent}
          />
        </div>
      )
    } else {
      elementToRender = (
        <EventListView
          events={this.props.events}
          monthFormat={this.props.monthFormat}
          dateFormat={this.props.dateFormat}
          timeIntervalFormat={this.props.timeIntervalFormat}
          onEventSelect={(event) => this.onEventSelect(event)}
        />
      )
    }

    return elementToRender
  }

  render () {
    return this.getElementToRender()
  }
}

export default EventView
