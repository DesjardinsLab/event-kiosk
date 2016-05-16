from django.views.generic.base import TemplateView
from django.shortcuts import get_object_or_404, render
from .models import Kiosk
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
import django.utils.timezone as timezone
import os
import datetime

class KioskView(TemplateView):

    template_name = "kiosk.html"

    def get_context_data(self, **kwargs):
        slug = kwargs['name']

        kiosk = get_object_or_404(Kiosk, name=slug)

        context = super(KioskView, self).get_context_data(**kwargs)
        context['kiosk'] = kiosk.name
        return context

@csrf_exempt
def kiosk_data(request, **kwargs):
    slug = kwargs['name']
    kiosk = get_object_or_404(Kiosk, name=slug)
    currentPresentation = kiosk.presentation

    # construct the JSON representation of the kiosk
    for scheduledPresentation in kiosk.kioskpresentationcalendar_set.all():
        if scheduledPresentation.endTime > timezone.now() >= scheduledPresentation.startTime:
            currentPresentation = scheduledPresentation.scheduledPresentation
        elif timezone.now() > scheduledPresentation.endTime:
            scheduledPresentation.delete()

    sections = []
    for section in kiosk.sections.all():
        sections.append(section.to_json())

    slides = []
    for slide in currentPresentation.slides.all():
        slides.append(slide.to_json())

    presentation = {
        'transitionTime': currentPresentation.transitionTime * 1000,
        'pauseTimeOnTouch': currentPresentation.pauseTimeOnTouch * 1000,
        'slides': slides,
        'displayMenu': currentPresentation.displayMenu,
        'displayIndicators': currentPresentation.displayIndicators
    }

    kiosk = {
        'appVersion': os.environ.get('APP_VERSION'),
        'presentation': presentation,
        'sections': sections
    }

    return JsonResponse(kiosk)

def appcache_manifest(request, **kwargs):
    return render(request, 'appcache.html', content_type="text/cache-manifest; charset=utf-8")
