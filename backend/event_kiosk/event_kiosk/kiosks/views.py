from django.views.generic.base import TemplateView

class KioskView(TemplateView):

    template_name = "kiosk.html"

    def get_context_data(self, **kwargs):
        context = super(KioskView, self).get_context_data(**kwargs)
        return context
