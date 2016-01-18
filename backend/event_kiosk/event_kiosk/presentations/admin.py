from django.contrib import admin
from django.utils.translation import ugettext as _
from .models import *

class SlideInlineAdmin(admin.TabularInline):
    model = Slide
    fieldsets = (
        ( None, { 'fields': ('type', 'image', 'event', ) } ),
    )
    extra = 0


@admin.register(Presentation)
class PresentationAdmin(admin.ModelAdmin):
    list_display = [ 'name', ]
    fieldsets = (
        (_('Information'), { 'fields' : [ 'name', 'transitionTime', 'pauseTimeOnTouch', ] }),
    )
    inlines = [SlideInlineAdmin,]
