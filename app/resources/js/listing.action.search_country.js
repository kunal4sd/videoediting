$( function() {

    var country_select = $('#listing-country-select');

    if (country_select.length === 0) return false;

    var input = $('#listing-country-input');
    country_select.select2();
    country_select.on('change', function() {
        input.attr('value', country_select.val().join(','));
    });
});
