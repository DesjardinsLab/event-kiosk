import React from 'react';
import PropTypes from 'prop-types';

import ForecastView from './ForecastView';

import {
  providersEndpoints, providersParsers, providersIcons, OPEN_WEATHER_MAP,
} from '../utils/WeatherProviders';

const WEATHER_PROVIDER = process.env.WEATHER_PROVIDER || OPEN_WEATHER_MAP;
const WEATHER_UPDATE_INTERVAL = 1200000;
const WEATHER_ICONS_PROVIDER = 'vclouds';

const TIME_UPDATE_INTERVAL = 5000;

export default class WeatherView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      time: (new Date()).getTime(),
      forecast: {
        lat: props.lat,
        lon: props.lon,
        icon: 'other',
        temp: 0,
        wind: {
          speed: 0,
          deg: 0,
        },
        location: props.location,
      },
      weatherUpdateInterval: setInterval(() => this.getWeather, WEATHER_UPDATE_INTERVAL),
      timeUpdateInterval: setInterval(() => {
        this.setState({
          time: (new Date()).getTime(),
        });
      }, TIME_UPDATE_INTERVAL),
    };
  }

  componentDidMount() {
    this.getWeather();
  }

  getWeather() {
    const url = providersEndpoints[WEATHER_PROVIDER](
      this.props.lat, this.props.lon, this.props.locale.substr(0, 2),
    );

    fetch(url).then(response => response.json())
    .then(content => this.setState({
      lat: this.props.lat,
      lon: this.props.lon,
      forecast: providersParsers[WEATHER_PROVIDER](content),
      location: this.props.location,
    }))
    .catch((error) => {
      this.setState({ error });
    });
  }

  render() {
    return (
      <div className="WeatherView">
        {this.state.forecast === null ?
          <div className="loader" /> :
          <ForecastView
            {...this.props}
            forecast={this.state.forecast}
            time={this.state.time}
            getIcon={providersIcons[WEATHER_PROVIDER][WEATHER_ICONS_PROVIDER]}
          />
        }
      </div>
    );
  }
}

WeatherView.propTypes = {
  locale: PropTypes.string,
  lat: PropTypes.string,
  lon: PropTypes.string,
  location: PropTypes.string,
};

WeatherView.defaultProps = {
  locale: 'fr-CA',
  lat: '-90',
  lon: '0',
  location: 'South Pole, AQ',
};
