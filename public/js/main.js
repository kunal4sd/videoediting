$(function(){var e=$('input[name="range_from"]'),a=$('input[name="range_to"]'),t=function(t,n){e.val(t.format("YYYY-MM-DD HH:mm:ss")),a.val(n.format("YYYY-MM-DD HH:mm:ss"))},n={showDropdowns:!1,timePicker:!0,timePicker24Hour:!0,timePickerSeconds:!0,autoUpdateInput:!1,locale:{format:"YYYY-MM-DD HH:mm:ss",separator:" to ",applyLabel:"Apply",cancelLabel:"Cancel",fromLabel:"From",toLabel:"To",daysOfWeek:["Su","Mo","Tu","We","Th","Fr","Sa"],monthNames:["January","February","March","April","May","June","July","August","September","October","November","December"],firstDay:0},linkedCalendars:!0,startDate:moment().format("YYYY-MM-DD 00:00:00"),endDate:moment().format("YYYY-MM-DD 23:59:59"),opens:"right",buttonClasses:"btn btn-md",applyButtonClasses:"btn-success",cancelClass:"btn-danger"},r=n;r.opens="left",e.daterangepicker(n,function(e,a,n){t(e,a)}),a.daterangepicker(r,function(e,a,n){t(e,a)})});
