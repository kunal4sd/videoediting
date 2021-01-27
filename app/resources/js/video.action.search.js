$( function() {

    var form = $('#video-search-text');

    if (form.length === 0) return false;

    var results_holder = $('#results');
    var global_templates_holder = $('#global-templates-holder');
    var global_alert_search_text = global_templates_holder.find('div[name="global_template_alert_search_text"]');
    var button = form.find('button[type="button"]');
    var is_loading = false;
    var add_results = function(results) {

        $.each(results, function(i, result) {
            global_functions.launch_template(
                global_functions.build_template(global_alert_search_text, result),
                results_holder
            );
        });
        activate_results();
    };
    var activate_results = function() {

        var results = results_holder.find('.list-group-item');

        results.unbind().on('click', function() {

            var result = $(this);

            result.addClass('list-group-item-warning');
            result.removeClass('list-group-item-success');
        });
    };
    var clear_results = function() {
        results_holder.html('');
    };

    button.on('click', function(e) {
        e.preventDefault();
        form.trigger('submit');
    });

    form.on("submit", function(e) {

        e.preventDefault();
        clear_results();

        if (!is_loading) {

            is_loading = true;
            var form = $(this);
            var data = global_functions.form_to_json(form);

            global_functions.button_is_loading(button);
            $.ajax({
                method: 'post',
                url: form.attr('action'),
                data: data,
                complete: function (result) {
                    event_emitter.trigger('form.ajax.result.alert', [result, form]);
                    global_functions.button_is_not_loading(button);
                    is_loading = false;
                    if (
                        result.responseJSON !== undefined
                        && result.responseJSON.result !== undefined
                        && result.responseJSON.result.texts !== undefined
                    ) {
                        add_results(result.responseJSON.result.texts);
                    }
                }
            });
        }
    });

    activate_results();

});