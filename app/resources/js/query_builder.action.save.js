$( function() {
    let form = $('#query-save');
    let formVideoTextSearch = $('#video-search-text');
    let saveQueryModal = $('#query-modal-save');
    let usersSelect = $('#query_users_select');

    let keywords_input = form.find('input[name="keywords"]');
    let keywords_select = $('#query_keywords_select');

    var url = keywords_select.attr('data-action');
    var url_initial = form.attr('data-initial-action');
    var csrf_name = form.find('input[name="csrf_name"]').val();
    var csrf_value = form.find('input[name="csrf_value"]').val();
    var initial_keywords = function(values) {

        var selected = [];
        var initials = values;
        var option = false;

        option = new Option('', 0, true, true);
        keywords_select.html('').trigger('change');

        for (var s in initials) {
            selected.push(initials[s].id);
            var text = initials[s].name_en + ' ::: ' + initials[s].name_ar;
            option = new Option(text, initials[s].id, true, true);
            keywords_select.append(option).trigger('change');
        }
        keywords_input.attr('value', selected.join(','));
    };
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
        let searchText = formVideoTextSearch.find('[name="text"]').val();
        form.find('#query_content_input').val(searchText);
        let queryIdToUpdate = formVideoTextSearch.find('input[name="query_id"]').val();//if updating
        form.find('input[name="id"]').val(queryIdToUpdate);
        //if updating - set title,users,keywords
        if(queryIdToUpdate){
            $.ajax({
                url: url_initial,
                type: 'POST',
                data: {
                    query_id: queryIdToUpdate,
                    csrf_name: csrf_name,
                    csrf_value: csrf_value
                },
                complete: function(result) {
                    if (result.responseJSON !== undefined && result.responseJSON.success) {
                        let searchQuery = result.responseJSON?.result?.data;
                        console.log('search query',searchQuery);
                        //set title
                        form.find('#query_title_input').val(searchQuery.title);
                        //set users
                        form.find('#query_users_select').val(searchQuery.user_ids).trigger('change');
                        //set keywords
                        initial_keywords(searchQuery.keywords);
                    }
                }
            });
            form.find('#save-update-query').text('Update');
        }else{
            form.find('#save-update-query').text('Save')
        }

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
            event_emitter.trigger('search-query.list.updated');
            saveQueryModal.modal('hide');
            //todo show success message

        }).fail(function (result, textStatus, errorThrown) { // Fail
            console.log('error saving',result);
        });
        return false;
    });

});
