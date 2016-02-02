from django.contrib import admin
from django.utils.translation import ugettext as _
from .models import *

@admin.register(Speaker)
class SpeakerAdmin(admin.ModelAdmin):
    list_display = [ 'name' ]
    fieldsets = (
        (_('Information'), { 'fields' : [ 'name', 'image', 'bio' ] }),
    )

@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = [ 'title', 'location', 'date', 'startTime', 'endTime', ]
    fieldsets = (
        (_('Information'), { 'fields' : [ 'title', 'shortTitle', 'subTitle', 'location', 'description', 'image', 'registrationUrl', 'prettyUrl' ] }),
        (_('Speakers'), { 'fields' : [ 'speakers' ] }),
        (_('Schedule'), { 'fields' : [ 'date', 'startTime', 'endTime' ] }),
    )
    list_filter = (
        'location', 'date',
    )

    class Media:
        js = ('kiosks/chosen_admin.js', 'chosen/chosen.jquery.min.js')
        css = {'all': ('chosen/chosen.min.css', 'kiosks/chosen_admin.css')}
