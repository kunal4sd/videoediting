$( function() {

    var modal_new_movie = $('#new_movie');
    var form_get_movie = $('#get_movie');
    var button = form_get_movie.find('#get_movie_submit_button');
    var movies_holder = $('#movies-holder');
    var global_templates_holder = $('#global-templates-holder');
    var global_list_movie = global_templates_holder.find('li[name="global_template_list_movie"]');
    var is_loading = false
    var movie_modal = $('#modal_movie');
    var movie_player = $('#modal_movie_play');
    var form_edit_article = $('#edit_article');
    var button_edit = form_edit_article.find('#edit_article_submit_button');
    var add_movie = function(movie) {
        global_functions.build_template(global_list_movie, movie).prependTo(movies_holder);
        register_actions();
    };
    var register_actions = function() {

        movies_holder.find('button[name="play-btn"]').unbind().on('click', function(e) {

            var btn = $(this);
            var this_holder = btn.closest('li');

            movie_player.find('source').attr('src', $(this).attr('data-src'));
            movie_player[0].load();
            movie_player[0].pause();

            // set form fields to current article values of corresponding fields
            $.each(form_edit_article.find('input'), function(i, input) {

                input = $(input);
                var type = input.attr('type');

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
            event_emitter.trigger('movie.edit.open', this_holder.find('div[name="id"]').html().trim());

        });
        movies_holder.find('button[name="download-btn"]').unbind().on('click', function(e) {
            window.location.href = $(this).attr('data-download');
        });
        movies_holder.find('button[name="delete-btn"]').unbind().on('click', function(e) {

            if (!is_loading) {

                var btn = $(this);
                var url = btn.attr('data-action-url');
                var this_holder = btn.closest('li');
                var id = this_holder.find('div[name="id"]').html().trim();

                if (id) {

                    is_loading = true;
                    global_functions.button_is_loading(btn);

                    $.ajax({
                        method: 'post',
                        url: url,
                        data: {
                            id: id,
                            csrf_name: movies_holder.find('input[name="csrf_name"]').val(),
                            csrf_value: movies_holder.find('input[name="csrf_value"]').val()
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
        form_edit_article.submit();
    });

    movie_modal.on('hidden.bs.modal', function (e) {
        movie_player[0].pause();

        // clear fields of edit form when modal closes
        $.each(form_edit_article.find('input'), function(i, input) {

            input = $(input);
            var type = input.attr('type');

            if (type === 'submit') return true;

            input.val('');
            input.attr('value', '');
        });
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
                        }
                    }
                });
            }
        }
    });
    form_edit_article.on('submit', function(e) {
        e.preventDefault();

        var form = $(this);
        var url = form.attr('action');
        var data = global_functions.form_to_json(form);

        global_functions.button_is_loading(button);

        $.ajax({
            method: 'post',
            url: url,
            data: data,
            complete: function (result) {

                event_emitter.trigger('form.ajax.result.alert', [result, form]);
                global_functions.button_is_not_loading(button);

                if (result.responseJSON !== undefined && result.responseJSON.success) {

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
                        });
                    }

                    // close modal
                    movie_modal.modal('hide');
                }
            }
        });
    });
    register_actions();
});
