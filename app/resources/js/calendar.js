$( function() {

    var from = $("input[name='start_date']");
    var to = $("input[name='end_date']");
    var date = $("input[name='date']");
    var from_pickr = from.flatpickr({
        enableTime: true,
        enableSeconds:true,
        time_24hr: true,
        minuteIncrement: 1,
        dateFormat: "Y-m-d H:i:S",
        defaultDate: (from.length && from.val().length) ? from.val() : moment().format('YYYY-MM-DD 00:00:00'),
        onClose: function(dates, currentdatestring, picker) {
            if (dates.length === 1) {
                var selectedDate = dates[0];
                selectedDate.setHours($(picker.calendarContainer).find('.flatpickr-hour').val());
                selectedDate.setMinutes($(picker.calendarContainer).find('.flatpickr-minute').val());
                selectedDate.setSeconds($(picker.calendarContainer).find('.flatpickr-second').val());
                picker.setDate(selectedDate, true);
            }
        }
    });
    var to_pickr = to.flatpickr({
        enableTime: true,
        enableSeconds:true,
        time_24hr: true,
        minuteIncrement: 1,
        dateFormat: "Y-m-d H:i:S",
        defaultDate: (to.length && to.val().length) ? to.val() : moment().format('YYYY-MM-DD 00:00:00'),
        onClose: function(dates, currentdatestring, picker) {
            if (dates.length === 1) {
                var selectedDate = dates[0];
                selectedDate.setHours($(picker.calendarContainer).find('.flatpickr-hour').val());
                selectedDate.setMinutes($(picker.calendarContainer).find('.flatpickr-minute').val());
                selectedDate.setSeconds($(picker.calendarContainer).find('.flatpickr-second').val());
                picker.setDate(selectedDate, true);
            }
        }
    });
    var date_pickr = date.flatpickr({
        minuteIncrement: 1,
        dateFormat: "Y-m-d",
        defaultDate: (date.length && date.val().length) ? date.val() : moment().format('YYYY-MM-DD'),
        onClose: function(dates, currentdatestring, picker) {
            if (dates.length === 1) {
                var selectedDate = dates[0];
                picker.setDate(selectedDate, true);
            }
        }
    });

});
