$( function() {
    var form = $('#video-get-playlist');
    if (form.length === 0) { // Another page loaded
        return false;
    }

    if (form.length === 0) return false;

    var segment_text = $('#segment_text');
    var playlists_holder = $('#video-playlists-holder');
    var global_templates_holder = $('#global-templates-holder');
    var global_alert_playlist = global_templates_holder.find('div[name="global_template_alert_playlist"]');
    var button = form.find('button[type="button"]');
    var csrf_name = form.find('input[name="csrf_name"]').val();
    var csrf_value = form.find('input[name="csrf_value"]').val();
    var is_loading = false;
    let video = videojs('video-preview');

    let activate_transcript = function() {
        let transcript = video.transcriptVideoEditing();
        let transcriptContainer = document.querySelector('#transcript');
        transcriptContainer.innerHTML = '';
        transcriptContainer.appendChild(transcript.el());
        if ($("#publication_lang").val() == 'Arabic') {
            transcript.setLineClass('rtl');
        } else {
            transcript.setLineClass('ltr');
        }

        $(".transcript-line", transcriptContainer).css("float", "right");
    }

    video.ready(function() {
        $(".vjs-text-track-display").css("display","none");

        activate_transcript();
    });

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

            reload_transcript(data.publication, data.hash);
            // load_segment_texts(data.publication, data.hash, data.urlTexts);
        });
    };

    let get_vtt_url = function(publication, hash) {
        let interval = form.find('select[name="batch"]').val();
        let data = global_alert_playlist.data();
        let url = data.urlVtt;
        url = url.replace(/publication/, publication);
        url = url.replace(/interval/, interval);
        url = url.replace(/hash/, hash);

        return url;
    }

    let get_files_url = function(hash) {
        let interval = form.find('select[name="batch"]').val();
        let data = global_alert_playlist.data();
        let url = data.urlFiles;

        return url.replace(/hash/, hash);
    }

    let reload_transcript = function(publication, hash) {
        let urlVtt = get_vtt_url(publication, hash);
        let urlFiles = get_files_url(hash);
        let tracks = video.textTracks();
        let found = false;

        $("#vtt_link").attr("href", urlVtt);
        $("#files_link").attr("href", urlFiles);
        $(".vjs-text-track-display").css("display","none");

        for (let i = 0; i < tracks.length; i++) {
            let track = tracks[i];
            if (track.kind === 'captions' && track.id === hash) {
                found = true;
                track.mode = 'showing';
            } else {
                track.mode = 'disabled';
            }
        }

        if (!found) {
            let captionOption = {
                kind: "captions",
                id: hash,
                srclang: "en",
                label: "English",
                src: urlVtt,
                mode: 'showing'
            };
            video.addRemoteTextTrack(captionOption, false);
        }

        activate_transcript();
    }

    var clear_movies = function() {
        $('#video-movies-holder').html('');
    };
    var clear_playlists = function() {
        playlists_holder.html('');
    };
    var clear_segment_text = function() {
        segment_text.val('');
    };
    var load_segment_texts = function(publication, hash, url) {
        clear_segment_text();
        $.ajax({
            method: 'post',
            url: url,
            data: {
                publication: publication,
                hash: hash,
                csrf_name: csrf_name,
                csrf_value: csrf_value,
                ajax: true
            },
            complete: function (result) {
                if (
                    result.responseJSON !== undefined
                    && result.responseJSON.result !== undefined
                    && result.responseJSON.result.texts !== undefined
                ) {
                    segment_text.val(result.responseJSON.result.texts.join(' '));
                }
            }
        });
    }

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
            let lang = $('option:selected', $('#publication')).attr('lang');
            $("#publication_lang").val(lang);

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
