import React from 'react';
import PropTypes from 'prop-types';

export default class StaticHtmlPageView extends React.Component {

  componentDidMount() {
    this.evalJavascript();
  }

  componentDidUpdate() {
    this.evalJavascript();
  }

  evalJavascript() {
    if (this.props.javascript) {
      // eslint-disable-next-line no-eval
      eval(this.props.javascript);
    }
  }

  render() {
    // eslint-disable-next-line react/no-danger
    return <div className="staticHtmlPage" dangerouslySetInnerHTML={{ __html: this.props.html }} />;
  }
}

StaticHtmlPageView.propTypes = {
  javascript: PropTypes.string,
  html: PropTypes.string.isRequired,
};

StaticHtmlPageView.defaultProps = {
  javascript: '',
};
