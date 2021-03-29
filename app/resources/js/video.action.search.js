$( function() {

    var form = $('#video-search-text');

    if (form.length === 0) return false;

    var csrf_name = form.find('input[name="csrf_name"]').val();
    var csrf_value = form.find('input[name="csrf_value"]').val();
    var results_holder = $('#results');
    var global_templates_holder = $('#global-templates-holder');
    var global_alert_search_text = global_templates_holder.find('div[name="global_template_alert_search_text"]');
    var button = form.find('button[type="button"]');
    var is_loading = false;
    var add_results = function(results) {

        $.each(results, function(i, result) {
            global_functions.launch_template(
                global_functions.build_template(global_alert_search_text, result, true),
                results_holder
            );
        });
        activate_results();
    };
    var activate_results = function() {

        var go_to_button = results_holder.find('.go-to');
        var preview_button = results_holder.find('.show-preview');
        var close_preview = results_holder.find('.hide-preview');

        $.each(go_to_button, function(key, val) {
            var ze_button = $(this);
            var holder = ze_button.parent().parent().parent('.list-group-item');
            var data = holder.data();
            var go_to_button_url = ze_button.attr('href');
            var new_href = go_to_button_url;

            new_href = new_href.replace('start_segment', encodeURIComponent(data.startSegment));
            new_href = new_href.replace('end_segment', encodeURIComponent(data.endSegment));
            new_href = new_href.replace('publication', encodeURIComponent(data.pubId));

            ze_button.attr('href', new_href);
        });

        preview_button.unbind().on('click', function() {

            var ze_button = $(this);
            var holder = ze_button.parent().parent().parent('.list-group-item');
            var data = holder.data();

            global_functions.button_is_loading(ze_button);
            holder.find('.text-preview').text('');
            $.ajax({
                method: 'post',
                url: data.getTextUrl,
                data: {
                    publication: data.pubId,
                    start_date: data.startDate,
                    end_date: data.endDate,
                    csrf_name: csrf_name,
                    csrf_value: csrf_value,
                },
                complete: function (result) {
                    event_emitter.trigger('form.ajax.result.alert', [result, form]);
                    global_functions.button_is_not_loading(ze_button);
                    is_loading = false;
                    if (
                        result.responseJSON !== undefined
                        && result.responseJSON.result !== undefined
                        && result.responseJSON.result.texts !== undefined
                    ) {
                        holder.find('.text-preview').html(result.responseJSON.result.texts.join(' '));
                        ze_button.hide();
                        ze_button.parent().find('.hide-preview').show();
                    }
                }
            })
        });

        close_preview.unbind().on('click', function() {

            var ze_button = $(this);
            var holder = ze_button.parent().parent().parent('.list-group-item');

            holder.find('.text-preview').text('');
            ze_button.hide();
            ze_button.parent().find('.show-preview').show();
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