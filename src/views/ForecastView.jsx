import React from 'react'

export class ForecastView extends React.Component {
  render() {
    var formattedTime = this.props.clockTimeFormat.format(this.props.time)

    return (
      <div className="ForecastView">
        <div className="weatherHeaderWrapper">
          <div className="weatherTime">
            {formattedTime}
          </div>
          <div className="weatherHeader">
            <div className="weatherImage">
              <img src={this.props.icons[this.props.forecast.weather[0].icon]} />
            </div>
            <div className="weatherTemperature">
              {Math.round(this.props.forecast.main.temp)}°C
            </div>
          </div>
        </div>
        <div className="weatherDescription">
          {this.props.forecast.weather[0].description}
        </div>
        <div className="weatherDetails">
          <div className="weatherLocation">
            {this.props.forecast.name}, <span className="countryCode">{this.props.forecast.sys.country}</span>
          </div>
          <div className="weatherWind">
            {Math.round(this.props.forecast.wind.speed) + " km/h " + this.props.forecast.wind.deg + "°"}
          </div>
        </div>
        <div className="iconsCopyright">
          <p>
            {this.props.icons.copyright}
          </p>
        </div>
      </div>
    )
  }
}

export default ForecastView
