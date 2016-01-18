from django.db import models
from django.utils.translation import ugettext as _

class Event(models.Model):
    title = models.CharField(_('title'), max_length=255)
    date = models.DateField(_('date'), null=False)
    startTime = models.TimeField(_('start time'), null=False)
    endTime = models.TimeField(_('end time'), null=False)
    description = models.TextField(_('description'))
    image = models.ImageField(_('image'), upload_to='events/%Y/%m/%d/', null=False)
    location = models.CharField(_('location'), max_length=100)

    def __str__(self):
        return self.title
