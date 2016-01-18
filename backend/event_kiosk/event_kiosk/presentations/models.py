from django.db import models
from django.utils.translation import ugettext as _



class Presentation(models.Model):
    name = models.SlugField(_('name'))

    def __str__(self):
        return self.name


class Slide(models.Model):

    SLIDE_TYPE_CHOICES = (
        ('image', _('Image')),
        ('event', _('Event')),
        ('eventList', _('Event list')),
    )

    name = models.SlugField(_('name'))
    presentation = models.ForeignKey(to=Presentation, related_name="slides", null=False, blank=False)
    type = models.CharField(_('type'), max_length=32, choices=SLIDE_TYPE_CHOICES, default=None, blank=False, null=False)
    image = models.ImageField(_('image'), upload_to='slides/%Y/%m/%d/', null=True, blank=True)
    event = models.ForeignKey(to=Event, related_name="slides", null=False, blank=False)

    def __str__(self):
        return self.name
