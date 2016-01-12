import ReactDOM from 'react-dom'

import PresentationView from './views/PresentationView'
import injectTapEventPlugin from 'react-tap-event-plugin'

injectTapEventPlugin()

// Render the React application to the DOM
ReactDOM.render(
  <PresentationView />,
  document.getElementById('root')
)
