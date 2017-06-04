from ajax_select.admin import AjaxSelectAdmin
from ajax_select.helpers import make_ajax_form
from django.contrib import admin
from django.utils.translation import ugettext as _
from event_kiosk.events.models import *


@admin.register(Speaker)
class SpeakerAdmin(admin.ModelAdmin):
    list_display = ['name']
    fieldsets = (
        (_('Information'), {'fields': ['name', 'image', 'bio']}),
    )


@admin.register(Event)
class EventAdmin(AjaxSelectAdmin):
    list_display = ['title', 'location', 'date', 'startTime', 'endTime', ]
    fieldsets = (
        (_('Information'), {'fields': [
            'title', 'shortTitle', 'subTitle', 'location', 'description', 'image', 'registrationUrl', 'prettyUrl'
        ]}),
        (_('Speakers'), {'fields': ['speakers']}),
        (_('Schedule'), {'fields': ['date', 'startTime', 'endTime']}),
    )

    form = make_ajax_form(Event, {
        'speakers': 'speakers'
    })

    list_filter = (
        'location', 'date',
    )

    class Media:
        css = {
            'all': ('speakers-ajax-select-admin.css',)
        }
