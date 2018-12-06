$( function() {

    var publication_select = $('#publication_select');
    var publication_input = $('#publication_input');
    publication_select.select2();
    publication_select.on('change', function() {
        publication_input.attr('value', publication_select.val().join(','));
    });

});
