import React from 'react'
import SpeakerListItem from './SpeakerListItem'

export class SpeakerListView extends React.Component {

  render () {
    return (
      <div className='speakersList'>
          {this.props.speakers.map(function (speaker, index) {
            return (
              <SpeakerListItem key={index} speaker={speaker} />
            )
          })}
      </div>
    )
  }
}

export default SpeakerListView
