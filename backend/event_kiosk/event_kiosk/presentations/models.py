from django.db import models
from django.utils.translation import ugettext as _
from event_kiosk.events.models import Event
from datetime import datetime


class Presentation(models.Model):
    name = models.CharField(_('name'), max_length=255, help_text=_('Reference name for this presentation. Only visible in the admin.'))
    transitionTime = models.PositiveIntegerField(_('transition time'), help_text=_('Number of seconds to display each slide.'))
    pauseTimeOnTouch = models.PositiveIntegerField(_('pause time on touch'), help_text=_('If someone interacts with the kiosk, stop the slideshow for this number of seconds.'))

    headerImage = models.ImageField(_('header image'), upload_to='headers/', null=True, blank=True)

    displayMenu = models.BooleanField(_('display menu'), default=True, help_text=_('Whether or not the menu should appear on this presentation.'))
    displayIndicators = models.BooleanField(_('display indicators'), default=True, help_text=_('Whether or not to display the little dots at the bottom that show slideshow progress.'))

    def __str__(self):
        return self.name


class Slide(models.Model):
    IMAGE = 'image'
    EVENT = 'event'
    EVENT_LIST = 'eventList'
    WEATHER = 'weather'

    SLIDE_TYPE_CHOICES = (
        ('', ''),
        (IMAGE, _('Image')),
        (EVENT, _('Event')),
        (EVENT_LIST, _('Event list')),
        (WEATHER, _('Weather')),
    )

    MONTHLY = 'MONTHLY'
    DAILY = 'DAILY'

    EVENT_LIST_SLIDE_FORMAT_CHOICES = (
        (MONTHLY, _('Monthly')),
        (DAILY, _('Daily'))
    )

    presentation = models.ForeignKey(to=Presentation, related_name="slides", null=False, blank=False)
    type = models.CharField(_('type'), max_length=32, choices=SLIDE_TYPE_CHOICES, default=None, blank=False, null=False)

    # Image slide background image
    image = models.ImageField(_('image'), upload_to='slides/%Y/%m/%d/', null=True, blank=True)

    # Event slide event
    event = models.ForeignKey(to=Event, related_name="slides", null=True, blank=True)

    # Event list slide display type
    displayType = models.CharField(_('event list display type'), max_length=32,
                                          choices=EVENT_LIST_SLIDE_FORMAT_CHOICES, default=MONTHLY,
                                          blank=False, null=False)

    position = models.PositiveIntegerField(default=0, blank=False, null=False)

    # Weather slide information
    location = models.CharField(_('location'), help_text=_('A comma-delimited country name and country code (ISO 3166)'), max_length=255, null=True, blank=True)
    lat = models.DecimalField(_('latitude'), null=True, blank=True, max_digits=10, decimal_places=7)
    lon = models.DecimalField(_('longitude'), null=True, blank=True, max_digits=10, decimal_places=7)

    def to_json(self):
        if (self.type == 'image'):
            return {
                'type': 'image',
                'title': '',
                'img': self.image.url
            }

        elif (self.type == 'event'):
            return {
                'type': 'event',
                'title': self.event.shortTitle if self.event.shortTitle != '' else self.event.title,
                'event': self.event.to_json()
            }

        elif (self.type == 'weather'):
            return {
                'type': 'weather',
                'location': self.location,
                'lat': self.lat,
                'lon': self.lon,
                'title': ''
            }

        elif (self.type == 'eventList'):
            events = Event.objects.filter(
                date__gte=datetime.today()
            ).order_by('date', 'startTime', 'shortTitle', 'title')
            events_json = []
            for event in events:
                events_json.append(event.to_json())

            return {
                'type': 'eventList',
                'title': _('Upcoming events'),
                'displayType': self.displayType,
                'events': events_json
            }

    def __str__(self):
        return 'Slide'

    class Meta(object):
        ordering = ('position', )
