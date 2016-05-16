import React from 'react'

import AppBar from 'material-ui/lib/app-bar'
import LeftNav from 'material-ui/lib/left-nav'
import MenuItem from 'material-ui/lib/menus/menu-item'
import Divider from 'material-ui/lib/divider'

import Home from 'material-ui/lib/svg-icons/action/home'
import NavigationBack from 'material-ui/lib/svg-icons/navigation/arrow-back'

import IconButton from 'material-ui/lib/icon-button'

import LinearProgress from 'material-ui/lib/linear-progress'

import ObjectHash from 'object-hash'

import Isvg from 'react-inlinesvg'

import PresentationView from './PresentationView'
import StaticHtmlPageView from './StaticHtmlPageView'

const RELOAD_INTERVAL = 60000
const HOME_PAGE = 'home'

export class KioskView extends React.Component {
  constructor (props) {
    super()

    this.state = {
      appTitle: '',
      interactiveMode: false,
      navOpen: false,
      presentation: {
        transitionTime: 0,
        pauseTimeOnTouch: 60000,
        slides: [],
        displayMenu: true,
        displayIndicators: true
      },
      sections: [],
      transitionProgress: 0,
      currentSection: HOME_PAGE,
      currentPage: 0
    }
  }

  componentDidMount () {
    this.getKiosk()
    this.setState({ reloadInterval: setInterval(this.getKiosk.bind(this), RELOAD_INTERVAL )})
  }

  componentWillUnmount () {
    clearInterval(this.state.reloadInterval)
    clearTimeout(this.state.pauseTimer)
  }

  getKiosk () {
    var url = typeof KIOSK_SOURCE !== 'undefined' ? KIOSK_SOURCE : 'example-data.json'

    fetch(url).then(function (response) {
      return response.json()
    }).then(function (content) {
      // If data changed, reload page.
      var hashedData = ObjectHash(content, {algorithm: 'md5'})
      if (this.state.dataHash && hashedData !== this.state.dataHash) {
        location.reload()
      }
      this.setState({ dataHash: hashedData })

      this.setState(content)
      // save latest content to localStorage
      localStorage.setItem('savedContent', JSON.stringify(content))
    }.bind(this)).catch(function (error) {
      // Attempt to restore content from localStorage
      this.setState(JSON.parse(localStorage.savedContent))
      console.log(error.stack)
      console.log('Error while fetching data. Will try again in a minute.')
    }.bind(this))
  }

  onInteraction (event) {
    if (this.state.pauseTimer) {
      clearTimeout(this.state.pauseTimer)
    }

    this.setState({
      interactiveMode: true,
      transitionProgress: 0,
      pauseTimer: setTimeout(this.handleInactivityTimer.bind(this), this.state.presentation.pauseTimeOnTouch)
    })
  }

  handleInactivityTimer () {
    this.setState({
      interactiveMode: false,
      transitionProgress: 0
    })
    this.setCurrentPage(HOME_PAGE, 0)
  }

  // these functions should be passed to children to influence components from the kiosk.
  toggleNav (event) {
    this.setState({ navOpen: !this.state.navOpen })
  }

  hideAppBar (hide) {
    this.setState({ hideAppBar: hide })
  }

  setProgressBarValue (value) {
    this.setState({ transitionProgress: this.props.interactiveMode ? 0 : value })
  }

  setAppTitle (title) {
    this.setState({ appTitle: title })
  }

  setCurrentPage (section, page) {
    this.setState({
      currentSection: section,
      currentPage: page,
      navOpen: false
    })

    if (section !== HOME_PAGE) {
      var currentPage = this.state.sections[section].pages[page]

      this.setState({
        appTitle: currentPage.title
      })
      this.setAppBarIconElementLeft(<IconButton onClick={() => this.setCurrentPage(HOME_PAGE, 0)}><NavigationBack/></IconButton>)
    } else {
      this.setAppBarIconElementLeft()
    }
  }

  setAppBarIconElementLeft (element) {
    this.setState({ appBarIconElementLeft: element })
  }

  render () {
    var sections = this.state.sections
    var progressBarClasses = 'progressBar'

    if (this.state.transitionProgress === 0) {
      // Allows the removal of the transition from full to empty
      progressBarClasses += ' empty'
    }

    return (
      <div className='kiosk' onClick={(event) => this.onInteraction(event)}>
        {this.state.presentation.transitionTime > 0 && this.state.presentation.slides.length > 1 ?
          <LinearProgress
            className={progressBarClasses}
            mode='determinate'
            max={this.state.presentation.transitionTime}
            value={this.state.transitionProgress}/> : ''}
        {this.state.presentation.displayMenu ?
        <AppBar
          className='appBar'
          title={this.state.appTitle}
          iconElementLeft={this.state.appBarIconElementLeft}
          onLeftIconButtonTouchTap={(event) => this.toggleNav(event)}
          zDepth={0}
          style={this.state.hideAppBar ? {
           opacity: 0,
           position: 'absolute',
           pointerEvents: 'none'
          } : {
            opacity: 1,
            pointerEvents: 'auto'
          }}/> : ''}
        {this.createLeftNav()}
        <div className='kiosk-content'>
          {this.renderCurrentPage()}
        </div>
      </div>
    )
  }

  createLeftNav () {
    return (
      <LeftNav
        className='leftNav'
        open={this.state.navOpen}
        disableSwipeToOpen={true}
        onRequestChange={navOpen => this.setState({navOpen})}
        docked={false}>
        <MenuItem
          value={HOME_PAGE}
          onTouchTap={() => this.setCurrentPage(HOME_PAGE, 0)}
          className='nav-home'>
          <Home /><span>{"Accueil"}</span>
        </MenuItem>
        <Divider />
        {this.state.sections.map(function (section, sectionIndex) {
          return (
            <div className='menuSection' key={sectionIndex}>
              <MenuItem
                disabled={true}
                primaryText={section.title} className="nav-section" />
                {section.pages.map(function (page, pageIndex) {
                  return (
                    <MenuItem
                      className="nav-page"
                      key={pageIndex}
                      value={sectionIndex + '-' + pageIndex}
                      onTouchTap={() => this.setCurrentPage(sectionIndex, pageIndex)}>
                      {page.icon ? <Isvg src={page.icon} /> : ''}<span className="nav-page-label">{page.title}</span>
                    </MenuItem>
                  )
                }.bind(this))}
              <Divider />
            </div>
          )
        }.bind(this))}
      </LeftNav>
    )
  }

  renderCurrentPage () {
    switch (this.state.currentSection) {
      case HOME_PAGE:
        return (this.state.presentation.slides.length ?
          <PresentationView
            {...this.props}
            interactiveMode={this.state.interactiveMode}
            presentation={this.state.presentation}
            transitionProgress={this.state.transitionProgress}
            setProgressBarValue={(value) => this.setProgressBarValue(value)}
            setAppTitle={title => this.setAppTitle(title)}
            hideAppBar={hide => this.hideAppBar(hide)}
            setAppBarIconElementLeft={iconElementLeft => this.setAppBarIconElementLeft(iconElementLeft)}
            onInteraction={event => this.onInteraction(event)}
            pauseTimeOnTouch={this.state.presentation.pauseTimeOnTouch}/> : ''
        )
      default:
        var page = this.state.sections[this.state.currentSection].pages[this.state.currentPage];
        return (<StaticHtmlPageView html={page.html} javascript={page.javascript}/>)
    }
  }
}

export default KioskView
