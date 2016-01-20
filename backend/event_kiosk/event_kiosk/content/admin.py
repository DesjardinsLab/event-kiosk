from django.contrib import admin
from django.utils.translation import ugettext as _
from .models import *


class WebAssetInlineAdmin(admin.TabularInline):
    model = WebAsset
    fieldsets = (
        ( None, { 'fields': ('asset', ) } ),
    )
    extra = 0


@admin.register(Page)
class PageAdmin(admin.ModelAdmin):
    list_display = [ 'title', 'weight', 'kiosk', 'section'  ]
    list_filter = ['section__kiosk', 'section']
    fieldsets = (
        (_('Information'), { 'fields' : [ 'title', 'section', 'icon', 'weight', 'html' ] }),
    )
    inlines = [WebAssetInlineAdmin,]
