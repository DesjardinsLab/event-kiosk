from django.contrib import admin
from django.utils.translation import ugettext as _
from .models import *
from django.core.urlresolvers import reverse

@admin.register(Kiosk)
class KioskAdmin(admin.ModelAdmin):
    list_display = [ 'name', 'presentation', ]
    fieldsets = (
        (_('Information'), { 'fields' : [ 'name', 'presentation' ] }),
    )

    def view_on_site(self, obj):
        return '/%s' % obj.name
