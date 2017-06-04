#!/usr/bin/env python
from __future__ import unicode_literals

from ajax_select import register, LookupChannel
from event_kiosk.events.models import Speaker


@register('speakers')
class SpeakersLookup(LookupChannel):
    model = Speaker

    def get_query(self, q, request):
        return self.model.objects.filter(name__icontains=q).order_by('name')[:50]

    def format_item_display(self, item):
        return '<span class=\'speaker\'>{name}</span>'.format(name=item.name)
