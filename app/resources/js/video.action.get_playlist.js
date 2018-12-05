$( function() {

    var form = $("#get_playlist");
    var playlists_holder = $("#playlists_holder");
    var global_templates_holder = $('#global-templates-holder');
    var global_alert_playlist = global_templates_holder.find('div[name="global_template_alert_playlist"]');
    var button = form.find('button[type="button"]');
    var is_loading = false;
    var add_playlists = function(playlists) {

        playlists_holder.html('');
        $.each(playlists, function(i, playlist) {
            global_functions.launch_template(
                global_functions.build_template(global_alert_playlist, playlist),
                playlists_holder
            );
        });
        activate_playlists();
    }
    var activate_playlists = function() {
        playlists_holder.find('.list-group-item').unbind().on('click', function() {

            var playlist = $(this);
            var data = playlist.data();

            global_functions.set_playlist_to_videojs(data.url);
            global_functions.set_poster_to_videojs(data.poster);
        });
    }

    button.on('click', function(e) {
        e.preventDefault();
        form.trigger('submit');
    });

    form.on("submit", function(e) {

        e.preventDefault();

        if (!is_loading) {

            is_loading = true;
            var form = $(this);
            var data = global_functions.form_to_json(form);

            global_functions.button_is_loading(button);
            event_emitter.trigger('movie.get.list', data);
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
                        && result.responseJSON.result.playlists !== undefined
                    ) {
                        add_playlists(result.responseJSON.result.playlists);
                        global_functions.clear_episodes();
                    }
                }
            });
        }
    });

    activate_playlists();

});