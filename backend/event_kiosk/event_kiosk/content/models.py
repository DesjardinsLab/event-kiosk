from django.db import models
from django.utils.translation import ugettext as _
from event_kiosk.kiosks.models import Kiosk

def validate_svg_files(value):
    if not value.name.endswith('.svg'):
        raise ValidationError(_('Icon should be a SVG file.'))

class Section(models.Model):
    title = models.CharField(_('title'), max_length=60, help_text=_('Name for this section. Will be shown in menu.'))
    kiosk = models.ForeignKey(to=Kiosk, related_name='sections', null=True)

    def __str__(self):
        if (self.kiosk):
            return "%s / %s" % (self.kiosk.name.capitalize(), self.title)
        else:
            return "%s / %s" % (_('(orphan)'), self.title)

class Page(models.Model):
    section = models.ForeignKey(to=Section, related_name='pages', null=False)
    title = models.CharField(_('title'), max_length=60, help_text=_('Page title. Will be shown in menu and top application bar.'))
    icon = models.FileField(_('icon (svg)'), upload_to='icons/%Y/%m/%d/', null=True, blank=True, validators=[validate_svg_files])
    html = models.TextField(_('content (html)'))
    weight = models.IntegerField(_('weight'), help_text=_('Pages in the menu will be ordered by weight'), null=False, default=0)

    def kiosk(self):
        return self.section.kiosk

    def __str__(self):
        return self.title

    class Meta:
        ordering = ["section__kiosk", "section", "weight"]


class WebAsset(models.Model):
    asset = models.FileField(_('file'), upload_to='assets/%Y/%m/%d/', help_text=_('Add any asset you wish to save on the server to be used on the page, like images, css, js, etc...'), null=False)
    page = models.ForeignKey(to=Page, related_name='assets', help_text=_('Page on which this asset is used.'), null=True)
