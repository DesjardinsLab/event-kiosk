var django = {
    "jQuery": django.jQuery.noConflict(true)
};
var jQuery = django.jQuery;
var $=jQuery;

$( document ).ready(function() {
    $('#id_speakers').chosen({width: "610px"});
});
