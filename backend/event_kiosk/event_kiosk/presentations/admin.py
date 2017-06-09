from django.contrib import admin
from django.utils.translation import ugettext as _
from .models import *
from adminsortable2.admin import SortableInlineAdminMixin


class SlideInlineAdmin(SortableInlineAdminMixin, admin.TabularInline):
    model = Slide
    fieldsets = (
        (None, {'fields': ('type', 'displayType', 'image', 'event', 'position', 'location', 'lat', 'lon', )}),
    )
    extra = 0


@admin.register(Presentation)
class PresentationAdmin(admin.ModelAdmin):
    list_display = ['name', ]
    fieldsets = (
        (_('Information'), {'fields': ['name', 'headerImage', 'transitionTime', 'pauseTimeOnTouch', ]}),
        (_('Options'), {'fields': ['displayMenu', 'displayIndicators', ]},),
    )
    inlines = [SlideInlineAdmin, ]

    class Media:
        js = (
            'presentations/admin-helper.js',
        )
        css = {
            'all': ('presentations/tabular-inline.css', )
        }
