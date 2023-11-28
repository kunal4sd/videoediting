$( function() {




    let tableConfig = {
        data: [],
        columns: [
            {'data': 'title'},
            {'data': 'content'},

        ],
        rowCallback: function (row, data) {},
    };

    let table = $('#listing-queries-table').DataTable(tableConfig);

});
