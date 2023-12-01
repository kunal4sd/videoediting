$( function() {

    let listingTable = $('#listing-queries-table');
    if (listingTable.length === 0) { // Another page loaded
        return false;
    }
    let queryListUrl = listingTable.attr('data-query-list-url');
    let csrf_name = listingTable.find('input[name="csrf_name"]').val();
    let csrf_value = listingTable.find('input[name="csrf_value"]').val();
    let formVideoTextSearch = $('#video-search-text');


    function actionsRender(data, type, row) {
        if (type === 'display') {

            return '<div class="btn-toolbar" role="group"> ' +
                '<div class="btn-group mr-2 mx-auto" role="group">' +
                `<button type="button" class="query-edit-btn btn btn-primary oi oi-pencil" data-query-id="${data}" title=""></button>` +
                '<button id="query-delete-btn" type="button" class="btn btn-danger oi oi-trash"  title=""></button>' +
                '</div></div>'
                ;
        }

        return data;
    }

    let tableConfig = {
        "pageLength": 5,
        "autoWidth": false,
        scrollX: false,
        data: [],
        columns: [
            {'data': 'title'},
            {'data': 'query'},
            {
                'data': 'users',
                'orderable': false,
                render: function (data, type, row) {
                    if (type === 'display') {
                        let usersE = '';
                        data.forEach((user) => {
                            usersE += user.fname+ ' '+user.lname + '<br>';
                        })
                        return usersE;
                    }
                    return data;
                }
            },
            {
                'data': 'keywords',
                'orderable': false,
                render: function (data, type, row) {
                    if (type === 'display') {
                        let keywordsE = '';
                        data.forEach((keyword) => {
                            keywordsE += keyword.name_en+ ' ::: '+keyword.name_ar + '<br>';
                        })
                        return keywordsE;
                    }
                    return data;
                }
            },
            {
                'data': 'id',
                'orderable': false,
                render: actionsRender
            }

        ],
        rowCallback: function (row, data) {},
        drawCallback: function(settings) {
            bindActions();
        }
    };
    let table = listingTable.DataTable(tableConfig);

    function loadTable (){
        $.ajax({
            url: queryListUrl,
            type: "post",
            dataType: "json",
            data: {csrf_name: csrf_name, csrf_value: csrf_value}

        }).done(function (result) { // Success
            table.clear();
            table.rows.add(result?.result?.data).draw();
            bindActions();
            console.log(result?.result?.data);

        }).fail(function (result, textStatus, errorThrown) { // Fail
            console.log('error loading query list',result);
        });
    }

    loadTable();


    function bindActions (){
        $(".query-edit-btn").unbind('click').on('click', function() {
            let queryId = $(this).data('query-id');
            let queryContent = $(this).closest('tr').find('td:nth-child(2)').text();
            formVideoTextSearch.find('[name="text"]').val(queryContent);
            formVideoTextSearch.find('input[name="query_id"]').val(queryId);
            formVideoTextSearch.find('#save_button').text('Update');
        });
    }

    formVideoTextSearch.find('#reset_button').on('click', function() {
        formVideoTextSearch.find('input[name="query_id"]').val('');
        formVideoTextSearch.find('#save_button').text('Save');
    });

    event_emitter.on('search-query.list.updated', function(e) {
        loadTable();
    });

});
