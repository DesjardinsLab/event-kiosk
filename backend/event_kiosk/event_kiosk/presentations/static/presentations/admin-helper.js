(function($) {

  $(function() {

    $('#slides-group .form-row').each(function() {
      var index = $(this).attr('id').split('-')[1];
      var selectedType = $(this).find('.field-type select').val();
      var imgWidget = $('#slides-' + index + ' .field-image');
      var eventWidget = $('#slides-' + index + ' .field-event');

      imgWidget.css('opacity', '0');
      eventWidget.css('opacity', '0');

      if (selectedType == 'image') {
        imgWidget.css('opacity', '1');

      } else if (selectedType == 'event') {
        eventWidget.css('opacity', '1');
      }

    });

    $('#slides-group').on('change', '.field-type select', function() {
      var selectedType = $(this).val();

      var index = $(this).attr('name').split('-')[1];
      console.log(index);

      var imgWidget = $('#slides-' + index + ' .field-image');
      var eventWidget = $('#slides-' + index + ' .field-event');

      imgWidget.css('opacity', '0');
      eventWidget.css('opacity', '0');

      if (selectedType == 'image') {
        imgWidget.css('opacity', '1');

      } else if (selectedType == 'event') {
        eventWidget.css('opacity', '1');
      }

    });
  });

}(django.jQuery));
