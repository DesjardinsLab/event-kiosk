import React from 'react'

export class StaticHtmlPageView extends React.Component {
  render() {
    return <div dangerouslySetInnerHTML={this.props.html} />
  }
}

export default StaticHtmlPageView
