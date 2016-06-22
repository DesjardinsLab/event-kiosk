import React from 'react'

import ForecastView from './ForecastView'

import { providers, providersEndpoints, providersParsers, providersIcons, OPEN_WEATHER_MAP } from '../utils/WeatherProviders'

const WEATHER_PROVIDER = process.env.WEATHER_PROVIDER || OPEN_WEATHER_MAP
const WEATHER_UPDATE_INTERVAL = 1200000
const WEATHER_ICONS_PROVIDER = 'vclouds'

const TIME_UPDATE_INTERVAL = 5000;

export class WeatherView extends React.Component {
  constructor (props) {
    super()

    this.state = {
      time: (new Date()).getTime(),
      forecast: {
        lat: props.lat || -90,
        lon: props.lat || 0,
        icon:"other",
        temp:0,
        wind: {
          speed:0,
          deg:0
        },
        location: props.location || "South Pole,AQ"
      }
    }
  }

  getWeather() {
    var url = providersEndpoints[WEATHER_PROVIDER](this.props.lat, this.props.lon, this.props.locale.substr(0,2))

    fetch(url).then(function (response) {
      return response.json()
    }).then(function (content) {
      this.setState({
        lat: this.props.lat,
        lon: this.props.lon,
        forecast: providersParsers[WEATHER_PROVIDER](content),
        location: this.props.location
      })
    }.bind(this)).catch(function (error) {
      console.log(error)
    })
  }

  componentDidMount() {
    this.getWeather();
    this.setState({
      weatherUpdateInterval: setInterval(this.getWeather.bind(this), WEATHER_UPDATE_INTERVAL),
      timeUpdateInterval: setInterval(function () {
        this.setState({
          time: (new Date()).getTime()
        })
      }.bind(this), TIME_UPDATE_INTERVAL)
    })
  }

  render() {
    return (
      <div className='WeatherView'>
        { this.state.forecast === null ?
          <div className="loader" /> :
          <ForecastView
            {...this.props}
            forecast={this.state.forecast}
            time={this.state.time}
            getIcon={providersIcons[WEATHER_PROVIDER][WEATHER_ICONS_PROVIDER]}
          />
        }
      </div>
    )
  }
}

export default WeatherView
