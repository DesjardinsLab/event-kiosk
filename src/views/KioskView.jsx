import React from 'react';
import PropTypes from 'prop-types';

import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';

import Home from 'material-ui/svg-icons/action/home';
import NavigationBack from 'material-ui/svg-icons/navigation/arrow-back';

import IconButton from 'material-ui/IconButton';

import LinearProgress from 'material-ui/LinearProgress';

import ObjectHash from 'object-hash';

import Isvg from 'react-inlinesvg';

import PresentationView from './PresentationView';
import StaticHtmlPageView from './StaticHtmlPageView';

const RELOAD_INTERVAL = 60000;
const HOME_PAGE = 'home';
const APPBAR_BG = 'rgba(30, 82, 142, 0.8)';

export default class KioskView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      appTitle: '',
      interactiveMode: false,
      navOpen: false,
      presentation: {
        transitionTime: 0,
        pauseTimeOnTouch: 60000,
        slides: [],
        displayMenu: true,
        displayIndicators: true,
      },
      sections: [],
      transitionProgress: 0,
      currentSection: HOME_PAGE,
      currentPage: 0,
    };
  }

  componentDidMount() {
    this.getKiosk();
  }

  componentWillUnmount() {
    clearInterval(this.state.reloadInterval);
    clearTimeout(this.state.pauseTimer);
  }

  onInteraction() {
    if (this.state.pauseTimer) {
      clearTimeout(this.state.pauseTimer);
    }

    this.setState({
      interactiveMode: true,
      transitionProgress: 0,
      pauseTimer: setTimeout(
        this.handleInactivityTimer.bind(this), this.state.presentation.pauseTimeOnTouch,
      ),
    });
  }

  getKiosk() {
    if (!this.state.reloadInterval) {
      this.setState({
        reloadInterval: setInterval(this.getKiosk.bind(this), RELOAD_INTERVAL),
      });
    }
    // eslint-disable-next-line no-undef
    const url = typeof KIOSK_SOURCE !== 'undefined' ? KIOSK_SOURCE : 'example-data.json';

    fetch(url)
    .then(response => response.json())
    .then((content) => {
      // If data changed, reload page.
      const hashedData = ObjectHash(content, { algorithm: 'md5' });
      if (this.state.dataHash && hashedData !== this.state.dataHash) {
        location.reload();
      }
      this.setState({ dataHash: hashedData });

      this.setState(content);
      // save latest content to localStorage
      localStorage.setItem('savedContent', JSON.stringify(content));
    })
    .catch(() => {
      // Attempt to restore content from localStorage
      this.setState(JSON.parse(localStorage.savedContent));
    });
  }

  setAppTitle(title) {
    this.setState({ appTitle: title });
  }

  setCurrentPage(section, page) {
    this.setState({
      currentSection: section,
      currentPage: page,
      navOpen: false,
    });

    if (section !== HOME_PAGE) {
      const currentPage = this.state.sections[section].pages[page];

      this.setState({
        appTitle: currentPage.title,
      });
      this.setAppBarIconElementLeft(
        <IconButton onClick={() => this.setCurrentPage(HOME_PAGE, 0)}>
          <NavigationBack />
        </IconButton>,
      );
    } else {
      this.setAppBarIconElementLeft();
    }
  }

  setAppBarIconElementLeft(element) {
    this.setState({ appBarIconElementLeft: element });
  }

  incrementProgressBarValue(value) {
    let transitionProgress = this.state.transitionProgress + value;
    if (transitionProgress > this.state.presentation.transitionTime) {
      transitionProgress = 0;
    }

    this.setState({
      transitionProgress: this.props.interactiveMode ? 0 : transitionProgress,
    });
  }

  hideAppBar(hide) {
    this.setState({ hideAppBar: hide });
  }

  toggleNav() {
    this.setState({ navOpen: !this.state.navOpen });
  }

  handleInactivityTimer() {
    this.setState({
      interactiveMode: false,
      transitionProgress: 0,
    });
    this.setCurrentPage(HOME_PAGE, 0);
  }

  createDrawer() {
    return (
      <Drawer
        className="drawer"
        open={this.state.navOpen}
        disableSwipeToOpen
        onRequestChange={navOpen => this.setState({ navOpen })}
        docked={false}
      >
        <MenuItem
          value={HOME_PAGE}
          onTouchTap={() => this.setCurrentPage(HOME_PAGE, 0)}
          className="nav-home"
        >
          <Home /><span>{'Accueil'}</span>
        </MenuItem>
        <Divider />
        {this.state.sections.map((section, sectionIndex) =>
          (
            <div key={section.id || sectionIndex} className="menuSection">
              <MenuItem
                className="nav-section"
                primaryText={section.title}
                disabled
              />
              {section.pages.map((page, pageIndex) =>
                (
                  <MenuItem
                    key={section.id || sectionIndex}
                    className="nav-page"
                    value={`${sectionIndex} - ${pageIndex}`}
                    onTouchTap={() => this.setCurrentPage(sectionIndex, pageIndex)}
                  >
                    {page.icon ? <Isvg src={page.icon} /> : ''}<span className="nav-page-label">{page.title}</span>
                  </MenuItem>
                ),
              )}
              <Divider />
            </div>
          ),
        )}
      </Drawer>
    );
  }

  renderCurrentPage() {
    switch (this.state.currentSection) {
      case HOME_PAGE:
        return (this.state.presentation.slides.length ?
          <PresentationView
            {...this.props}
            interactiveMode={this.state.interactiveMode}
            presentation={this.state.presentation}
            incrementProgressBarValue={value => this.incrementProgressBarValue(value)}
            setAppTitle={title => this.setAppTitle(title)}
            hideAppBar={hide => this.hideAppBar(hide)}
            setAppBarIconElementLeft={
              iconElementLeft => this.setAppBarIconElementLeft(iconElementLeft)
            }
            onInteraction={event => this.onInteraction(event)}
            pauseTimeOnTouch={this.state.presentation.pauseTimeOnTouch}
          /> : ''
        );
      default: {
        const page = this.state.sections[this.state.currentSection].pages[this.state.currentPage];
        return (<StaticHtmlPageView html={page.html} javascript={page.javascript} />);
      }
    }
  }

  render() {
    let progressBarClasses = 'progressBar';

    if (this.state.transitionProgress === 0) {
      // Allows the removal of the transition from full to empty
      progressBarClasses += ' empty';
    }

    let kioskClasses = 'kiosk';
    if (!this.state.presentation.displayMenu) {
      kioskClasses += ' appBar-hidden';
    }

    return (
      <div
        className={kioskClasses}
        onClick={event => this.onInteraction(event)}
        role="presentation"
      >
        {this.state.presentation.transitionTime > 0 && this.state.presentation.slides.length > 1 ?
          <LinearProgress
            className={progressBarClasses}
            mode="determinate"
            max={this.state.presentation.transitionTime}
            value={this.state.transitionProgress}
          /> : ''}
        {this.state.presentation.displayMenu ?
          <AppBar
            className="appBar"
            title={this.state.appTitle}
            iconElementLeft={this.state.appBarIconElementLeft}
            onLeftIconButtonTouchTap={event => this.toggleNav(event)}
            zDepth={0}
            style={this.state.hideAppBar ? {
              opacity: 0,
              position: 'absolute',
              pointerEvents: 'none',
            } : {
              opacity: 1,
              pointerEvents: 'auto',
              background: APPBAR_BG,
            }}
          /> : ''}
        {this.createDrawer()}
        <div className="kiosk-content">
          {this.renderCurrentPage()}
        </div>
      </div>
    );
  }
}

KioskView.propTypes = {
  interactiveMode: PropTypes.bool,
};

KioskView.defaultProps = {
  interactiveMode: false,
};
