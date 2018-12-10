$( function() {

    event_emitter = $(document);
    var global_alerts_holder = $('#global-alerts-holder');
    var global_templates_holder = $('#global-templates-holder');
    var global_alert_danger = global_templates_holder.find('div[name="global_template_alert_danger"]');
    var global_alert_warning = global_templates_holder.find('div[name="global_template_alert_warning"]');
    var video_preview = videojs.getPlayer('video-preview');

    event_emitter.on('show_global_errors', function(e, errors, expire = true) {
        $.each(errors, function(i, error) {
            var alert = global_functions.launch_template(
                global_functions.build_template(global_alert_danger, {content: error}),
                global_alerts_holder
            );
            if (expire) {
                setTimeout(
                    function() {
                        alert.fadeOut(400, function() {
                            alert.alert('close');
                        });
                    },
                    3000
                );
            }
        });
    });

    event_emitter.on('videojs.go_to_sec', function(e, player) {

        var from_second = parseInt ( $('#from_second').val() );
        var from_minute = parseInt ( $('#from_minute').val() );
        var to_second = parseInt( $('#to_second').val() );
        var to_minute = parseInt( $('#to_minute').val() ) ;

        from_second = from_second ? from_second : 0;
        from_minute = from_minute ? from_minute : 0;
        to_second = to_second ? to_second : 0;
        to_minute = to_minute ? to_minute : 0;

        var from_time = (from_minute * 60) + from_second;
        var to_time = (to_minute * 60) + to_second;
        var errors = [];

        if (to_second > 59 || to_second < 0) {
            errors.push('To Sec Must be between 0 - 59');
        }

        if (from_second > 59 || from_second < 0) {
            errors.push('From Sec Must be between 0 - 59');
        }

        if (from_time >= to_time ){
            errors.push('From time must be less than To time');
        }

        if (errors.length) {
            event_emitter.trigger('show_global_errors', [errors]);
        }
        else {
            player.playBetween(from_time, to_time);
        }
    });

    event_emitter.on('videojs.update.src', function(e, src, type) {
        video_preview.src([
            {
                type: type,
                src: src
            }
        ]);
    });

    event_emitter.on('videojs.update.poster', function(e, poster_path) {
        video_preview.poster(poster_path);
    });

    event_emitter.on('player.update.src', function(e, player, src, type) {
        player.src([
            {
                type: type,
                src: src
            }
        ]);
    });

    event_emitter.on('player.update.poster', function(e, player, poster_path) {
        player.poster(poster_path);
    });

    event_emitter.on('form.ajax.result.alert', function(e, result, form) {

        var form = form;

        global_alerts_holder.html('');

        if (result.status >= 400) {
            if (result.responseJSON !== undefined) {

                var new_alert = {};
                $.each(result.responseJSON.message, function(name, content) {

                    if (form !== undefined) {

                        // set form field to invalid
                        form.find('[name="' + name +'"]').addClass('is-invalid');
                    }

                    new_alert = global_functions
                        .launch_template(
                            global_functions.build_template(global_alert_danger, {content: content}),
                            global_alerts_holder
                        )
                        .attr('data-name', name)
                        ;
                    if (form !== undefined) {

                        // if the alert's `close.bs.alert` event is triggered
                        // remove the 'is-invalid' class from its corresponding form field
                        new_alert.on('closed.bs.alert', function () {
                            form.find('[name="' + $(this).attr('data-name') + '"]').removeClass('is-invalid');
                        });
                    }
                });
            }
            else {

            }
        }
        else if (result.status === 302) {

            if (
                result.responseJSON.result !== undefined
                && result.responseJSON.result.redirect_to !== undefined
            ) {
                window.location.replace(result.responseJSON.result.redirect_to);
            }

        }
        else {
            if (
                result.responseJSON.result !== undefined
                && result.responseJSON.result.warnings !== undefined
            ) {

                var new_alert = {};
                $.each(result.responseJSON.result.warnings, function(name, content) {

                    if (form !== undefined) {

                        // set form field to invalid
                        form.find('[name="' + name +'"]').addClass('is-invalid');
                    }

                    new_alert = global_functions
                        .launch_template(
                            global_functions.build_template(global_alert_warning, {content: content}),
                            global_alerts_holder
                        )
                        .attr('data-name', name)
                        .addClass('mb-0')
                        ;
                    if (form !== undefined) {

                        // if the alert's `close.bs.alert` event is triggered
                        // remove the 'is-invalid' class from its corresponding form field
                        new_alert.on('closed.bs.alert', function () {
                            form.find('[name="' + $(this).attr('data-name') + '"]').removeClass('is-invalid');
                        });
                    }
                });
            }
        }

        global_functions.set_alerts_expiration(global_alerts_holder);

    });
});