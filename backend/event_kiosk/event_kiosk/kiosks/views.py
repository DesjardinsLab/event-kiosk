from django.views.generic.base import TemplateView
from django.shortcuts import get_object_or_404
from .models import Kiosk

class KioskView(TemplateView):

    template_name = "kiosk.html"

    def get_context_data(self, **kwargs):
        slug = kwargs['name']

        kiosk = get_object_or_404(Kiosk, name=slug)

        context = super(KioskView, self).get_context_data(**kwargs)
        context['kiosk'] = kiosk.name
        return context
