(function($) {

  $(function() {
    $('#slides-group .form-row').each(function() {
      var index = $(this).attr('id').split('-')[1];
      var selectedType = $(this).find('.field-type select').val();
      var imgWidget = $('#slides-' + index + ' .field-image input');
      var eventWidget = $('#slides-' + index + ' .field-event > *');
      var weatherWidget = $('#slides-' + index + ' .field-location input');
      var latWidget = $('#slides-' + index + ' .field-lat input');
      var lonWidget = $('#slides-' + index + ' .field-lon input');
      var eventListTypeWidget = $('#slides-' + index + ' .field-displayType select');

      imgWidget.css('opacity', '0');
      eventWidget.css('opacity', '0');

      weatherWidget.css('opacity', '0');
      latWidget.css('opacity', '0');
      lonWidget.css('opacity', '0');

      eventListTypeWidget.css('opacity', '0');

      if (selectedType == 'image') {
        imgWidget.css('opacity', '1');

      } else if (selectedType == 'event') {
        eventWidget.css('opacity', '1');
      } else if (selectedType == 'weather') {
        weatherWidget.css('opacity', '1');
        latWidget.css('opacity', '1');
        lonWidget.css('opacity', '1');
      } else if (selectedType == 'eventList') {
        eventListTypeWidget.css('opacity', '1');
      }

    });

    $('#slides-group').on('change', '.field-type select', function() {
      var selectedType = $(this).val();

      var index = $(this).attr('name').split('-')[1];
      console.log(index);

      var imgWidget = $('#slides-' + index + ' .field-image input');
      var eventWidget = $('#slides-' + index + ' .field-event > *');

      var weatherWidget = $('#slides-' + index + ' .field-location input');
      var latWidget = $('#slides-' + index + ' .field-lat input');
      var lonWidget = $('#slides-' + index + ' .field-lon input');

      var eventListTypeWidget = $('#slides-' + index + ' .field-displayType > *');

      imgWidget.css('opacity', '0');
      eventWidget.css('opacity', '0');

      weatherWidget.css('opacity', '0');
      latWidget.css('opacity', '0');
      lonWidget.css('opacity', '0');

      eventListTypeWidget.css('opacity', '0');

      if (selectedType == 'image') {
        imgWidget.css('opacity', '1');

      } else if (selectedType == 'event') {
        eventWidget.css('opacity', '1');
      } else if (selectedType == 'weather') {
        weatherWidget.css('opacity', '1');
        latWidget.css('opacity', '1');
        lonWidget.css('opacity', '1');
      } else if (selectedType == 'eventList') {
        eventListTypeWidget.css('opacity', '1');
      }

    });
  });

}(django.jQuery));
