import React from 'react'

import AppBar from 'material-ui/lib/app-bar'
import LeftNav from 'material-ui/lib/left-nav'
import MenuItem from 'material-ui/lib/menus/menu-item'
import Divider from 'material-ui/lib/divider'

import Home from 'material-ui/lib/svg-icons/action/home'

import LinearProgress from 'material-ui/lib/linear-progress'

import ObjectHash from 'object-hash'

import Isvg from 'react-inlinesvg'

const RELOAD_INTERVAL = 60000

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
      transitionProgress: 0,
      allowInput: true
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

      content.presentation.currentSlide = content.presentation.slides[0]
      content.presentation.currentSlideIndex = 0
      content.presentation.slides = content.presentation.slides

      this.setState(content)
    }.bind(this)).catch(function (error) {
      console.log(error)
      console.log('Error while fetching data. Will try again in a minute.')
    })
  }

  toggleNav (event) {
    this.setState({ navOpen: !this.state.navOpen })
  }

  hideAppBar (hide) {
    this.setState({ hideAppBar: hide })
  }

  onInteraction (event) {
    if (this.state.pauseTimer) {
      clearTimer(this.state.pauseTimer)
    }

    this.setState({
      interactiveMode: true,
      pauseTimer: setTimer(this.handleInactivityTimer.bind(this), this.state.presentation.pausetimeOnTouch)
    })
  }

  handleInactivityTimer () {
    this.setState({
      interactiveMode: false
    })
    this.setState({ progressRefreshInterval: setInterval(this.handleTransitionTimer.bind(this), LINEAR_PROGRESS_REFRESH_RATE) })
  }

  createLeftNav () {
    return (
      <LeftNav
        open={this.state.navOpen}
        onRequestChange={navOpen => this.setState({navOpen})}
        docked={false}>
        <MenuItem value='home' primaryText="Accueil">
          <Home />
        </MenuItem>
        <Divider />
        {sections.map(function (section, sectionIndex) {
          return (
            <div className='menuSection'>
              <MenuItem
                key={sectionIndex}
                disabled={true}
                primaryText={section.title}/>
                {section.pages.map(function (page, pageIndex) {
                  return (
                    <MenuItem
                      key={pageIndex}
                      value={sectionIndex + '-' + pageIndex}>
                      <Isvg src={page.icon} />{page.title}
                    </MenuItem>
                  )
                })}
              <Divider />
            </div>
          )
        })}
      </LeftNav>
    )
  }

  // these functions should be passed to children to influence components from the kiosk.
  setProgressBarValue (value) {
    this.setState({ transitionProgress: value })
  }

  toggleInteractiveMode () {
    this.setState({ interactiveMode: !this.state.interactiveMode })
  }

  setAppTitle (title) {
    this.setState({ apptitle: title })
  }

  render () {
    var sections = this.state.sections
    var progressBarClasses = 'progressBar'

    if (this.state.transitionProgress === 0) {
      // Allows the removal of the transition from full to empty
      progressBarClasses += ' empty'
    }

    return (
      <div className='kiosk' style={this.state.allowInput ? {} : {pointerEvents: 'none'}} onClick={(event) => this.onInteraction(event)}>
        <LinearProgress
          className={progressBarClasses}
          mode='determinate'
          max={this.state.presentation.transitionTime}
          value={this.state.transitionProgress}/>
        <AppBar
          className='appBar'
          title={this.state.appTitle}
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
        {/*this.createLeftNav()*/}
        <PresentationView {...this.props}
          presentation={this.state.presentation}
          setProgressBarValue={(value) => this.setProgressBarValue(value)}
          setAppTitle={title => this.setAppTitle(title)}
          onInteraction={event => this.onInteraction(event)}/>
      </div>
    )
  }
}

export default KioskView
