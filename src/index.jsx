import React from 'react'
import ReactDOM from 'react-dom'

import KioskView from './views/KioskView'
import injectTapEventPlugin from 'react-tap-event-plugin'

import PresentationViewStyle from './styles/main.less'

injectTapEventPlugin()

const LOCALE = 'fr-CA'

// Render the React application to the DOM
ReactDOM.render(
  <KioskView
    shortMonthFormat={new Intl.DateTimeFormat(LOCALE, { month: 'short' })}
    monthFormat={new Intl.DateTimeFormat(LOCALE, { month: 'long', year: 'numeric' })}
    dateFormat={new Intl.DateTimeFormat(LOCALE, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
    dayFormat={new Intl.DateTimeFormat(LOCALE, { weekday: 'long'})}
    timeIntervalFormat={new Intl.DateTimeFormat(LOCALE, { hour: 'numeric', minute: 'numeric' })}
  />,
  document.getElementById('root')
)
