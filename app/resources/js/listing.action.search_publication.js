$( function() {

    var publication_select = $('#listing-publication-select');

    if (publication_select.length === 0) return false;

    var publication_input = $('#listing-publication-input');
    publication_select.select2();
    publication_select.on('change', function() {
        publication_input.attr('value', publication_select.val().join(','));
    });

});
