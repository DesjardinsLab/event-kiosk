// Utility function that returns a path from an icon provider name.
export default function getWeatherIcons(name) {
  switch(name):
    case "vcloud":
      return {
        "other": "/img/weather-icons/vcloud/44.png",
        // Day
        // clear sky
        "01d": "/img/weather-icons/vcloud/32.png",
        // few clouds
        "02d": "/img/weather-icons/vcloud/30.png",
        // scattered clouds
        "03d": "/img/weather-icons/vcloud/26.png",
        // broken clouds
        "04d": "/img/weather-icons/vcloud/28.png",
        // shower rain
        "09d": "/img/weather-icons/vcloud/12.png",
        // rain
        "10d": "/img/weather-icons/vcloud/39.png",
        // thunderstorm
        "11d": "/img/weather-icons/vcloud/17.png",
        // snow
        "13d": "/img/weather-icons/vcloud/42.png",
        //mist
        "50d": "/img/weather-icons/vcloud/20.png",

        // Night
        // clear sky
        "01n": "/img/weather-icons/vcloud/31.png",
        // few clouds
        "02n": "/img/weather-icons/vcloud/29.png",
        // scattered clouds
        "03n": "/img/weather-icons/vcloud/26.png",
        // broken clouds
        "04n": "/img/weather-icons/vcloud/27.png",
        // shower rain
        "09n": "/img/weather-icons/vcloud/12.png",
        // rain
        "10n": "/img/weather-icons/vcloud/45.png",
        // thunderstorm
        "11n": "/img/weather-icons/vcloud/17.png",
        // snow
        "13n": "/img/weather-icons/vcloud/42.png",
        //mist
        "50n": "/img/weather-icons/vcloud/20.png"
      };
    case default:
      // TODO: return links to openweathermap icons.
      return {};
}
