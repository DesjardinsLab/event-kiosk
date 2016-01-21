from django.db import models
from django.utils.translation import ugettext as _
from datetime import datetime

class Speaker(models.Model):
    name = models.CharField(_('name'), max_length=255)
    image = models.ImageField(_('image'), upload_to='speakers/%Y/%m/%d/', null=True)
    bio = models.TextField(_('bio'))

    def to_json(self):
        return {
            'name': self.name,
            'image': self.image.url,
            'bio': self.bio,
        }

    def __str__(self):
        return self.name


class Event(models.Model):
    title = models.CharField(_('title'), max_length=255)
    shortTitle = models.CharField(_('short title'), help_text=_('you can provide a shorter title for the event list.'), max_length=50, null=True, blank=True)
    subTitle = models.CharField(_('subtitle'), help_text=_('optional subtitle for the event list.'), max_length=50, null=True, blank=True)
    date = models.DateField(_('date'), null=False)
    startTime = models.TimeField(_('start time'), null=False)
    endTime = models.TimeField(_('end time'), null=False)
    description = models.TextField(_('description'))
    image = models.ImageField(_('image'), upload_to='events/%Y/%m/%d/', null=False)
    location = models.CharField(_('location'), max_length=100)
    speakers = models.ManyToManyField(Speaker, blank=True)
    registrationUrl = models.URLField(_('registration url'), help_text=_('URL for registrations to this event. Will be embedded in the QR code.'), null=True, blank=True)

    def to_json(self):
        speakers = []
        for speaker in self.speakers.all():
            speakers.append(speaker.to_json())

        return {
            'title': self.title,
            'shortTitle': self.shortTitle,
            'subTitle': self.subTitle,
            'startTime': datetime.combine(self.date, self.startTime),
            'endTime': datetime.combine(self.date, self.endTime),
            'desc': self.description,
            'img': self.image.url,
            'location': self.location,
            'speakers': speakers,
            'registrationUrl': self.registrationUrl
        }

    def __str__(self):
        return self.title
