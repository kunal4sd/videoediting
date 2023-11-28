$( function() {
    let form = $('#query-save');
    let formVideoTextSearch = $('#video-search-text');
    let saveQueryModal = $('#query-modal-save');
    let usersSelect = $('#query_users_select');
    let keywordsSelect = $('#query_keywords_select');


    usersSelect.select2({width: "100%"});
    keywordsSelect.select2({width: "100%"});

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
