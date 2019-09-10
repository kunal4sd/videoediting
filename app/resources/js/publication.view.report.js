$( function() {

    var table = $('#publications-report-table');
    var data_table = table.DataTable({select: false});

    var activate_buttons = function() {
        $('button[name="restart-process-btn"]').unbind('click').on('click', function() {

            var btn = $(this);
            var data = btn.data();

            global_functions.button_is_loading(btn);
            $.ajax({
                method: 'post',
                url: data.actionUrl,
                data: {
                    id: data.id,
                    process:data.process,
                    csrf_name: table.find('input[name="csrf_name"]').val(),
                    csrf_value: table.find('input[name="csrf_value"]').val()
                },
                complete: function (result) {
                    global_functions.button_is_not_loading(btn);
                }
            });
        });
    };

    data_table.on('draw', function() { activate_buttons(); });
    data_table.order([4, 'asc'], [5, 'asc']).draw();
});