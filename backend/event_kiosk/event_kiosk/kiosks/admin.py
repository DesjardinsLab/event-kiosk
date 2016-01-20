from django.contrib import admin
from django.utils.translation import ugettext as _
from .models import *
from django.core.urlresolvers import reverse
from event_kiosk.content.models import Section

class SectionInlineAdmin(admin.TabularInline):
    model = Section
    fieldsets = (
        ( None, { 'fields': ('title', ) } ),
    )
    extra = 0


@admin.register(Kiosk)
class KioskAdmin(admin.ModelAdmin):
    list_display = [ 'name', 'presentation', ]
    fieldsets = (
        (_('Information'), { 'fields' : [ 'name', 'presentation' ] }),
    )
    inlines = [SectionInlineAdmin, ]

    def view_on_site(self, obj):
        return '/%s' % obj.name
