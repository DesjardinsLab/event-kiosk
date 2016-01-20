import React from 'react'

import AppBar from 'material-ui/lib/app-bar'
import LeftNav from 'material-ui/lib/left-nav'
import MenuItem from 'material-ui/lib/menus/menu-item'
import Divider from 'material-ui/lib/divider'

import Home from 'material-ui/lib/svg-icons/action/home'

import LinearProgress from 'material-ui/lib/linear-progress'

import ObjectHash from 'object-hash'

import Isvg from 'react-inlinesvg'

import PresentationView from './PresentationView'
import StaticHtmlPageView from './StaticHtmlPageView'

const RELOAD_INTERVAL = 60000
const HOME_PAGE = 'presentation'

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
        slides: []
      },
      sections: [],
      transitionProgress: 0,
      currentSection: 'home',
      currentPage: 0
    }
  }

  componentDidMount () {
    this.getKiosk()
    this.setState({reloadInterval: setInterval(this.getKiosk.bind(this), RELOAD_INTERVAL)})
  }

  componentWillUnmount () {
    clearInterval(this.state.reloadInterval)
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
    }.bind(this)).catch(function (error) {
      console.log(error)
      console.log('Error while fetching data. Will try again in a minute.')
    })
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
      navOpen: false,
      currentPage: 0,
      currentSection: 'home',
      transitionProgress: 0
    })
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

  toggleInteractiveMode () {
    this.setState({ interactiveMode: !this.state.interactiveMode })
  }

  setAppTitle (title) {
    this.setState({ appTitle: title })
  }

  setCurrentPage (section, page) {
    var currentPage = this.state.sections[section].pages[page]

    this.setState({
      currentSection: section,
      currentPage: page,
      appTitle: currentPage.title,
      navOpen: false
    })
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
        <LinearProgress
          className={progressBarClasses}
          mode='determinate'
          max={this.state.presentation.transitionTime}
          value={this.state.transitionProgress}/>
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
          }}/>
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
        open={this.state.navOpen}
        onRequestChange={navOpen => this.setState({navOpen})}
        docked={false}>
        <MenuItem value='home' onTouchTap={() => this.setCurrentPage('home', 0)}>
          <Home />{"Accueil"}
        </MenuItem>
        <Divider />
        {this.state.sections.map(function (section, sectionIndex) {
          return (
            <div className='menuSection' key={sectionIndex}>
              <MenuItem
                disabled={true}
                primaryText={section.title}/>
                {section.pages.map(function (page, pageIndex) {
                  return (
                    <MenuItem
                      key={pageIndex}
                      value={sectionIndex + '-' + pageIndex}
                      onTouchTap={() => this.setCurrentPage(sectionIndex, pageIndex)}>
                      {page.icon ? <Isvg src={page.icon} /> : ''}{page.title}
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
      case 'home':
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
            onInteraction={event => this.onInteraction(event)}/> : ''
          : ''
        )
      default:
        return (<StaticHtmlPageView html={this.state.sections[this.state.currentSection].pages[this.state.currentPage].html}/>)
    }
  }
}

export default KioskView
