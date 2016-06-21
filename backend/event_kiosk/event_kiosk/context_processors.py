from django.conf import settings

def open_weather_map_appid(request):
    return {'OPEN_WEATHER_MAP_APPID': settings.OPEN_WEATHER_MAP_APPID}
