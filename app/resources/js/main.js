$( function() {
    $.ajaxSetup({
        data: {
            ajax: true
        },
        global: true
    });
    $( document ).ajaxError(function(event, jqxhr, settings, thrownError) {

        var data = jqxhr.responseJSON;

        if (data && data.message && ( data.message.csrf || data.message.authorization )) {
            global_functions.launch_modal_reload();
        }
    });
});

var global_functions = {
    form_to_json: function(form) {
        var array = jQuery(form).serializeArray();
        var json = {};

        jQuery.each(array, function() {
            if (json[this.name]) {
                if (!json[this.name].push) {
                    json[this.name] = [json[this.name]];
                }
                json[this.name].push(this.value || '');
            } else {
                json[this.name] = this.value || '';
            }
        });

        return json;
    },
    build_template: function(template, data, allow_multiple_assignments) {

        if (allow_multiple_assignments == undefined) allow_multiple_assignments = false;
        // clone template and prepare clone to display
        new_element = template.clone();
        new_element.removeAttr('name');

        $.each(data, function(field, value) {

            switch(field) {
                case 'keywords_name_en':
                    var target = new_element.find('[data-toggle]');
                    if (target !== undefined && target.attr('data-toggle') === 'tooltip') {
                        target.attr( 'title', value.length ? value : 'No Keywords' );

                        if (!allow_multiple_assignments) return true;
                    }

                    if (new_element.attr('data-toggle') === 'tooltip') {
                        new_element.attr( 'title', value.length ? value : 'No Keywords' );

                        if (!allow_multiple_assignments) return true;
                    }
                    break;
                case 'status':
                    var content_holder = new_element.find('[name="status_badge"]');
                    if (content_holder.length) {
                        content_holder.html(global_functions.build_status_badge(value));
                        new_element.find('[name="status"]').html(value);
                    }
                    break;
                case 'poster':
                    var target = new_element.find('img[name="poster"]');
                    if (target !== undefined) {

                        if (value) {
                            target.attr( 'src', value );
                        }
                        else {
                            target = new_element.find('span[name="no_poster"]');
                        }
                        target.removeClass('d-none');

                        if (!allow_multiple_assignments) return true;
                    }
                    break;
            }

            // find clone's field holder and add the value to it
            var content_holder = new_element.find('[name="' + field + '"]');
            if (content_holder.length) {
                content_holder.html(value);

                if (!allow_multiple_assignments) return true;
            }

            // if field holder not found, check for data type attribute and set it to value

            if (typeof field == 'string') {
                var attr_field = 'data-' + field.replace('_', '-');
                if (new_element.attr( attr_field ) !== undefined) {
                    new_element.attr( attr_field, value );

                    if (!allow_multiple_assignments) return true;
                }
            }

            var target = new_element.find('[' + attr_field + ']');
            if (target !== undefined) {
                target.attr( attr_field, value );

                if (!allow_multiple_assignments) return true;
            }

        });

        return new_element;
    },
    launch_template: function(template, holder) {

        // add the cloned template to the templates holder
        template.appendTo(holder);
        return template;
    },
    set_alerts_expiration: function(holder) {

        // set the alerts to auto-close after 3000ms
        setTimeout(function() {
            $.each($(holder).children('div[class*="alert"]'), function(i, child) {

                var child = $(child);

                child.fadeOut(400, function() {
                    child.alert('close');
                });
            });
        }, 3000);
    },
    button_is_loading: function(button) {

        button.attr('data-loading', 1);
        button.attr('data-previous-value', button.html());
        button.attr('disabled', 'disabled');

        setTimeout(function() {
            if (button.attr('data-loading') == 1) {
                button.html('<img height="24" src="/images/preloader_circle.gif">');
            }
        }, 500);
    },
    button_is_not_loading: function(button) {

        var previous_value = button.attr('data-previous-value');
        if (typeof previous_value !== typeof undefined && previous_value !== false) {
            button.html(button.attr('data-previous-value'));
            button.removeAttr('data-previous-value');
        }

        button.removeAttr('disabled');
        button.attr('data-loading', 0);
    },
    set_playlist_to_videojs: function(src) {
        event_emitter.trigger('videojs.update.src', [src, 'video/MP2T']);
        $('#video-video-to-episode').show()
    },
    set_poster_to_videojs: function(poster_path) {
        event_emitter.trigger('videojs.update.poster', poster_path);
    },
    set_playlist_to_player: function(player, src) {
        event_emitter.trigger('player.update.src', [player, src, 'video/MP2T']);
    },
    set_poster_to_player: function(player, poster_path) {
        event_emitter.trigger('player.update.poster', [player, poster_path]);
    },
    reset_player: function() {

        var player = videojs.getPlayer('video-preview');

        player.hasStarted(false);
        player.poster($('#video-preview').attr('poster'));
        player.posterImage.show();
        player.bigPlayButton.show();
        player.currentTime(0);
        player.reset();
        player.src_(false);
        $('#video-video-to-episode').hide();
    },
    refresh_playlist_holder_height: function(height) {

        var playlists_holder = $('#video-playlists-holder');
        var form = $('#video-get-playlist');
        playlists_holder.height(418);

        if (height === undefined) {
            var height = playlists_holder.parent().height() - form.height();
        }
        playlists_holder.height(height);
    },
    register_actions: function(list_holder) {
        list_holder.find('button[name="play-btn"]').unbind().on('click', function(e) {

            var btn = $(this);
            var this_holder = btn.closest('tr');
            var id = this_holder.find('td[name="id"]').html().trim();
            var rows = data_table.rows();

            rows.every(function( rowIdx, table_loop, row_loop ) {

                var row = this.data();
                if (row[table_cols_index.id] === id) {
                    $.each(form_edit_article.find('input'), function(i, input) {

                        input = $(input);
                        var type = input.attr('type');

                        if (type === 'submit') return true;

                        var field_name = input.attr('name');

                        if (field_name === 'csrf_name') {
                            input.attr('value', list_holder.find('input[name="csrf_name"]').val());
                        }
                        else if (field_name === 'csrf_value') {
                            input.attr('value', list_holder.find('input[name="csrf_value"]').val());
                        }
                        else {
                            input.val(row[table_cols_index[field_name]]);
                            input.attr('value', row[table_cols_index[field_name]]);
                        }
                    });

                    return false;
                }
            });
            movie_modal.modal({
                show: true
            });

            movie_player.find('source').attr('src', $(this).attr('data-src'));
            movie_player[0].load();
            movie_player[0].pause();

            // set form fields to current article values of corresponding fields
            $.each(form_edit_article.find('input'), function(i, input) {

                input = $(input);
                var type = input.attr('type');

                if (type === 'submit') return true;


            });

            event_emitter.trigger('movie.edit.open', this_holder.find('td[name="id"]').html().trim());

        });
        list_holder.find('button[name="download-btn"]').unbind().on('click', function(e) {
            window.location.href = $(this).attr('data-download');
        });
        list_holder.find('button[name="delete-btn"]').unbind().on('click', function(e) {

            if (!is_loading) {

                var btn = $(this);
                var url = btn.attr('data-action-url');
                var this_holder = btn.closest('tr');
                var id = this_holder.find('td[name="id"]').html().trim();

                if (id) {

                    is_loading = true;
                    global_functions.button_is_loading(btn);

                    $.ajax({
                        method: 'post',
                        url: url,
                        data: {
                            id: id,
                            csrf_name: list_holder.find('input[name="csrf_name"]').val(),
                            csrf_value: list_holder.find('input[name="csrf_value"]').val()
                        },
                        complete: function (result) {
                            global_functions.button_is_not_loading(btn);
                            is_loading = false;
                            if (result.responseJSON !== undefined && result.responseJSON.success) {
                                this_holder.remove();
                            }
                        }
                    });
                }
            }
        });
    },
    build_status_badge: function(status) {

        var badge = undefined;

        switch(status) {
            case 'pending':
                badge = $('span[name="global_template_badge_warning"]').clone();
                break;
            case 'approve':
                badge = $('span[name="global_template_badge_info"]').clone();

                break;
            case 'live':
                badge = $('span[name="global_template_badge_secondary"]').clone();

                break;
            default:
                badge = $('span[name="global_template_badge_success"]').clone();
        }
        badge.html(status);
        badge.removeAttr('name');

        return badge;
    },
    unselect_playlists: function(playlists) {

        if (playlists === undefined) {
            var playlists = $('#video-playlists-holder').find('.list-group-item');
        }

        $.each(playlists, function(i, playlist) {

            playlist = $(playlist);

            playlist.removeClass('list-group-item-warning');
            playlist.addClass('list-group-item-success');
        });
    },
    clear_episodes: function() {
        var players = videojs.getAllPlayers();
        for(var i = 0; i < players.length; i++) {
            if (players[i].id_.search("video-episode") > -1) {
                players[i].dispose();
            };
        }
        $('#video-episodes-holder').html('');
        $('#video-episodes-to-movie').hide();
        global_functions.refresh_playlist_holder_height();
    },
    launch_modal_reload: function() {

        var modal = $('#modal-page-reload');

        modal.modal({backdrop: 'static', keyboard: false});
        modal.find('button').off().on('click', function() {
            location.reload();
        });
    }
}
