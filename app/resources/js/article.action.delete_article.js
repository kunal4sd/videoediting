$(function() {
    event_emitter.on('article.delete.article', function(e, btn, url, data) {
        $.ajax({
            method: 'post',
            url: url,
            data: data,
            complete: function (result) {

                if (
                    result.responseJSON !== undefined
                    && result.responseJSON.success
                ) {
                    event_emitter.trigger('article.delete.article.done', btn);
                    event_emitter.trigger('form.ajax.result.alert', [result]);
                }
            }
        });
    });
});
