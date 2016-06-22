from django.conf import settings

def open_weather_map_appid(request):
    return {
        'OPEN_WEATHER_MAP_APPID': settings.OPEN_WEATHER_MAP_APPID,
        'FORECAST_API_KEY': settings.FORECAST_API_KEY
    }
