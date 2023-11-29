$( function() {
    let form = $('#query-save');
    let formVideoTextSearch = $('#video-search-text');
    let saveQueryModal = $('#query-modal-save');
    let usersSelect = $('#query_users_select');

    let keywords_input = form.find('input[name="keywords"]');
    let keywords_select = $('#query_keywords_select');

    var url = keywords_select.attr('data-action');
    var csrf_name = form.find('input[name="csrf_name"]').val();
    var csrf_value = form.find('input[name="csrf_value"]').val();
    var format_keyword = function(keyword) {
        return keyword.text;
    };
    usersSelect.select2({width: "100%"});
    keywords_select.select2({
        width: '100%',
        tokenSeparators: [","],
        multiple: true,
        closeOnSelect: true,
        minimumInputLength: 2,
        ajax: {
            placeholder: 'Select Keywords',
            url: url,
            type: 'POST',
            dataType: 'json',
            data: function (term, page) {
                return {
                    string: term.term,
                    csrf_name: csrf_name,
                    csrf_value: csrf_value
                };
            },
            processResults: function (data) {
                return { results: data.result };
            }
        },
        templateSelection: format_keyword
    });

    keywords_select.on('change', function() {
        keywords_input.attr('value', keywords_select.val().join(','));
    });

    function init(){
        let searchText = formVideoTextSearch.find('input[name="text"]').val();
        form.find('#query_content_input').val(searchText);
    }

    saveQueryModal.on('shown.bs.modal', function(){
        init();
    });

    form.on("submit", function(e) {
        e.preventDefault();
        $.ajax({
            url: form.attr('action'),
            type: "post",
            data: global_functions.form_to_json(form)

        }).done(function (result) { // Success
            console.log('successfully saved',result);
            saveQueryModal.modal('hide');
            //todo show success message

        }).fail(function (result, textStatus, errorThrown) { // Fail
            console.log('error saving',result);
        });
        return false;
    });

});
