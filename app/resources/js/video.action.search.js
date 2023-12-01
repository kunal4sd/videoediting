$( function() {
    let form = $('#video-search-text');
    if (form.length === 0) { // Another page loaded
        return false;
    }

    let search_text = form.find('[name="text"]');
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

            let publications = global_alert_search_text.attr('data-publications').split(',');
            publicationSelect.val(publications).change();

        }).fail(function (jqXHR, textStatus, errorThrown) { // Fail
            event_emitter.trigger('form.ajax.result.alert', [jqXHR, form]);
        });
    }

    function reloadListing() {
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
    }

    publicationSelect.select2();
    countrySelect.select2();
    countrySelect.on('change', function() {
        reloadPublication();
    });

    reloadPublication();

    // Get from user activity
    function getStoredFilters() {
        let countries = global_alert_search_text.attr('data-countries').split(','); // Countries
        countrySelect.val(countries).change();

        if (!search_text.val()) {
            return false;
        }

        reloadListing();
    }

    getStoredFilters();

    function actionsRender(data, type, row) {
        if (type === 'display') {
            let new_href = global_alert_search_text.attr('data-get-segment-url')
            new_href = new_href.replace('start_segment', encodeURIComponent(row.start_segment_formatted));
            new_href = new_href.replace('end_segment', encodeURIComponent(row.end_segment_formatted));
            new_href = new_href.replace('publication', encodeURIComponent(row.pub_id));

            return '<div class="btn-toolbar" role="group"> ' +
                '<div class="btn-group mr-2 mx-auto" role="group">' +
                '<button name="desc-btn" type="button" class="btn btn-primary oi oi-info desc-btn" data-toggle="modal" data-target="#listing-modal-edit-article" data-pub-id="'+ row.pub_id +'" data-start-date="'+ row.start_date +'" data-end-date="'+ row.end_date +'" title=""></button>' +
                '<a href="' + new_href + '" class="segment-btn" data-redirect-url="' + new_href + '" data-pub-id="'+ row.pub_id +'" title="Go to segment"> <button name="segment-btn" type="button" class="btn btn-secondary oi oi-arrow-right" data-toggle="modal"></button></a>' +
                '</div></div>'
                ;
        }

        return data;
    }

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
                render: actionsRender
            }
        ],
        rowCallback: function (row, data) {},
    };

    let table = $('#listing-publication-table').DataTable(tableConfig);

    $('#reset_button').on('click', function() {
        global_alert_search_text.attr('data-publications', '');
        global_alert_search_text.attr('data-countries', '');

        publicationSelect.val(null).trigger('change');
        countrySelect.val(null).trigger('change');
        search_text.val("");

        table.rows().clear().draw();
        table.clear().draw();
    });

    $('#search_button').on('click', function() {
        reloadListing();
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
    });

    $(document).on('click', '.segment-btn', function (event) {
        event.preventDefault();

        let ele = $(this);
        let url = ele.attr("data-redirect-url");
        let data = global_functions.form_to_json(form);
        data['publication'] = $(this).attr('data-pub-id');

        $.ajax({
            url: global_alert_search_text.attr('data-save-search-filter-url'),
            type: "post",
            data: data

        }).done(function (result) { // Success
            window.location.replace(url);

        }).fail(function (jqXHR, textStatus, errorThrown) { // Fail
            event_emitter.trigger('form.ajax.result.alert', [jqXHR, form]);
        });

    });

    form.on("submit", function(e) {
        e.preventDefault();

        reloadListing();

        return false;
    });
});
