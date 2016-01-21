import React from 'react'

export class SpeakerListItem extends React.Component {

  render () {
    var speaker = this.props.speaker

    return (
      <div className='speaker'>
        <div className='avatar'>
          <img src={speaker.image} />
        </div>
        <div className='details'>
          <div className='name'>
            {speaker.name}
          </div>
          <div className='bio'>
            {speaker.bio}
          </div>
        </div>
      </div>
    )
  }
}

export default SpeakerListItem
