$( function() {

    var select = $('#listing-country-select');

    if (select.length === 0) return false;

    var input = $('#listing-country-input');
    select.select2();
    select.on('change', function() {
        input.attr('value', select.val().join(','));
    });
});
