$( function() {
    $.ajaxSetup({
        data: {
            ajax: true
        }
    });
});

var global_functions = {
    form_to_json: function(form) {
        var array = jQuery(form).serializeArray();
        var json = {};

        jQuery.each(array, function() {
            json[this.name] = this.value || '';
        });

        return json;
    },
    build_template: function(template, data) {

        // clone template and prepare clone to display
        new_element = template.clone();

        $.each(data, function(field, value) {

            // find clone's field holder and add the value to it
            var content_holder = new_element.find('[name="' + field + '"]');
            if (content_holder.length) {
                content_holder.html(value);
            }

            // if field holder not found, check for data type attribute and set it to value
            else {
                var attr_field = 'data-' + field;
                if (new_element.attr( attr_field ) !== undefined) {
                    new_element.attr( attr_field, value );
                }
                else {
                    var target = new_element.find('[' + attr_field + ']');
                    if (target !== undefined) {
                        target.attr( attr_field, value );
                    }
                }
            }
        });


        return new_element;
    },
    launch_template: function(alert, holder) {

        // add the cloned alert to the alerts holder
        alert.appendTo(holder);

        return alert;
    },
    set_alerts_expiration: function(holder) {

        // set the alerts to auto-close after 3000ms
        setTimeout(function() {
            $.each($(holder).children('div[class*="alert"]'), function(i, child) {

                var child = $(child);

                child.fadeOut(400, function() {
                    child.alert('close');
                });
            });
        }, 3000);
    },
    button_is_loading: function(button) {

        button.attr('data-loading', 1);
        button.attr('data-previous-value', button.html());
        button.attr('disabled', 'disabled');

        setTimeout(function() {
            if (button.attr('data-loading') == 1) {
                button.html('<img height="24" src="/images/preloader_circle.gif">');
            }
        }, 500);
    },
    button_is_not_loading: function(button) {

        var previous_value = button.attr('data-previous-value');
        if (typeof previous_value !== typeof undefined && previous_value !== false) {
            button.html(button.attr('data-previous-value'));
            button.removeAttr('data-previous-value');
        }

        button.removeAttr('disabled');
        button.attr('data-loading', 0);
    },
    set_playlist_to_videojs: function(src) {
        event_emitter.trigger('videojs.update.src', [src, 'video/MP2T']);
        $('#video_to_episode').show()
    },
    set_poster_to_videojs: function(poster_path) {
        event_emitter.trigger('videojs.update.poster', poster_path);
    },
    set_playlist_to_player: function(player, src) {
        event_emitter.trigger('player.update.src', [player, src, 'video/MP2T']);
    },
    set_poster_to_player: function(player, poster_path) {
        event_emitter.trigger('player.update.poster', [player, poster_path]);
    },
    reset_player: function() {

        var player = videojs.getPlayer('video-preview');

        player.hasStarted(false);
        if (player.rangeslider !== undefined && player.rangeslider.bar.rs !== undefined) {
            player.rangeslider._reset();
        }
        player.poster($('#video-preview').attr('poster'));
        player.posterImage.show();
        player.bigPlayButton.show();
        player.currentTime(0);
        player.reset();
        player.src_(false);
        $('#video_to_episode').hide();
    },
    clear_episodes: function() {
        $('#episodes-holder').html('');
        $('#episodes-to-movie').hide();
    }
}
