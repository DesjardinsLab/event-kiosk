// Providers constants
export const OPEN_WEATHER_MAP = 'openWeatherMap';
export const FORECAST = 'forecast';

export const providers = [
  OPEN_WEATHER_MAP,
  FORECAST,
];

const endpoints = {};

endpoints[OPEN_WEATHER_MAP] = (lat, lon, language) => {
  if (typeof OPEN_WEATHER_MAP_APPID === 'undefined') {
    return `//api.openweathermap.org/data/2.5/weather
    ?lat=${lat}&lon=${lon}&lang=${language}&units=metric`;
  }
  return `//api.openweathermap.org/data/2.5/weather
  ?lat=${lat}&lon=${lon}&appid=${OPEN_WEATHER_MAP_APPID}&lang=${language}&units=metric`; // eslint-disable-line no-undef
};

// Forecast endpoint will only work on a https server.
endpoints[FORECAST] = (lat, lon, language) => {
  const cb = response => response;

  if (typeof OPEN_WEATHER_MAP_APPID === 'undefined') {
    return `https://api.forecast.io/forecast/${lat},${lon}
    ?units=ca&lang=${language}&callback=${cb}`;
  }

  return (
    // eslint-disable-next-line no-undef
    `https://api.forecast.io/forecast/${FORECAST_API_KEY}/${lat},${lon}
    ?units=ca&lang=${language}&callback=${cb}`
  );
};

export const providersEndpoints = endpoints;

const parsers = {};

parsers[OPEN_WEATHER_MAP] = response => ({
  temp: Math.round(response.main.temp),
  icon: response.weather[0].icon,
  description: response.weather[0].description,
  wind: {
    speed: response.wind.speed,
    deg: response.wind.deg,
  },
});

parsers[FORECAST] = response => ({
  temp: Math.round(response.currently.apparentTemperature),
  icon: response.currently.icon,
  description: response.currently.summary,
  wind: {
    speed: response.currently.windSpeed,
    deg: response.currently.windBearing,
  },
});

export const providersParsers = parsers;

const icons = {};

icons[OPEN_WEATHER_MAP] = {
  vclouds: (fieldName) => {
    switch (fieldName) {
      case 'copyright':
        return 'Icons by VClouds - http://vclouds.deviantart.com/gallery/#/d2ynulp';

      // Day
      // clear sky
      case '01d':
        return '/static/weather-icons/vclouds/32.png';
      // few clouds
      case '02d':
        return '/static/weather-icons/vclouds/30.png';
      // scattered clouds
      case '03d':
        return '/static/weather-icons/vclouds/26.png';
      // broken clouds
      case '04d':
        return '/static/weather-icons/vclouds/28.png';
      // shower rain
      case '09d':
        return '/static/weather-icons/vclouds/12.png';
      // rain
      case '10d':
        return '/static/weather-icons/vclouds/39.png';
      // thunderstorm
      case '11d':
        return '/static/weather-icons/vclouds/17.png';
      // snow
      case '13d':
        return '/static/weather-icons/vclouds/42.png';
      // mist
      case '50d':
        return '/static/weather-icons/vclouds/20.png';

      // Night
      // clear sky
      case '01n':
        return '/static/weather-icons/vclouds/31.png';
      // few clouds
      case '02n':
        return '/static/weather-icons/vclouds/29.png';
      // scattered clouds
      case '03n':
        return '/static/weather-icons/vclouds/26.png';
      // broken clouds
      case '04n':
        return '/static/weather-icons/vclouds/27.png';
      // shower rain
      case '09n':
        return '/static/weather-icons/vclouds/12.png';
      // rain
      case '10n':
        return '/static/weather-icons/vclouds/45.png';
      // thunderstorm
      case '11n':
        return '/static/weather-icons/vclouds/17.png';
      // snow
      case '13n':
        return '/static/weather-icons/vclouds/42.png';
      // mist
      case '50n':
        return '/static/weather-icons/vclouds/20.png';

      default:
        return '/static/weather-icons/vclouds/44.png';
    }
  },
};

icons[FORECAST] = {
  vclouds: (fieldName) => {
    switch (fieldName) {
      case 'copyright':
        return 'Icons by VClouds - http://vclouds.deviantart.com/gallery/#/d2ynulp';

      case 'clear-day':
        return '/static/weather-icons/vclouds/32.png';
      case 'partly-cloudy-day':
        return '/static/weather-icons/vclouds/30.png';
      case 'cloudy':
        return '/static/weather-icons/vclouds/26.png';
      case 'thunderstorm':
        return '/static/weather-icons/vclouds/17.png';
      case 'fog':
        return '/static/weather-icons/vclouds/20.png';
      case 'sleet':
        return '/static/weather-icons/vclouds/26.png';
      case 'wind':
        return '/static/weather-icons/vclouds/24.png';
      case 'clear-night':
        return '/static/weather-icons/vclouds/31.png';
      case 'partly-cloudy-night':
        return '/static/weather-icons/vclouds/29.png';
      case 'rain':
        return '/static/weather-icons/vclouds/40.png';
      case 'snow':
        return '/static/weather-icons/vclouds/42.png';

      default:
        return '/static/weather-icons/vclouds/44.png';
    }
  },
};

export const providersIcons = icons;

export default providers;
