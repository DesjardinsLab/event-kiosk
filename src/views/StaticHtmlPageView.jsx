import React from 'react'

export class StaticHtmlPageView extends React.Component {
  render() {
    return <div className='staticHtmlPage' dangerouslySetInnerHTML={{__html: this.props.html}} />
  }
}

export default StaticHtmlPageView
