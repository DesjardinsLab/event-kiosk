import React from 'react';
import PropTypes from 'prop-types';

import ISvg from 'react-inlinesvg';

const ForecastView = (props) => {
  const formattedTime = props.clockTimeFormat.format(props.time);
  const windDeg = typeof props.forecast.wind.deg !== 'undefined' ? `${props.forecast.wind.deg} °` : '';

  return (
    <div className="ForecastView">
      <div className="weatherHeaderWrapper">
        <div className="weatherTime">
          {formattedTime}
        </div>
        <div className="weatherHeader">
          <div className="weatherImage">
            <img src={props.getIcon(props.forecast.icon)} alt="" />
          </div>
          <div className="weatherTemperature">
            {props.forecast.temp}°C
          </div>
        </div>
      </div>
      <div className="weatherDescription">
        {props.forecast.description}
      </div>
      <div className="weatherDetails">
        <div className="weatherLocation">
          <ISvg src="/static/weather-icons/place.svg" />{props.location}
        </div>
        <div className="weatherWind">
          <ISvg src="/static/weather-icons/wind.svg" />{`${Math.round(props.forecast.wind.speed)} km/h ${windDeg}`}
        </div>
      </div>
      <div className="iconsCopyright">
        <p>
          {props.getIcon('copyright')}
        </p>
      </div>
    </div>
  );
};

ForecastView.propTypes = {
  time: PropTypes.number.isRequired,
  location: PropTypes.string.isRequired,
  forecast: PropTypes.shape({
    icon: PropTypes.string,
    temp: PropTypes.number,
    description: PropTypes.string,
    wind: PropTypes.object,
  }).isRequired,
  getIcon: PropTypes.func.isRequired,
  clockTimeFormat: PropTypes.shape({
    format: PropTypes.func.isRequired,
  }).isRequired,
};

export default ForecastView;
