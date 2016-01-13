export class EventListItem extends React.Component {
  render () {
    return (
      <div className='eventListItem'>
        <img src={this.props.img} />
        <div className='title'>{this.props.title}</div>
        <div className='startTime'>{this.props.startTime}</div>
        <div className='endTime'>{this.props.endTime}</div>
        <div className='desc'>{this.props.desc}</div>
        <div className='location'>{this.props.location}</div>
      </div>
    )
  }
}

export default EventListItem
