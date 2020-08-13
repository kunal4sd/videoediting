$( function() {

    var is_loading = false;
    var form = $('#listing-get-list');

    if (form.length === 0) return false;

    var form_btn = form.find('button[type="button"]');
    var approve_btn = $('#listing-status-approve');
    var pending_btn = $('#listing-status-pending');
    var live_btn = $('#listing-status-live');
    var list_holder = $("#listing-list-holder");
    var movie_modal = $('#listing-modal-edit-article');
    var modal_delete_movie = $('#listing-modal-delete-article');
    var movie_player = $('#listing-modal-movie-play');
    var form_edit_article = $('#article-edit-article');
    var button_edit = form_edit_article.find('#listing-modal-edit-article-button-submit');
    var global_templates_holder = $('#global-templates-holder');
    var global_list_video = global_templates_holder.find('li[name="global_template_list_video"]');
    var video_table = $('#listing-video-table');
    var table_cols_index = {};
    var table_cols = [
        { name: 'status' },
        { name: 'keywords' },
        { name: 'status_badge' },
        { name: 'headline' },
        { name: 'id' },
        { name: 'issue_datetime' },
        { name: 'created' },
        { name: 'publication' },
        { name: 'duration' },
        { name: 'file_size' },
        { name: 'actions' },
        { name: 'text' }
    ];
    var init_data_table = function(table) {

        for(var col_index in table_cols) {
            table_cols_index[table_cols[col_index].name] = parseInt(col_index);
        }

        var data_table = table.DataTable({
            dom: 'Bfrtip',
            columns: table_cols,
            columnDefs: [
                {
                    "targets": [ table_cols_index.keywords ],
                    "visible": false,
                    "searchable": true
                },
                {
                    "targets": [ table_cols_index.text ],
                    "visible": false,
                    "searchable": false
                },
                {
                    "targets": [ table_cols_index.status ],
                    "visible": false,
                    "searchable": true
                }
            ],
            order: [[ table_cols_index.id, "desc" ]],
            select: {
                style: 'multi'
            },
            buttons: [
                {
                    text: 'Select All',
                    action: function() {
                        data_table.rows({
                            page: 'current'
                        }).select();
                    }
                },
                'selectNone'
            ],
            language: {
                buttons: {
                    selectNone: "Deselect All"
                }
            }
        });

        return data_table;
    };
    var data_table = init_data_table(video_table);
    var add_videos = function(videos) {

        data_table.off('page.dt');
        data_table.destroy();
        list_holder.html('');
        $.each(videos, function(i, video) {
            global_functions.launch_template(
                global_functions.build_template(convert_list_to_row(global_list_video), video),
                list_holder
            );
        });
        data_table = init_data_table(video_table);
        data_table.on('page.dt', function() {
            data_table.rows( { selected: true } ).deselect();
        });
        register_actions();
    };
    var convert_list_to_row = function(global_list_video) {

        var clone = global_list_video.clone();
        var attributes = clone.prop("attributes");
        var new_element = $(document.createElement('tr'));
        var uls = clone.find('ul');

        $.each(uls, function(i, ul) {

            ul = $(ul);
            var new_row = $(document.createElement('td'));
            var attributes = ul.prop("attributes");

            new_row.html(ul.html());
            $.each(attributes, function() {
                new_row.attr(this.name, this.value);
            });
            new_element.append(new_row);
        });

        $.each(attributes, function() {
            if (this.name === 'name') return true;
            new_element.attr(this.name, this.value);
        });

        return new_element
    };
    var register_actions = function() {
        movie_modal.unbind('show.bs.modal').on('show.bs.modal', function(e) {
            var btn = $(e.relatedTarget);
            var this_holder = btn.closest('tr');

            var id = this_holder.find('td[name="id"]').html().trim();
            var rows = data_table.rows();

            rows.every(function( rowIdx, table_loop, row_loop ) {

                var row = this.data();
                if (row[table_cols_index.id] === id) {
                    populate_form_edit_article(row, true);
                    return false;
                }
            });
            movie_modal.modal({
                show: true
            });

            movie_player.find('source').attr('src', btn.attr('data-src'));
            movie_player[0].load();
            movie_player[0].pause();
            event_emitter.trigger('movie.edit.open', this_holder.find('td[name="id"]').html().trim());
        });
        list_holder.unbind('click').on('click', 'button[name="download-btn"]', function(e) {
            window.location.href = $(this).attr('data-download');
        });
        modal_delete_movie.unbind('show.bs.modal').on('show.bs.modal', function(e) {
            var triggerButton = $(e.relatedTarget);
            modal_delete_movie.unbind('click').on('click', 'button[name="delete-btn"]', function(e) {
                var url = triggerButton.attr('data-action-url');
                var this_holder = triggerButton.closest('tr');
                var id = this_holder.find('td[name="id"]').html().trim();
                var data = {
                    id: id,
                    csrf_name: list_holder.find('input[name="csrf_name"]').val(),
                    csrf_value: list_holder.find('input[name="csrf_value"]').val()
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
    var populate_form_edit_article = function(row, is_modal) {

        var status = row[table_cols_index.status];

        if (status === 'live' && is_modal) button_edit.attr('disabled', 'disabled');
        $.each(form_edit_article.find('input'), function(i, input) {

            input = $(input);
            if (input.attr('type') === 'submit') return true;
            if (status === 'live' && is_modal) input.attr('disabled', 'disabled');

            var field_name = input.attr('name');
            if (field_name === 'csrf_name') {
                input.attr(
                    'value',
                    list_holder.find('input[name="csrf_name"]').val()
                );
            }
            else if (field_name === 'csrf_value') {
                input.attr(
                    'value',
                    list_holder.find('input[name="csrf_value"]').val()
                );
            }
            else {
                input.val(row[table_cols_index[field_name]]);
                input.attr('value', row[table_cols_index[field_name]]);
            }
        });
    };

    button_edit.on('click', function(e) {
        e.preventDefault();
        global_functions.button_is_loading(button_edit);
        form_edit_article.submit();
    });

    event_emitter.on('article.delete.article.done', function(e, btn) {
        btn = $(btn);

        var this_holder = btn.closest('tr');
        var id = this_holder.find('td[name="id"]').html().trim();
        var rows = data_table.rows();

        rows.every(function( rowIdx, table_loop, row_loop ) {

            var row = this.data();
            if (row[table_cols_index.id] === id) {
                data_table.row(this).remove().draw(true);
                return false;
            }
        });
        modal_delete_movie.modal('hide');
    });

    event_emitter.on('article.edit.article.done', function(event, result, data) {
        global_functions.button_is_not_loading(button_edit);

        if (
            movie_modal.length
            && result.responseJSON !== undefined
            && result.responseJSON.success
        ) {

            // update datatable
            var id = data.id;
            var rows = data_table.rows();

            rows.every(function( rowIdx, table_loop, row_loop ) {

                var row = this.data();
                if (row[table_cols_index.id] === id) {
                    $.each(form_edit_article.find('input'), function(i, input) {

                        input = $(input);
                        var type = input.attr('type');

                        if (type === 'submit') return true;

                        var field_name = input.attr('name');
                        var new_value = data[field_name];

                        row[table_cols_index[field_name]] = new_value;
                        if (field_name === 'status') {
                            row[table_cols_index['status_badge']] = global_functions
                                                                        .build_status_badge(new_value)
                                                                        .prop('outerHTML');
                        }
                    });
                    this.data(row);

                    return false;
                }
            });

            // close modal
            movie_modal.modal('hide');
            register_actions();
        }

    });

    event_emitter.on('article.edit.article_status.done', function(event, result, data, btn) {
        global_functions.button_is_not_loading(btn);

        if (
            result.responseJSON !== undefined
            && result.responseJSON.success
        ) {
            var rows = data_table.rows();
            var row = false;

            rows.every(function( rowIdx, table_loop, row_loop ) {
                if (data.rowIdxs.indexOf(rowIdx) === -1) return false;

                row = this.data();
                row[table_cols_index.status] = data.status;
                row[table_cols_index['status_badge']] = global_functions.build_status_badge(data.status).prop('outerHTML');
                this.data(row);

                return false;
            });
        }

    });

    movie_modal.on('hidden.bs.modal', function (e) {
       clear_form_edit_article();
    });

    form_btn.on('click', function(e) {
        e.preventDefault();
        form.trigger('submit');
    });

    form.on("submit", function(e) {

        e.preventDefault();

        if (!is_loading) {

            is_loading = true;
            var form = $(this);
            var data = global_functions.form_to_json(form);

            global_functions.button_is_loading(form_btn);
            $.ajax({
                method: 'post',
                url: form.attr('action'),
                data: data,
                complete: function (result) {
                    event_emitter.trigger('form.ajax.result.alert', [result, form]);
                    global_functions.button_is_not_loading(form_btn);
                    is_loading = false;
                    if (
                        result.responseJSON !== undefined
                        && result.responseJSON.result !== undefined
                        && result.responseJSON.result.videos !== undefined
                    ) {
                        add_videos(result.responseJSON.result.videos);
                    }
                }
            });
        }
    });

    approve_btn.add(pending_btn).add(live_btn).on('click', function(e) {
        e.preventDefault();

        var selected_rows = data_table.rows('.selected');

        if (selected_rows.count()) {

            var btn = $(this);
            var btn_data = btn.data();
            var url = btn_data.url;
            var data = {
                ids: [],
                rowIdxs: [],
                status: btn_data.value,
                csrf_name: list_holder.find('input[name="csrf_name"]').val(),
                csrf_value: list_holder.find('input[name="csrf_value"]').val()
            };

            selected_rows.every(function( rowIdx, table_loop, row_loop ) {
                var row = this.data();
                data.ids.push(row[table_cols_index.id]);
                data.rowIdxs.push(rowIdx);

                row[table_cols_index['status_badge']] = $(row[table_cols_index['status_badge']]).html('<img height="24" src="/images/preloader_circle.gif">').prop('outerHTML');
                this.data(row);

                return false;
            });

            $.ajax({
                method: 'post',
                url: url,
                data: data,
                complete: function (result) {
                    event_emitter.trigger('article.edit.article_status.done', [result, data, btn]);
                    event_emitter.trigger('form.ajax.result.alert', [result]);
                }
            });
        }
    });
});