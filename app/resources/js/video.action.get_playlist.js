$( function() {

    var form = $('#video-get-playlist');

    if (form.length === 0) return false;

    var playlists_holder = $('#video-playlists-holder');
    var global_templates_holder = $('#global-templates-holder');
    var global_alert_playlist = global_templates_holder.find('div[name="global_template_alert_playlist"]');
    var button = form.find('button[type="button"]');
    var is_loading = false;
    var add_playlists = function(playlists) {

        $.each(playlists, function(i, playlist) {
            global_functions.launch_template(
                global_functions.build_template(global_alert_playlist, playlist),
                playlists_holder
            );
        });
        activate_playlists();
        global_functions.refresh_playlist_holder_height();
    };
    var activate_playlists = function() {

        var playlists = playlists_holder.find('.list-group-item');

        playlists.unbind().on('click', function() {

            var playlist = $(this);
            var data = playlist.data();

            global_functions.reset_player();
            global_functions.unselect_playlists(playlists);
            playlist.addClass('list-group-item-warning');
            playlist.removeClass('list-group-item-success');

            global_functions.set_playlist_to_videojs(data.url);
            global_functions.set_poster_to_videojs(data.poster);
        });
    };
    var clear_movies = function() {
        $('#video-movies-holder').html('');
    };
    var clear_playlists = function() {
        playlists_holder.html('');
    };

    button.on('click', function(e) {
        e.preventDefault();
        form.trigger('submit');
    });

    form.on("submit", function(e) {

        e.preventDefault();
        clear_movies();
        global_functions.clear_episodes();
        clear_playlists();
        global_functions.reset_player();

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
                    }
                }
            });
        }
    });

    activate_playlists();

});