from django.db import models
from django.utils.translation import ugettext as _

class Kiosk(models.Model):
    name = models.SlugField(_('name'))

    def __str__(self):
        return self.name
