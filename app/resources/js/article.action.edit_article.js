$(function() {

    var form_edit_article = $('#article-edit-article');

    form_edit_article.on('submit', function(e) {
        e.preventDefault();

        var form = $(this);
        var url = form.attr('action');
        var data = global_functions.form_to_json(form);

        $.ajax({
            method: 'post',
            url: url,
            data: data,
            complete: function (result) {
                event_emitter.trigger('article.edit.article.done', [result, data]);
                event_emitter.trigger('form.ajax.result.alert', [result, form]);
            }
        });
    });
});
