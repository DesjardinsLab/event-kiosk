from django.db import models
from django.utils.translation import ugettext as _
from event_kiosk.presentations.models import Presentation

class Kiosk(models.Model):
    name = models.SlugField(_('name'))
    presentation = models.ForeignKey(to=Presentation, related_name='+', null=True, blank=True)
    presentation_calendar = models.ManyToManyField(to=Presentation, through='KioskPresentationCalendar', through_fields=('kiosk', 'scheduledPresentation'))

    def __str__(self):
        return self.name

class KioskPresentationCalendar(models.Model):
    kiosk = models.ForeignKey(Kiosk, on_delete=models.CASCADE)
    scheduledPresentation = models.ForeignKey(Presentation, on_delete=models.CASCADE)
    startTime = models.DateTimeField(_('start time'))
    endTime = models.DateTimeField(_('end time'))
