"""event_kiosk URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.9/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from ajax_select import urls as ajax_select_urls
from django.conf.urls import url, include
from django.contrib import admin
from django.conf import settings

from event_kiosk.kiosks.views import KioskView
from event_kiosk.kiosks.views import kiosk_data, appcache_manifest

from django.views import static

admin.site.site_header = 'Kiosk administration'

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^manifest.appcache$',  appcache_manifest),
    url(r'^(?P<name>[-\w\d]+)/data/$', kiosk_data, name='kiosk_data'),
    url(r'^(?P<name>[-\w\d]+)/$', KioskView.as_view(), name='kiosk'),
    url(r'^media/(?P<path>.*)$', static.serve, {
        'document_root': settings.MEDIA_ROOT,
    }),
    url(r'^ajax_select/', include(ajax_select_urls)),
]
