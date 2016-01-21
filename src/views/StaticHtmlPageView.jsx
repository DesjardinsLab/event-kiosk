import React from 'react'

export class StaticHtmlPageView extends React.Component {

  componentDidMount() {
    this.evalJavascript()
  }

  componentDidUpdate() {
    this.evalJavascript()
  }

  evalJavascript() {
    if (this.props.javascript) {
      eval(this.props.javascript)
    }
  }

  render() {
    return <div className='staticHtmlPage' dangerouslySetInnerHTML={{__html: this.props.html}} />
  }
}

export default StaticHtmlPageView
