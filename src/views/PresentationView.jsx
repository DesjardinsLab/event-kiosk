import AppBar from 'material-ui/lib/app-bar'
import LeftNav from 'material-ui/lib/left-nav'
import MenuItem from 'material-ui/lib/menus/menu-item'
import Divider from 'material-ui/lib/divider'

import LinearProgress from 'material-ui/lib/linear-progress'

export class PresentationView extends React.Component {

  constructor (props) {
    super()

    this.state = {
      navOpen: false
    }
  }

  toggleNav () {
    this.setState({navOpen: !this.state.navOpen})
  }

  render () {
    var slides = [
      {order: 0, title: 'Event1'},
      {order: 1, title: 'Event2'}
    ]

    return (
      <div className='kiosk-presentation'>
        <LinearProgress />
        <AppBar
          title='Événement'
          onLeftIconButtonTouchTap={() => this.toggleNav()}
          zDepth={0}
        />
        <LeftNav
          open={this.state.navOpen}
          onRequestChange={navOpen => this.setState({navOpen})}
          docked={false}>
          <MenuItem>À propos du lab</MenuItem>
          <Divider />
          {slides.map(function (item) {
            return (<MenuItem key={item.order}>{item.title}</MenuItem>)
          })}
        </LeftNav>
      </div>
    )
  }
}

export default PresentationView
