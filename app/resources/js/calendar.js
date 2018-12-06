$( function() {

    var range = $('input[name="date_range"]');
    var options = {
        "showDropdowns": false,
        "timePicker": true,
        "timePicker24Hour": true,
        "timePickerSeconds": true,
        "autoUpdateInput": true,
        "locale": {
            "format": "YYYY-MM-DD HH:mm:ss",
            "separator": " - ",
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
        "startDate": range.length && range.val().length ? range.val().split(' - ')[0] : moment().format('YYYY-MM-DD 00:00:00'),
        "endDate": range.length && range.val().length ? range.val().split(' - ')[1] : moment().format('YYYY-MM-DD 23:59:59'),
        "opens": "center",
        "buttonClasses": "btn btn-md",
        "applyButtonClasses": "btn-success",
        "cancelClass": "btn-danger"
    };

    range.daterangepicker(options);

});
