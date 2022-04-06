$( function() {

    var form_edit_article = $('#article-edit-article');
    var keywords_input = form_edit_article.find('input[name="keywords"]');
    var keywords_select = $('#article-keywords-selector');
    var url = keywords_select.attr('data-action');
    var url_initial = keywords_select.attr('data-initial-action');
    var csrf_name = form_edit_article.find('input[name="csrf_name"]').val();
    var csrf_value = form_edit_article.find('input[name="csrf_value"]').val();
    var initial_keywords = function(values) {

        var selected = [];
        var initials = values.result;
        var option = false;

        option = new Option('', 0, true, true);
        keywords_select.html('').trigger('change');

        for (var s in initials) {
            selected.push(initials[s].id);
            option = new Option(initials[s].text, initials[s].id, true, true);
            keywords_select.append(option).trigger('change');
        }
        keywords_input.attr('value', selected.join(','));
    };
    var format_keyword = function(keyword) {
        return keyword.text;
    };

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

    event_emitter.on('movie.edit.open', function(e, article_id) {
        $.ajax({
            url: url_initial,
            type: 'POST',
            data: {
                article_id: article_id,
                csrf_name: csrf_name,
                csrf_value: csrf_value
            },
            complete: function(result) {
                if (result.responseJSON !== undefined && result.responseJSON.success) {
                    initial_keywords(result.responseJSON);
                }
            }
        });
    });
});
