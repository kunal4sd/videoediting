$( function() {

    var status_select = $('#status_select');
    var status_input = $('#status_input');
    status_select.select2();
    status_select.on('change', function() {
        status_input.attr('value', status_select.val().join(','));
    });

});
