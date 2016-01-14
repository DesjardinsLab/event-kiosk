import ReactDOM from 'react-dom'

import PresentationView from './views/PresentationView'
import injectTapEventPlugin from 'react-tap-event-plugin'

import PresentationViewStyle from './styles/PresentationView.less'

injectTapEventPlugin()

// Render the React application to the DOM
ReactDOM.render(
  <PresentationView />,
  document.getElementById('root')
)
