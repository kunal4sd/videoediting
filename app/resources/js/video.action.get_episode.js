$( function() {

    var episodes_holder = $('#video-episodes-holder');

    if (episodes_holder.length === 0) return false;

    var active_episodes = 0;
    var episodes_counter = 0;
    var episodes_per_row = 4;
    var player = videojs.getPlayer('video-preview');
    var form_get_episode = $('#video-get-episode');
    var button = form_get_episode.find('button[type="button"]');
    var is_loading = false;
    var add_episode = function(src, poster) {

        var id = 'video-episode-' + episodes_counter;
        episodes_holder.append(
            '<div class="col-md-' + Math.floor( 12 / episodes_per_row ) + '">'
            + '<div class="row mx-auto">'
            + '<video id="' + id + '" class="col-sm-12 video-js vjs-big-play-centered vjs-default-skin mr-2 mt-2" controls poster="/images/no_video.png" preload="auto" data-setup=\'{"inactivityTimeout":0,"width":426,"height":225,"playbackRates":[0.5,1,1.25,1.5,2], "seekButtons":{"forward": 5,"back": 5}}\'></video>'
            + '</div>'
            + '<div class="row mx-auto">'
            + '<button id="remove-' + id + '" class="col-sm-12 btn btn-danger btn-md oi oi-trash"></button>'
            + '</div>'
            + '</div>'
        );

        $('#remove-' + id).unbind().on('click', function(e) {

            $('#' + id).parent().parent().remove();
            active_episodes--;

            if (active_episodes === 0) {
                $('#video-episodes-to-movie').hide();
            }
            video_player.dispose();
        });

        var video_player = videojs(id, { width: 426, height: 225, controls: true, plugins: {} });
        var options = { hidden:true, responsive: true, width: 426, height: 225 }
        global_functions.set_playlist_to_player(video_player, src);
        global_functions.set_poster_to_player(video_player, poster);
        video_player.currentTime(0.1);
        video_player.rangeslider(options);
        episodes_counter++;
        active_episodes++;

        if (active_episodes) {
            $('#video-episodes-to-movie').show();
        }
    }
    var range_is_valid = function(from, to) {
        return from >= 0 && to > 0 && from < to;
    }

    button.on('click', function(e) {
        e.preventDefault();
        form_get_episode.submit();
    });

    form_get_episode.on('submit', function(e) {
        e.preventDefault();


        if (!is_loading) {

            is_loading = true;
            var from = Math.floor(player.rangeslider.start);
            var to = Math.ceil(player.rangeslider.end);
            var source = player.currentSource();

            if (source !== undefined && source.src !== undefined && range_is_valid(from, to)) {

                var form = $(this);
                var url = form.attr('action');

                global_functions.button_is_loading(button);
                $.ajax({
                    method: 'post',
                    url: url,
                    data: {
                        from: from,
                        to: to,
                        playlist: source.src,
                        csrf_name: form.find('input[name="csrf_name"]').val(),
                        csrf_value: form.find('input[name="csrf_value"]').val()
                    },
                    complete: function (result) {
                        event_emitter.trigger('form.ajax.result.alert', [result]);
                        global_functions.button_is_not_loading(button);
                        is_loading = false;
                        if (
                            result.responseJSON.result !== undefined
                            && result.responseJSON.result.src !== undefined
                        ) {
                            add_episode(result.responseJSON.result.src, result.responseJSON.result.poster);
                        }
                    }
                });
            }
            else {
                event_emitter.trigger('show_global_errors', [ ['Please load a playlist first and then set the time range correctly.'] ]);
                is_loading = false;
            }
        }
    });
});