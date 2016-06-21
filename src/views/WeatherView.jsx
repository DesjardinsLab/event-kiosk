import React from 'react'

import ForecastView from './ForecastView'

import WeatherProviders from '../utils/WeatherProviders'
import WeatherIcons from '../utils/WeatherIcons'

const WEATHER_UPDATE_INTERVAL = 1200000
const WEATHER_ICONS_PROVIDER = 'vclouds'

const TIME_UPDATE_INTERVAL = 5000;

export class WeatherView extends React.Component {
  constructor (props) {
    super()

    this.state = {
      time: (new Date()).getTime(),
      forecast: {
          coord: {
            lon:0,
            lat:-90
          },
          weather: [
            {
              id:0,
              main:"N/A",
              description:"N/A",
              icon:"other"
            }
          ],
          main: {
            temp:0,
            pressure:0,
            humidity:0,
            temp_min:0,
            temp_max:0
          },
          wind: {
            speed:0,
            deg:0,
            gust:0
          },
          rain: {

          },
          clouds: {
            all:0
          },
          dt:0,
          sys: {
            type:0,
            id:0,
            message:0,
            country:"CA",
            sunrise:0,
            sunset:0
          },
          id:0,
          name:"Montreal",
          cod:0
      }
    }
  }

  getWeather() {
    var url = WeatherProviders.openWeatherMap(this.props.location, this.props.locale.substr(0,2))

    fetch(url).then(function (response) {
      return response.json()
    }).then(function (content) {
      this.setState({
        forecast: content
      })
    }.bind(this))
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
            icons={WeatherIcons[WEATHER_ICONS_PROVIDER]}
          />
        }
      </div>
    )
  }
}

export default WeatherView
