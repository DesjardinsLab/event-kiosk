import EventListItem from './EventListItem'

export class EventListView extends React.Component {
  render () {
    return (
      <ol className='eventList'>
        {this.props.events.map(function (item, index) {
          return (
            <EventListItem
              key={index}
              title={item.title}
              startTime={item.startTime}
              endTime={item.endTime}
              desc={item.desc}
              location={item.location}
              img={item.img}
            />
          )
        })}
      </ol>
    )
  }
}

export default EventListView
