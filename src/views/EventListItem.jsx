export class EventListItem extends React.Component {
  render () {
    var event = this.props.event

    return (
      <div className='eventListItem'>
        <img className='thumbnail' src={event.img} />
        <div className='details'>
          <h2 className='title'>{event.title}</h2>
          <div className='startTime'>{event.startTime}</div>
          <div className='endTime'>{event.endTime}</div>
          <div className='desc'>{event.desc}</div>
          <div className='location'>{event.location}</div>
          {event.speaker ?
            <div className='speaker'>{event.speaker}</div> :
            ''
          }
        </div>
      </div>
    )
  }
}

export default EventListItem
