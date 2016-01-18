from django.db import models
from django.utils.translation import ugettext as _
from event_kiosk.presentations.models import Presentation

class Kiosk(models.Model):
    name = models.SlugField(_('name'))
    presentation = models.ForeignKey(to=Presentation, related_name='+', null=True, blank=True)

    def __str__(self):
        return self.name
