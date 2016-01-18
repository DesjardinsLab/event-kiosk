from django.contrib import admin
from django.utils.translation import ugettext as _
from .models import *

@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = [ 'title', 'location', 'date', 'startTime', 'endTime',   ]
    fieldsets = (
        (_('Information'), { 'fields' : [ 'title', 'location', 'description', 'image' ] }),
        (_('Schedule'), { 'fields' : [ 'date', 'startTime', 'endTime' ] }),
    )
    list_filter = (
        'location', 'date',
    )
