$( function() {

    var status_select = $('#listing-status-select');

    if (status_select.length === 0) return false;

    var status_input = $('#listing-status-input');
    status_select.select2();
    status_select.on('change', function() {
        status_input.attr('value', status_select.val().join(','));
    });

});
