import AppBar from 'material-ui/lib/app-bar'
import IconButton from 'material-ui/lib/icon-button'
import NavigationBack from 'material-ui/lib/svg-icons/navigation/arrow-back'

import EventListView from './EventListView'
import EventDetailView from './EventDetailView'

export class EventView extends React.Component {

  constructor (props) {
    super()

    this.state = {
      isStatic: false,
      detailMode: false,
      selectedEvent: null
    }
  }

  addFormattedDatesToEvent (event) {
    var startDateTime = new Date(event.startTime)
    var endDateTime = new Date(event.endTime)

    event.date = this.props.dateFormat.format(startDateTime)

    var startTime = this.props.timeIntervalFormat.format(startDateTime)
    var endTime = this.props.timeIntervalFormat.format(endDateTime)

    event.timeInterval = startTime + ' - ' + endTime
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

    if (this.state.detailMode || this.props.isStatic) {
      elementToRender = (
        <div>
          {!this.props.isStatic ? <AppBar
            title={this.state.selectedEvent.title}
            iconElementLeft={<IconButton onClick={() => this.returnToListView()}><NavigationBack/></IconButton>}
            zDepth={0}
          /> : ''}
          <EventDetailView
            event={this.props.isStatic ? this.props.event : this.state.selectedEvent}
            addFormattedDatesToEvent={(event) => this.addFormattedDatesToEvent(event)}
          />
        </div>
      )
    } else {
      elementToRender = (
        <EventListView
          {...this.props}
          onEventSelect={(event) => this.onEventSelect(event)}
          addFormattedDatesToEvent={(event) => this.addFormattedDatesToEvent(event)}
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
