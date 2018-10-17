$( function() {

    var range_from = $('input[name="range_from"]');
    var range_to = $('input[name="range_to"]');
    var set_fields = function(start, end) {
        range_from.val(start.format('YYYY-MM-DD HH:mm:ss'));
        range_to.val(end.format('YYYY-MM-DD HH:mm:ss'));
    };
    var options_right = {
        "showDropdowns": false,
        "timePicker": true,
        "timePicker24Hour": true,
        "timePickerSeconds": true,
        "autoUpdateInput": false,
        "locale": {
            "format": "YYYY-MM-DD HH:mm:ss",
            "separator": " to ",
            "applyLabel": "Apply",
            "cancelLabel": "Cancel",
            "fromLabel": "From",
            "toLabel": "To",
            "daysOfWeek": [
                "Su",
                "Mo",
                "Tu",
                "We",
                "Th",
                "Fr",
                "Sa"
            ],
            "monthNames": [
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December"
            ],
            "firstDay": 0
        },
        "linkedCalendars": true,
        "startDate": moment().format('YYYY-MM-DD 00:00:00'),
        "endDate": moment().format('YYYY-MM-DD 23:59:59'),
        "opens": "right",
        "buttonClasses": "btn btn-md",
        "applyButtonClasses": "btn-success",
        "cancelClass": "btn-danger"
    };
    var options_left = options_right;
    options_left.opens = "left";

    range_from.daterangepicker(options_right, function(start, end, label) {
        set_fields(start, end);
    });
    range_to.daterangepicker(options_left, function(start, end, label) {
        set_fields(start, end);
    });

});