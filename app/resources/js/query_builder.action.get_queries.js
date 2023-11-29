$( function() {

    let listingTable = $('#listing-queries-table');
    if (listingTable.length === 0) { // Another page loaded
        return false;
    }
    let queryListUrl = listingTable.attr('data-query-list-url');
    let csrf_name = listingTable.find('input[name="csrf_name"]').val();
    let csrf_value = listingTable.find('input[name="csrf_value"]').val();


    function actionsRender(data, type, row) {
        if (type === 'display') {

            return '<div class="btn-toolbar" role="group"> ' +
                '<div class="btn-group mr-2 mx-auto" role="group">' +
                '<button name="edit-btn" type="button" class="btn btn-primary oi oi-pencil"  title=""></button>' +
                '<button name="delete-btn" type="button" class="btn btn-danger oi oi-trash"  title=""></button>' +
                '</div></div>'
                ;
        }

        return data;
    }

    let tableConfig = {
        "pageLength": 5,
        data: [],
        columns: [
            {'data': 'title'},
            {'data': 'query'},
            {
                'data': 'id',
                'orderable': false,
                render: actionsRender
            }

        ],
        rowCallback: function (row, data) {},
    };
    let table = listingTable.DataTable(tableConfig);

    function loadTable (){
        $.ajax({
            url: queryListUrl,
            type: "post",
            dataType: "json",
            data: {csrf_name: csrf_name, csrf_value: csrf_value}

        }).done(function (result) { // Success
            table.rows.add(result?.result?.data).draw();

        }).fail(function (result, textStatus, errorThrown) { // Fail
            console.log('error loading query list',result);
        });
    }

    loadTable();

});
