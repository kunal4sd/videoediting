$( function() {

    var event_emitter = $(document);
    var form = $("#authenticate");
    var button = form.find('button[type="button"]');
    var is_loading = false;

    form.on("submit", function(e) {

        e.preventDefault();

        if (!is_loading) {

            is_loading = true;
            var form = $(this);

            global_functions.button_is_loading(button);
            $.ajax({
                method: 'post',
                url: form.attr('action'),
                data: global_functions.form_to_json(form),
                complete: function (result) {
                    event_emitter.trigger('form.ajax.result.alert', [result, form]);
                    global_functions.button_is_not_loading(button);
                    is_loading = false;
                }
            });
        }
    });

    button.on('click', function() {
        form.trigger('submit');
    });
});