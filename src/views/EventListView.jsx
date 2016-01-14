import EventListItem from './EventListItem'

export class EventListView extends React.Component {
  render () {
    return (
      <div className='eventList'>
        {this.props.events.map(function (item, index) {
          return (
            <EventListItem
              key={index}
              event={item}
            />
          )
        })}
      </div>
    )
  }
}

export default EventListView
