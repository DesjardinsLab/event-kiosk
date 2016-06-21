export const PROVIDERS = {
  openWeatherMap: function (location, language) {
    return "//api.openweathermap.org/data/2.5/weather?q=" + location + "&appid=" + OPEN_WEATHER_MAP_APPID + "&lang=" + language + "&units=metric"
  }
}

export const PROVIDERS_ICONS = {
  openWeatherMapIcons: function (iconCode) {
    return "http://openweathermap.org/img/w/" + iconCode + ".png"
  }
}

export default PROVIDERS
