$( function() {
    let form = $('#video-search-text');
    if (form.length === 0) { // Another page loaded
        return false;
    }

    let search_text = form.find('input[name="text"]');
    let csrf_name = form.find('input[name="csrf_name"]').val();
    let csrf_value = form.find('input[name="csrf_value"]').val();
    let global_templates_holder = $('#global-templates-holder');
    let global_alert_search_text = global_templates_holder.find('div[name="global_template_alert_search_text"]');
    var global_alerts_holder = $('#global-alerts-holder');
    var global_alert_info = global_templates_holder.find('div[name="global_template_alert_info"]');

    let publicationSelect = $('#publication-select');
    let countrySelect = $('#country_select');

    function reloadPublication() {
        $.ajax({
            url: global_alert_search_text.attr('data-get-publication-list'),
            type: "post",
            data: global_functions.form_to_json(form)

        }).done(function (result) { // Success
            publicationSelect.val(null).trigger('change');
            publicationSelect.empty();
            $.each(result.result.texts, function( index, data ) {
                let option = new Option(data.name_en, data.id, false, false);
                publicationSelect.append(option).trigger('change');
            });

        }).fail(function (jqXHR, textStatus, errorThrown) { // Fail
            event_emitter.trigger('form.ajax.result.alert', [jqXHR, form]);
        });
    }

    publicationSelect.select2();
    countrySelect.select2();
    countrySelect.on('change', function() {
        reloadPublication();
    });

    reloadPublication();

    let tableConfig = {
        data: [],
        columns: [
            {'data': 'pub_id'},
            {'data': 'pub_name'},
            {'data': 'publication_language'},
            {'data': 'country_name'},
            {'data': 'date'},
            {'data': 'start_date'},
            {'data': 'end_date'},
            {
                'data': 'publication',
                'orderable': false,
                render: function(data, type, row) {
                    if (type === 'display') {
                        let new_href = global_alert_search_text.attr('data-get-segment-url')
                        new_href = new_href.replace('start_segment', encodeURIComponent(row.start_segment_formatted));
                        new_href = new_href.replace('end_segment', encodeURIComponent(row.end_segment_formatted));
                        new_href = new_href.replace('publication', encodeURIComponent(row.pub_id));

                        return '<div class="btn-toolbar" role="group"> ' +
                            '<div class="btn-group mr-2 mx-auto" role="group">' +
                            '<button name="desc-btn" type="button" class="btn btn-primary oi oi-info desc-btn" data-toggle="modal" data-target="#listing-modal-edit-article" data-pub-id="'+ row.pub_id +'" data-start-date="'+ row.start_date +'" data-end-date="'+ row.end_date +'" title=""></button>' +
                        '<a href="' + new_href + '"><button name="segment-btn" type="button" class="btn btn-secondary oi oi-arrow-right segment-btn" data-toggle="modal" data-target="#listing-modal-edit-article" title="Go to segment"></button></a>' +
                        '</div></div>'
                            ;
                    }

                    return data;
                }
            }
        ],
        rowCallback: function (row, data) {},
    };

    let table = $('#listing-publication-table').DataTable(tableConfig);

    $('#reset_button').on('click', function() {
        countrySelect.val(null).trigger('change');
        publicationSelect.val(null).trigger('change');
        search_text.val("");
    });

    $('#search_button').on('click', function() {
        global_alert_search_text.attr('data-text', search_text.val());

        $.ajax({
            url: form.attr('action'),
            type: "post",
            data: global_functions.form_to_json(form)

        }).done(function (result) { // Success
            event_emitter.trigger('form.ajax.result.alert', [result, form]);

            table.clear().draw();
            table.rows.add(result.result.data).draw();

        }).fail(function (result, textStatus, errorThrown) { // Fail
            table.clear().draw();

            event_emitter.trigger('form.ajax.result.alert', [result, form]);
        });
    });

    function formatPreview ( description ) {
        // `d` is the original data object for the row
        return $('<div class="text-preview" style="width: 100%; background-color: #bee5eb; padding: 10px; white-space: normal;">' + description + '</div>').highlight(global_alert_search_text.attr('data-text').split(' '));
    }

    $(document).on('click', '.desc-btn', function () {
        let ele = $(this);
        let tr = ele.closest('tr');
        let row = table.row( tr );

        if ( row.child.isShown() ) {
            // This row is already open - close it
            row.child.hide();
            tr.removeClass('shown');
        }
        else {
            let data = {
                'csrf_name': csrf_name,
                'csrf_value': csrf_value,
                'publication': $(this).attr('data-pub-id'),
                'start_date': $(this).attr('data-start-date'),
                'end_date': $(this).attr('data-end-date')
            };
            $.ajax({
                url: global_alert_search_text.attr('data-get-text-url'),
                type: "post",
                data: data

            }).done(function (result) { // Success
                let desc = result.result.texts.join(' ');

                row.child( formatPreview(desc) ).show();
                tr.addClass('shown');

            }).fail(function (jqXHR, textStatus, errorThrown) { // Fail
                event_emitter.trigger('form.ajax.result.alert', [jqXHR, form]);
            });

        }

        //holder.find('.text-preview').highlight(global_alert_search_text.attr('data-text').split(' '));

        /*
        {"publication_id":"4947","start_date":"2019-09-04 05:00:00","end_date":"2019-09-04 20:00:00","batch_size":"1800"}

        if (!$(this).attr('title')) {
            let ele = $(this);
            let data = {
                'csrf_name': csrf_name,
                'csrf_value': csrf_value,
                'publication': $(this).attr('data-pub-id'),
                'start_date': $(this).attr('data-start-date'),
                'end_date': $(this).attr('data-end-date')
            };
            $.ajax({
                url: global_alert_search_text.attr('data-get-text-url'),
                type: "post",
                data: data

            }).done(function (result) { // Success
                $(ele).attr('title', result.result.texts.join(' '));

                $(ele).addClass("on");
                $(ele).tooltip({
                    items: '.desc-btn.on',
                    position: {
                        my: "left+30 center",
                        at: "right center",
                        collision: "flip"
                    }
                });

                $(ele).trigger('mouseenter');

            }).fail(function (jqXHR, textStatus, errorThrown) { // Fail
                table.clear().draw();
            });
        } else {
            $(this).addClass("on");
            $(this).tooltip({
                items: '.desc-btn.on',
                position: {
                    my: "left+30 center",
                    at: "right center",
                    collision: "flip"
                }
            });
        }

        $(this).trigger('mouseenter');*/
    });




/*
    SELECT p.* FROM segments AS s INNER JOIN pub_2707 AS p ON p.segment_id = s.id AND p.pub_id = s.pub_id AND DATE_ADD(s.start_segment_datetime, INTERVAL p.end_time second) >= '2022-03-07 08:57:36' AND DATE_ADD(s.start_segment_datetime, INTERVAL p.start_time second) <= '2022-03-07 08:58:01' WHERE 1 AND s.id IN ( SELECT CONCAT_WS(',', id) FROM segments WHERE 1 AND start_segment_datetime >= DATE_SUB('2022-03-07 08:57:36', INTERVAL 600 second) AND start_segment_datetime <= '2022-03-07 08:58:01' AND pub_id = 2707 ORDER BY id DESC ) AND s.pub_id = 2707 AND s.start_segment_datetime >= DATE_SUB('2022-03-07 08:57:36', INTERVAL 600 second) AND s.start_segment_datetime <= '2022-03-07 08:58:01' GROUP BY p.id ORDER BY s.start_segment_datetime, p.start_time ASC

{"pub_id":"2707","pub_name":"Dubai one TV","date":"2022-03-07 08:26:46","start_segment":"2707.2022_03_07-09:26:46.ts","end_segment":"2707.2022_03_07-09:27:05.ts","text":"Dubai","country":"AE","start_date":"2022-03-07 09:26:46","end_date":"2022-03-07 09:27:05","publication":"2707","country_name":"United Arab Emirates","start_segment_formatted":"2707.2022_03_07-09!26!46.ts","end_segment_formatted":"2707.2022_03_07-09!27!05.ts","publication_url":"http:\/\/www.dmi.ae\/dubaione\/"}

    {"pub_id":"2707","pub_name":"Dubai one TV","date":"2022-03-07 08:26:46","start_segment":"2707.2022_03_07-09:26:46.ts","end_segment":"2707.2022_03_07-09:27:05.ts","text":"Dubai","country":"AE","start_date":"2022-03-07 09:26:46","end_date":"2022-03-07 09:27:05","start_date_url":"2022-03-07 09!26!46","end_date_url":"2022-03-07 09!27!05","publication":"2707","country_name":"United Arab Emirates","publication_url":"http:\/\/www.dmi.ae\/dubaione\/"}

    /*var form = $('#video-search-text');

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
                        holder.find('.text-preview').highlight(data.text.split(' '));
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

    activate_results();*/

});
