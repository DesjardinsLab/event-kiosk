from django.db import models
from django.utils.translation import ugettext as _
from event_kiosk.events.models import Event
from datetime import datetime

class Presentation(models.Model):
    name = models.CharField(_('name'), max_length=255, help_text=_('Reference name for this presentation. Only visible in the admin.'))
    transitionTime = models.PositiveIntegerField(_('transition time'), help_text=_('Number of seconds to display each slide.'))
    pauseTimeOnTouch = models.PositiveIntegerField(_('pause time on touch'), help_text=_('If someone interacts with the kiosk, stop the slideshow for this number of seconds.'))

    def __str__(self):
        return self.name


class Slide(models.Model):

    SLIDE_TYPE_CHOICES = (\
        ('', ''),
        ('image', _('Image')),
        ('event', _('Event')),
        ('eventList', _('Event list')),
    )

    presentation = models.ForeignKey(to=Presentation, related_name="slides", null=False, blank=False)
    type = models.CharField(_('type'), max_length=32, choices=SLIDE_TYPE_CHOICES, default=None, blank=False, null=False)
    image = models.ImageField(_('image'), upload_to='slides/%Y/%m/%d/', null=True, blank=True)
    event = models.ForeignKey(to=Event, related_name="slides", null=True, blank=True)

    def to_json(self):
        if (self.type == 'image'):
            return {
                'type': 'image',
                'title': 'Image',
                'img': self.image.url
            }

        elif (self.type == 'event'):
            return self.event.to_json()

        elif (self.type == 'eventList'):
            events = Event.objects.filter(date__gte=datetime.today())
            events_json = []
            for event in events:
                events_json.append(event.to_json())

            return {
                'type': 'eventList',
                'title': _('Events'),
                'events': events_json
            }

    def __str__(self):
        return 'Slide'