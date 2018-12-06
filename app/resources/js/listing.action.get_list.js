$( function() {

    var init_data_table = function(table) {
        return table.DataTable({
            order: [[ 2, "desc" ]],
            select: true
        });
    };
    var article_id_column = 2;
    var form = $("#get_list");
    var form_btn = form.find('button[type="button"]');
    var approve_btn = $('#action_approve');
    var pending_btn = $('#action_pending');
    var live_btn = $('#action_live');
    var video_table = $('#video_table');
    var data_table = init_data_table(video_table);
    var list_holder = $("#list_holder");
    var global_templates_holder = $('#global-templates-holder');
    var global_list_video = global_templates_holder.find('li[name="global_template_list_video"]');
    var is_loading = false;
    var add_videos = function(videos) {

        data_table.destroy();
        list_holder.html('');
        $.each(videos, function(i, video) {
            global_functions.launch_template(
                global_functions.build_template(convert_list_to_row(global_list_video), video),
                list_holder
            );
        });
        data_table = init_data_table(video_table);
    }
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
    }

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

    approve_btn.on('click', function(e) {
        e.preventDefault();

        var selected_rows = data_table.rows('.selected');

        if (selected_rows.count()) {

            var row_data = $(selected_rows.data());

            $.each(row_data,function(key, columns){

                console.log(columns[article_id_column]);

            });
        }

    });
    pending_btn.on('click', function(e) {
        e.preventDefault();

        var selected_rows = data_table.rows('.selected');

        if (selected_rows.count()) {

            var row_data = $(selected_rows.data());

            $.each(row_data,function(key, columns){

                console.log(columns[article_id_column]);

            });
        }

    });
    live_btn.on('click', function(e) {
        e.preventDefault();

        var selected_rows = data_table.rows('.selected');

        if (selected_rows.count()) {

            var row_data = $(selected_rows.data());

            $.each(row_data,function(key, columns){

                console.log(columns[article_id_column]);

            });
        }

    });
});