$( function() {

    var from = $("input[name='start_date']");
    var to = $("input[name='end_date']");
    var from_pickr = from.flatpickr({
        enableTime: true,
        enableSeconds:true,
        time_24hr: true,
        minuteIncrement: 1,
        dateFormat: "Y-m-d H:i:S",
        defaultDate: (from.length && from.val().length) ? from.val() : moment().format('YYYY-MM-DD 00:00:00'),
        maxDate: to.val(),
        onChange: function(selectedDates, dateStr, instance) {
            to_pickr.set('minDate', dateStr)
        }
    });
    var to_pickr = to.flatpickr({
        enableTime: true,
        enableSeconds:true,
        time_24hr: true,
        minuteIncrement: 1,
        dateFormat: "Y-m-d H:i:S",
        defaultDate: (to.length && to.val().length) ? to.val() : moment().format('YYYY-MM-DD 00:00:00'),
        minDate: from.val(),
        onChange: function(selectedDates, dateStr, instance) {
            from_pickr.set('maxDate', dateStr)
        }
    });

});
