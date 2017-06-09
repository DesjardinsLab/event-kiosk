import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import KioskView from './views/KioskView';

import './styles/main.less';

injectTapEventPlugin();

const LOCALE = 'fr-CA';

const KIOSK = (
  <MuiThemeProvider
    muiTheme={getMuiTheme({
      fontFamily: 'Cabin',
    })}
  >
    <KioskView
      locale={LOCALE}
      shortMonthFormat={new Intl.DateTimeFormat(LOCALE, { month: 'short' })}
      monthFormat={new Intl.DateTimeFormat(LOCALE, { month: 'long', year: 'numeric' })}
      dateFormat={new Intl.DateTimeFormat(LOCALE, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
      dayFormat={new Intl.DateTimeFormat(LOCALE, { weekday: 'long' })}
      longDayFormat={new Intl.DateTimeFormat(LOCALE, { weekday: 'long', month: 'long', day: 'numeric' })}
      timeIntervalFormat={new Intl.DateTimeFormat(LOCALE, { hour: 'numeric', minute: 'numeric' })}
      clockTimeFormat={new Intl.DateTimeFormat(LOCALE, { weekday: 'short', hour: 'numeric', minute: 'numeric' })}
    />
  </MuiThemeProvider>
);

// Render the React application to the DOM
ReactDOM.render(
  KIOSK,
  document.getElementById('root'),
);
