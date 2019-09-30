$( function() {

    var is_loading = false;
    var form_get_movie = $('#video-get-movie');

    if (form_get_movie.length === 0) return false;

    var modal_new_movie = $('#video-new-movie');
    var modal_delete_movie = $('#video-modal-delete-article');
    var button = form_get_movie.find('#video-get-movie-submit-button');
    var movies_holder = $('#video-movies-holder');
    var global_templates_holder = $('#global-templates-holder');
    var global_list_movie = global_templates_holder.find('li[name="global_template_list_movie"]');
    var movie_modal = $('#video-modal-edit-article');
    var movie_player = $('#video-modal-movie-play');
    var form_edit_article = $('#article-edit-article');
    var button_edit = form_edit_article.find('#video-modal-edit-article-button-submit');

    var add_movie = function(movie) {
        global_functions.build_template(global_list_movie, movie).prependTo(movies_holder);
        register_actions();
    };
    var register_actions = function() {

        movies_holder.find('button[name="play-btn"]').unbind().on('click', function(e) {

            var btn = $(this);
            var this_holder = btn.closest('li');
            var status = this_holder.find('[name="status"]').html();

            movie_player.find('source').attr('src', $(this).attr('data-src'));
            movie_player[0].load();
            movie_player[0].pause();

            if (status === 'live') {
                button_edit.attr('disabled', 'disabled');
            }

            // set form fields to current article values of corresponding fields
            $.each(form_edit_article.find('input'), function(i, input) {

                input = $(input);
                var type = input.attr('type');

                if (status === 'live') {
                    input.attr('disabled', 'disabled');
                }

                if (type === 'submit') return true;

                var field_name = input.attr('name');
                var field = this_holder.find('[name="' + field_name + '"]');
                var value = field.html();

                if (value === undefined || value.length === 0) {
                    value = field.val();
                }

                if (value !== undefined) {
                    value = value.trim();
                    input.val(value);
                    input.attr('value', value);
                }
            });

            movie_modal.modal({
                show: true
            });
            event_emitter.trigger('movie.edit.open', this_holder.find('div[name="id"]').html().trim());

        });
        movies_holder.find('button[name="download-btn"]').unbind().on('click', function(e) {
            window.location.href = $(this).attr('data-download');
        });
        modal_delete_movie.unbind().on('show.bs.modal', function(e) {
            var triggerButton = $(e.relatedTarget);
            modal_delete_movie.unbind('click').on('click', 'button[name="delete-btn"]', function(e) {
                var url = triggerButton.attr('data-action-url');
                var this_holder = triggerButton.closest('li');
                var id = this_holder.find('div[name="id"]').html().trim();
                var data = {
                    id: id,
                    csrf_name: movies_holder.find('input[name="csrf_name"]').val(),
                    csrf_value: movies_holder.find('input[name="csrf_value"]').val()
                };

                if (id) {
                    event_emitter.trigger('article.delete.article', [triggerButton, url, data]);
                }
            });
        });
    };
    var clear_form_edit_article = function() {
        movie_player[0].pause();

        // clear fields of edit form when modal closes
        $.each(form_edit_article.find('input'), function(i, input) {

            input = $(input);
            var type = input.attr('type');

            if (type === 'submit') return true;

            input.val('');
            input.attr('value', '');
            input.removeAttr('disabled');
        });
        button_edit.removeAttr('disabled');
    };

    event_emitter.on('movie.get.list', function(e, data) {
        $.ajax({
            method: 'post',
            url: movies_holder.attr('data-movie-list-url'),
            data: data,
            complete: function (result) {
                if (
                    result.responseJSON !== undefined
                    && result.responseJSON.success
                    && result.responseJSON.result !== undefined
                    && Array.isArray(result.responseJSON.result.movies)
                ) {

                    movies_holder.html('');
                    for(var i in result.responseJSON.result.movies) {
                        add_movie(result.responseJSON.result.movies[i]);
                    }
                }
            }
        });
    });

    button.on('click', function(e) {
        e.preventDefault();
        form_get_movie.submit();
    });

    button_edit.on('click', function(e) {
        e.preventDefault();
        global_functions.button_is_loading(button_edit);
        form_edit_article.submit();
    });

    event_emitter.on('article.delete.article.done', function(e, btn) {
        $(btn).closest('li').remove();
        modal_delete_movie.modal('hide');
    });

    event_emitter.on('article.edit.article.done', function(e, result) {
        global_functions.button_is_not_loading(button_edit);

        if (
            movie_modal.length
            && result.responseJSON !== undefined
            && result.responseJSON.success
        ) {

            // update target row with new values
            var id = form_edit_article.find('input[name="id"]').val();
            var ids = movies_holder.find('div[name="id"]');
            var target_row = false;

            $.each(ids, function(i, div) {

                div = $(div);
                if (div.html().trim() === id) {
                    target_row = div.closest('li');
                    return false;
                }
            });

            if (target_row) {
                $.each(form_edit_article.find('input'), function(i, input) {

                    input = $(input);
                    var type = input.attr('type');

                    if (type === 'submit') return true;

                    var field_name = input.attr('name');
                    var new_value = input.val();
                    var field = target_row.find('[name="' + field_name + '"]');

                    if (field.attr('value') !== undefined) {
                        field.val(new_value);
                    }
                    else {
                        field.html(new_value);
                    }

                    if (field_name === 'status') {
                        target_row.find('[name="status_badge"]').html(
                            global_functions.build_status_badge(new_value).prop('outerHTML')
                        );
                    }

                });
            }

            // close modal
            movie_modal.modal('hide');
        }

    });

    movie_modal.on('hidden.bs.modal', function (e) {
        clear_form_edit_article();
    });

    form_get_movie.on('submit', function(e) {
        e.preventDefault();

        if (!is_loading) {

            is_loading = true;

            var players = videojs.getAllPlayers();
            var episodes = [];

            for(var i = 0; i < players.length; i++) {
                var player = players[i];
                if (player.id_.search("video-episode") > -1) {
                    episodes.push(player.currentSource().src);
                };
            }

            if (episodes.length) {

                var form = $(this);
                var url = form.attr('action');
                var data = global_functions.form_to_json(form);
                data.episodes = episodes;

                global_functions.button_is_loading(button);

                $.ajax({
                    method: 'post',
                    url: url,
                    data: data,
                    complete: function (result) {
                        event_emitter.trigger('form.ajax.result.alert', [result, form]);
                        global_functions.button_is_not_loading(button);
                        is_loading = false;
                        if (result.responseJSON !== undefined && result.responseJSON.success) {
                            add_movie(result.responseJSON.result);
                            modal_new_movie.modal('hide');
                            global_functions.clear_episodes();
                            form.find('input[name="title"]').val('');
                        }
                    }
                });
            }
        }
    });
    register_actions();
});
