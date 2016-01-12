export class EventListView extends React.Component {
  static propTypes = {
    months: React.PropTypes.array.isRequired,
    events: React.PropTypes.array.isRequired
  };

  render () {
    return (
      <ol className='eventList text-center'>

      </ol>
    )
  }
}

export default EventListView
