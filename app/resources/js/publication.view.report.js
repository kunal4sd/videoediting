$( function() {

    var table = $('#publications-report-table');
    var data_table = table.DataTable({select: false});
    var modal_restart_process = $('#publication-modal-restart-process');
    var restart_buttons = $('button[name="restart-process-btn"]');

    var activate_buttons = function() {
        restart_buttons.unbind('click').on('click', function() {
            modal_restart_process.trigger('publication.modal.open', this);
        });
    };

    modal_restart_process.on('publication.modal.open', function(e, btn) {
        modal_restart_process.unbind('click').on('click', 'button[name="restart-btn"]', function(e) {

            btn = $(btn);
            var data = btn.data();

            modal_restart_process.modal('hide');
            global_functions.button_is_loading(btn);
            $.ajax({
                method: 'post',
                url: data.actionUrl,
                data: {
                    id: data.id,
                    process: data.process,
                    server: data.server,
                    csrf_name: table.find('input[name="csrf_name"]').val(),
                    csrf_value: table.find('input[name="csrf_value"]').val()
                },
                complete: function (result) {
                    event_emitter.trigger('form.ajax.result.alert', [result]);
                    global_functions.button_is_not_loading(btn);
                }
            });
        });
    });

    data_table.on('draw', function() { activate_buttons(); });
    data_table.order([4, 'asc'], [5, 'asc']).draw();
});