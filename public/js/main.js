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

$( function() {

    event_emitter = $(document);
    var global_alerts_holder = $('#global_alerts_holder');
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
$( function() {

    var form_edit_article = $('#edit_article');
    var keywords_input = form_edit_article.find('input[name="keywords"]');
    var keywords_select = $('#keywords_selector');
    var url = keywords_select.attr('data-action');
    var url_initial = keywords_select.attr('data-initial-action');
    var csrf_name = form_edit_article.find('input[name="csrf_name"]').val();
    var csrf_value = form_edit_article.find('input[name="csrf_value"]').val();
    var initial_keywords = function(values) {

        var selected = [];
        var initials = values.result;
        var option = false;

        option = new Option('', 0, true, true);
        keywords_select.html('').trigger('change');

        for (var s in initials) {
            selected.push(initials[s].id);
            option = new Option(initials[s].text, initials[s].id, true, true);
            keywords_select.append(option).trigger('change');
        }
        keywords_input.attr('value', selected.join(','));
    };
    var format_keyword = function(keyword) {
        return keyword.text;
    };

    keywords_select.select2({
        width: '100%',
        tokenSeparators: [",", " "],
        multiple: true,
        closeOnSelect: true,
        minimumInputLength: 2,
        ajax: {
            placeholder: 'Select Keywords',
            url: url,
            type: 'POST',
            dataType: 'json',
            data: function (term, page) {
                return {
                    string: term.term,
                    csrf_name: csrf_name,
                    csrf_value: csrf_value
                };
            },
            processResults: function (data) {
                return { results: data.result };
            }
        },
        templateSelection: format_keyword
    });

    keywords_select.on('change', function() {
        keywords_input.attr('value', keywords_select.val().join(','));
    });

    event_emitter.on('movie.edit.open', function(e, article_id) {
        $.ajax({
            url: url_initial,
            type: 'POST',
            data: {
                article_id: article_id,
                csrf_name: csrf_name,
                csrf_value: csrf_value
            },
            complete: function(result) {
                if (result.responseJSON !== undefined && result.responseJSON.success) {
                    initial_keywords(result.responseJSON);
                }
            }
        });
    });
});

$( function() {

    var event_emitter = $(document);
    var form = $("#authenticate");
    var button = form.find('button[type="button"]');
    var is_loading = false;

    form.on("submit", function(e) {

        e.preventDefault();

        if (!is_loading) {

            is_loading = true;
            var form = $(this);

            global_functions.button_is_loading(button);
            $.ajax({
                method: 'post',
                url: form.attr('action'),
                data: global_functions.form_to_json(form),
                complete: function (result) {
                    event_emitter.trigger('form.ajax.result.alert', [result, form]);
                    global_functions.button_is_not_loading(button);
                    is_loading = false;
                }
            });
        }
    });

    button.on('click', function() {
        form.trigger('submit');
    });
});
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
        "startDate": range.val().length ? range.val().split(' - ')[0] : moment().format('YYYY-MM-DD 00:00:00'),
        "endDate": range.val().length ? range.val().split(' - ')[1] : moment().format('YYYY-MM-DD 23:59:59'),
        "opens": "center",
        "buttonClasses": "btn btn-md",
        "applyButtonClasses": "btn-success",
        "cancelClass": "btn-danger"
    };

    range.daterangepicker(options);

});

/*

####################################################################
####################################################################
########## WARNING: THIS LIBRARY CONTAINS NUMEROUS TWEAKS ##########
########## WARNING: REPLACING IT WITH THE VANILLA VERSION ##########
################### CAN LEAD TO COMPLETE BEHAVIOUR FAILURE #########
####################################################################
####################################################################

 */
//----------------Load Plugin----------------//

_vjs7 = {
    on : function (element, eventName, func, flag) {
        element.addEventListener(eventName, func, flag);
    },
    off : function (element, eventName, func, flag) {
        element.removeEventListener(eventName, func, flag);
    },
    addClass : function (element, className) {
        element.classList.add(className);
    },
    removeClass : function (element, className) {
        element.classList.remove(className);
    },
    findPosition : function (element) {
        return element.getBoundingClientRect();
    },
    round : function (n, precision) {
        return parseFloat(n.toFixed(precision));
    },
    formatTime : function (totalSeconds) {
        var minutes = Math.floor(totalSeconds / 60).toFixed(0);
        var seconds = (totalSeconds % 60).toFixed(0);

        if (seconds.length === 1) {
            seconds = "0" + seconds;
        }

        return minutes + ':' + seconds;
    },
    blockTextSelection : function () {
        // TODO
    }
};

(function () {
    function getYoutubeError(error_int){
        var _langErrors = {
            // invalid-params
            2: 'The request contains an invalid parameter value. For example, this error occurs if you specify a video ID that does not have 11 characters, or if the video ID contains invalid characters, such as exclamation points or asterisks.',
            // html5-error
            5: 'The requested content cannot be played in an HTML5 player or another error related to the HTML5 player has occurred.',
            // video not found
            100: 'The video requested was not found. This error occurs when a video has been removed (for any reason) or has been marked as private.',
            // embed not allowed
            101: 'The owner of the requested video does not allow it to be played in embedded players.',
            // embed not allowed
            150: 'The owner of the requested video does not allow it to be played in embedded players.'
        };

        return _langErrors[error_int] === undefined ? "Unknown Error" : _langErrors[error_int];
    }

//-- Load RangeSlider plugin in videojs
    function RangeSlider_(options) {
        var player = this;

        player.rangeslider = new RangeSlider(player, options);

        //When the DOM and the video media is loaded
        function initialVideoFinished(event) {
            var plugin = player.rangeslider;
            //All components will be initialize after they have been loaded by videojs
            for (var index in plugin.components) {
                plugin.components[index].init_();
            }

            if (plugin.options.hidden)
                plugin.hide(); //Hide the Range Slider

            if (plugin.options.locked)
                plugin.lock(); //Lock the Range Slider

            if (plugin.options.panel === false)
                plugin.hidePanel(); //Hide the second Panel

            if (plugin.options.controlTime === false)
                plugin.hidecontrolTime(); //Hide the control time panel

            plugin._reset();
            player.trigger('loadedRangeSlider'); //Let know if the Range Slider DOM is ready
        }
        if (player.techName == 'Youtube') {
            //Detect youtube problems
            player.one('error', function (e) {
                alert(getYoutubeError(player.error));
            });
            player.on('firstplay', initialVideoFinished);
        } else {
            player.one('playing', initialVideoFinished);
        }

    }
    videojs.registerPlugin('rangeslider', RangeSlider_);

//-- Plugin
    function RangeSlider(_player, options) {

        var player = _player || this;
        this.player = player;

        this.components = {}; // holds any custom components we add to the player

        options = options || {}; // plugin options

        if (!options.hasOwnProperty('locked'))
            options.locked = false; // lock slider handles

        if (!options.hasOwnProperty('hidden'))
            options.hidden = true; // hide slider handles

        if (!options.hasOwnProperty('panel'))
            options.panel = true; // Show Second Panel

        if (!options.hasOwnProperty('controlTime'))
            options.controlTime = true; // Show Control Time to set the arrows in the edition

        this.options = options;

        this.init();
    }

//-- Methods
    RangeSlider.prototype = {
        /*Constructor*/
        init: function () {
            var player = this.player || {};

            this.updatePrecision = 3;

            //position in second of the arrows
            this.start = 0;
            this.end = 0;

            //components of the plugin
            var controlBar = player.controlBar;
            var seekBar = controlBar.progressControl.seekBar;
            this.components.RSTimeBar = seekBar.RSTimeBar;
            this.components.ControlTimePanel = controlBar.ControlTimePanel;

            //Save local component
            this.rstb = this.components.RSTimeBar;
            this.box = this.components.SeekRSBar = this.rstb.SeekRSBar;
            this.bar = this.components.SelectionBar = this.box.SelectionBar;
            this.left = this.components.SelectionBarLeft = this.box.SelectionBarLeft;
            this.right = this.components.SelectionBarRight = this.box.SelectionBarRight;
            this.tp = this.components.TimePanel = this.box.TimePanel;
            this.tpl = this.components.TimePanelLeft = this.tp.TimePanelLeft;
            this.tpr = this.components.TimePanelRight = this.tp.TimePanelRight;
            this.ctp = this.components.ControlTimePanel;
            this.ctpl = this.components.ControlTimePanelLeft = this.ctp.ControlTimePanelLeft;
            this.ctpr = this.components.ControlTimePanelRight = this.ctp.ControlTimePanelRight;
            this.ctsb = this.components.ControlTimeSetButton = this.ctp.ControlTimeSetButton;

        },
        lock: function () {
            this.options.locked = true;
            this.ctp.enable(false);
            if (typeof this.box != 'undefined')
                _vjs7.addClass(this.box.el_, 'locked');
        },
        unlock: function () {
            this.options.locked = false;
            this.ctp.enable();
            if (typeof this.box != 'undefined')
                _vjs7.removeClass(this.box.el_, 'locked');
        },
        show: function () {
            this.options.hidden = false;
            if (typeof this.rstb != 'undefined') {
                this.rstb.show();
                if (this.options.controlTime)
                    this.showcontrolTime();
            }
        },
        hide: function () {
            this.options.hidden = true;
            if (typeof this.rstb != 'undefined') {
                this.rstb.hide();
                this.ctp.hide();
            }
        },
        showPanel: function () {
            this.options.panel = true;
            if (typeof this.tp != 'undefined')
                _vjs7.removeClass(this.tp.el_, 'disable');
        },
        hidePanel: function () {
            this.options.panel = false;
            if (typeof this.tp != 'undefined')
                _vjs7.addClass(this.tp.el_, 'disable');
        },
        showcontrolTime: function () {
            this.options.controlTime = true;
            if (typeof this.ctp != 'undefined')
                this.ctp.show();
        },
        hidecontrolTime: function () {
            this.options.controlTime = false;
            if (typeof this.ctp != 'undefined')
                this.ctp.hide();
        },
        setValue: function (index, seconds, writeControlTime) {
            //index = 0 for the left Arrow and 1 for the right Arrow. Value in seconds
            writeControlTime = typeof writeControlTime != 'undefined' ? writeControlTime : true;

            var percent = this._percent(seconds);
            var isValidIndex = (index === 0 || index === 1);
            var isChangeable = !this.locked;
            if (isChangeable && isValidIndex)
                this.box.setPosition(index, percent, writeControlTime);
        },
        setValues: function (start, end, writeControlTime) {
            //index = 0 for the left Arrow and 1 for the right Arrow. Value in seconds
            writeControlTime = typeof writeControlTime != 'undefined' ? writeControlTime : true;

            this._reset();

            this._setValuesLocked(start, end, writeControlTime);
        },
        getValues: function () { //get values in seconds
            var values = {}, start, end;
            start = this.start || this._getArrowValue(0);
            end = this.end || this._getArrowValue(1);
            return {start: start, end: end};
        },
        playBetween: function (start, end, showRS) {
            showRS = typeof showRS == 'undefined' ? true : showRS;
            this.player.currentTime(start);
            this.player.play();
            if (showRS) {
                this.show();
                this._reset();
            } else {
                this.hide();
            }
            this._setValuesLocked(start, end);

            this.bar.activatePlay(start, end);
        },
        loop: function (start, end, show) {
            var player = this.player;

            if (player) {
                player.on("pause", videojs.bind(this, function () {
                    this.looping = false;
                }));

                show = typeof show === 'undefined' ? true : show;

                if (show) {
                    this.show();
                    this._reset();
                }
                else {
                    this.hide();
                }
                this._setValuesLocked(start, end);

                this.timeStart = start;
                this.timeEnd = end;
                this.looping = true;

                this.player.currentTime(start);
                this.player.play();

                this.player.on("timeupdate", videojs.bind(this, this.bar.process_loop));
            }
        },
        _getArrowValue: function (index) {
            index = index || 0;
            var duration = this.player.duration();

            duration = typeof duration == 'undefined' ? 0 : duration;

            var percentage = this[index === 0 ? "left" : "right"].el_.style.left.replace("%", "");
            if (percentage === "")
                percentage = index === 0 ? 0 : 100;

            return _vjs7.round(this._seconds(percentage / 100), this.updatePrecision - 1);
        },
        _percent: function (seconds) {
            var duration = this.player.duration();
            if (isNaN(duration)) {
                return 0;
            }
            return Math.min(1, Math.max(0, seconds / duration));
        },
        _seconds: function (percent) {
            var duration = this.player.duration();
            if (isNaN(duration)) {
                return 0;
            }
            return Math.min(duration, Math.max(0, percent * duration));
        },
        _reset: function () {
            var duration = this.player.duration();
            this.tpl.el_.style.left = '0%';
            this.tpr.el_.style.left = '100%';
            this._setValuesLocked(0, duration);
        },
        _setValuesLocked: function (start, end, writeControlTime) {
            var triggerSliderChange = typeof writeControlTime != 'undefined';
            writeControlTime = typeof writeControlTime != 'undefined' ? writeControlTime : true;
            if (this.options.locked) {
                this.unlock();//It is unlocked to change the bar position. In the end it will return the value.
                this.setValue(0, start, writeControlTime);
                this.setValue(1, end, writeControlTime);
                this.lock();
            } else {
                this.setValue(0, start, writeControlTime);
                this.setValue(1, end, writeControlTime);
            }

            // Trigger slider change
            if (triggerSliderChange) {
                this._triggerSliderChange();
            }
        },
        _checkControlTime: function (index, TextInput, timeOld) {
            var h = TextInput[0],
                    m = TextInput[1],
                    s = TextInput[2],
                    newHour = h.value,
                    newMin = m.value,
                    newSec = s.value,
                    obj, objNew, objOld;
            index = index || 0;

            if (newHour != timeOld[0]) {
                obj = h;
                objNew = newHour;
                objOld = timeOld[0];
            } else if (newMin != timeOld[1]) {
                obj = m;
                objNew = newMin;
                objOld = timeOld[1];
            } else if (newSec != timeOld[2]) {
                obj = s;
                objNew = newSec;
                objOld = timeOld[2];
            } else {
                return false;
            }

            var duration = this.player.duration() || 0,
                    durationSel;

            var intRegex = /^\d+$/;//check if the objNew is an integer
            if (!intRegex.test(objNew) || objNew > 60) {
                objNew = objNew === "" ? "" : objOld;
            }

            newHour = newHour === "" ? 0 : newHour;
            newMin = newMin === "" ? 0 : newMin;
            newSec = newSec === "" ? 0 : newSec;

            durationSel = videojs.TextTrack.prototype.parseCueTime(newHour + ":" + newMin + ":" + newSec);
            if (durationSel > duration) {
                obj.value = objOld;
                obj.style.border = "1px solid red";
            } else {
                obj.value = objNew;
                h.style.border = m.style.border = s.style.border = "1px solid transparent";
                this.setValue(index, durationSel, false);

                // Trigger slider change
                this._triggerSliderChange();
            }
            if (index === 1) {
                var oldTimeLeft = this.ctpl.el_.children,
                        durationSelLeft = videojs.TextTrack.prototype.parseCueTime(oldTimeLeft[0].value + ":" + oldTimeLeft[1].value + ":" + oldTimeLeft[2].value);
                if (durationSel < durationSelLeft) {
                    obj.style.border = "1px solid red";
                }
            } else {

                var oldTimeRight = this.ctpr.el_.children,
                        durationSelRight = videojs.TextTrack.prototype.parseCueTime(oldTimeRight[0].value + ":" + oldTimeRight[1].value + ":" + oldTimeRight[2].value);
                if (durationSel > durationSelRight) {
                    obj.style.border = "1px solid red";
                }
            }
        },
        _triggerSliderChange: function () {
            this.player.trigger("sliderchange");
        }
    };


//----------------Public Functions----------------//

//-- Public Functions added to video-js

    var videojsPlayer = videojs.getComponent('Player');

    // Add compatibility functions
    videojsPlayer.prototype._v4 = _vjs7;

//Lock the Slider bar and it will not be possible to change the arrow positions
    videojsPlayer.prototype.lockSlider = function () {
        return this.rangeslider.lock();
    };

//Unlock the Slider bar and it will be possible to change the arrow positions
    videojsPlayer.prototype.unlockSlider = function () {
        return this.rangeslider.unlock();
    };

//Show the Slider Bar Component
    videojsPlayer.prototype.showSlider = function () {
        return this.rangeslider.show();
    };

//Hide the Slider Bar Component
    videojsPlayer.prototype.hideSlider = function () {
        return this.rangeslider.hide();
    };

//Show the Panel with the seconds of the selection
    videojsPlayer.prototype.showSliderPanel = function () {
        return this.rangeslider.showPanel();
    };

//Hide the Panel with the seconds of the selection
    videojsPlayer.prototype.hideSliderPanel = function () {
        return this.rangeslider.hidePanel();
    };


//Show the control Time to edit the position of the arrows
    videojsPlayer.prototype.showControlTime = function () {
        return this.rangeslider.showcontrolTime();
    };

//Hide the control Time to edit the position of the arrows
    videojsPlayer.prototype.hideControlTime = function () {
        return this.rangeslider.hidecontrolTime();
    };

//Set a Value in second for both arrows
    videojsPlayer.prototype.setValueSlider = function (start, end) {
        return this.rangeslider.setValues(start, end);
    };

//The video will be played in a selected section
    videojsPlayer.prototype.playBetween = function (start, end) {
        return this.rangeslider.playBetween(start, end);
    };

//The video will loop between to values
    videojsPlayer.prototype.loopBetween = function (start, end) {
        return this.rangeslider.loop(start, end);
    };

//Set a Value in second for the arrows
    videojsPlayer.prototype.getValueSlider = function () {
        return this.rangeslider.getValues();
    };



//----------------Create new Components----------------//

//--Charge the new Component into videojs
    var videojsSeekBar = videojs.getComponent('SeekBar');
    videojsSeekBar.prototype.options_.children.push('RSTimeBar'); //Range Slider Time Bar

    var videojsControlBar = videojs.getComponent('ControlBar');
    videojsControlBar.prototype.options_.children.push('ControlTimePanel'); //Panel with the time of the range slider



//-- Design the new components

    var videojsComponent = videojs.getComponent('Component');

    /**
     * Range Slider Time Bar
     * @param {videojs.Player|Object} player
     * @param {Object=} options
     * @constructor
     */
    var videojsRSTimeBar = videojs.extend(videojsComponent, {
        /** @constructor */
        constructor: function (player, options) {
            videojsComponent.call(this, player, options);
        }
    });

    videojsRSTimeBar.prototype.init_ = function () {
        this.rs = this.player_.rangeslider;
    };

    videojsRSTimeBar.prototype.options_ = {
        children: {
            'SeekRSBar': {}
        }
    };

    videojsRSTimeBar.prototype.createEl = function () {
        return videojsComponent.prototype.createEl.call(this, 'div', {
            className: 'vjs-timebar-RS',
            innerHTML: ''
        });
    };

    videojs.registerComponent('RSTimeBar', videojsRSTimeBar);

    /**
     * Seek Range Slider Bar and holder for the selection bars
     * @param {videojs.Player|Object} player
     * @param {Object=} options
     * @constructor
     */
    var videojsSeekRSBar = videojs.extend(videojsComponent, {
        /** @constructor */
        constructor: function (player, options) {
            videojsComponent.call(this, player, options);
            this.on('mousedown', this.onMouseDown);
        }
    });

    videojsSeekRSBar.prototype.init_ = function () {
        this.rs = this.player_.rangeslider;
    };

    videojsSeekRSBar.prototype.options_ = {
        children: {
            'SelectionBar': {},
            'SelectionBarLeft': {},
            'SelectionBarRight': {},
            'TimePanel': {},
        }
    };

    videojsSeekRSBar.prototype.createEl = function () {
        return videojsComponent.prototype.createEl.call(this, 'div', {
            className: 'vjs-rangeslider-holder'
        });
    };


    videojsSeekRSBar.prototype.onMouseDown = function (event) {
        event.preventDefault();
        _vjs7.blockTextSelection();

        if (!this.rs.options.locked) {
            _vjs7.on(document, "mousemove", videojs.bind(this, this.onMouseMove));
            _vjs7.on(document, "mouseup", videojs.bind(this, this.onMouseUp));
        }
    };

    videojsSeekRSBar.prototype.onMouseUp = function (event) {
        _vjs7.off(document, "mousemove", this.onMouseMove, false);
        _vjs7.off(document, "mouseup", this.onMouseUp, false);
    };

    videojsSeekRSBar.prototype.onMouseMove = function (event) {
        var left = this.calculateDistance(event);

        if (this.rs.left.pressed)
            this.setPosition(0, left);
        else if (this.rs.right.pressed)
            this.setPosition(1, left);

        //Fix a problem with the presition in the display time
        var ctd = this.player_.controlBar.currentTimeDisplay;
        ctd.contentEl_.innerHTML = '<span class="vjs-control-text">' + ctd.localize('Current Time') + '</span>' + _vjs7.formatTime(this.rs._seconds(left), this.player_.duration());

        // Trigger slider change
        if (this.rs.left.pressed || this.rs.right.pressed) {
            this.rs._triggerSliderChange();
        }
    };

    videojsSeekRSBar.prototype.setPosition = function (index, left, writeControlTime) {
        writeControlTime = typeof writeControlTime != 'undefined' ? writeControlTime : true;
        //index = 0 for left side, index = 1 for right side
        index = index || 0;

        // Position shouldn't change when handle is locked
        if (this.rs.options.locked)
            return false;

        // Check for invalid position
        if (isNaN(left))
            return false;

        // Check index between 0 and 1
        if (!(index === 0 || index === 1))
            return false;

        // Alias
        var ObjLeft = this.rs.left.el_,
                ObjRight = this.rs.right.el_,
                Obj = this.rs[index === 0 ? 'left' : 'right'].el_,
                tpr = this.rs.tpr.el_,
                tpl = this.rs.tpl.el_,
                bar = this.rs.bar,
                ctp = this.rs[index === 0 ? 'ctpl' : 'ctpr'].el_;

        //Check if left arrow is passing the right arrow
        if ((index === 0 ? bar.updateLeft(left) : bar.updateRight(left))) {

            Obj.style.left = (left * 100) + '%';

            if (index === 0) {
                bar.updateLeft(left);
            }else{
                bar.updateRight(left);
            }

            this.rs[index === 0 ? 'start' : 'end'] = this.rs._seconds(left);

            //Fix the problem  when you press the button and the two arrow are underhand
            //left.zIndex = 10 and right.zIndex=20. This is always less in this case:
            if (index === 0) {
                if ((left) >= 0.9)
                    ObjLeft.style.zIndex = 25;
                else
                    ObjLeft.style.zIndex = 10;
            }

            //-- Panel
            var TimeText = _vjs7.formatTime(this.rs._seconds(left)),
                    tplTextLegth = tpl.children[0].innerHTML.length;
            var MaxP, MinP, MaxDisP;
            if (tplTextLegth <= 4) //0:00
                MaxDisP = this.player_.isFullScreen ? 3.25 : 6.5;
            else if (tplTextLegth <= 5)//00:00
                MaxDisP = this.player_.isFullScreen ? 4 : 8;
            else//0:00:00
                MaxDisP = this.player_.isFullScreen ? 5 : 10;
            if (TimeText.length <= 4) { //0:00
                MaxP = this.player_.isFullScreen ? 97 : 93;
                MinP = this.player_.isFullScreen ? 0.1 : 0.5;
            } else if (TimeText.length <= 5) {//00:00
                MaxP = this.player_.isFullScreen ? 96 : 92;
                MinP = this.player_.isFullScreen ? 0.1 : 0.5;
            } else {//0:00:00
                MaxP = this.player_.isFullScreen ? 95 : 91;
                MinP = this.player_.isFullScreen ? 0.1 : 0.5;
            }

            if (index === 0) {
                tpl.style.left = Math.max(MinP, Math.min(MaxP, (left * 100 - MaxDisP / 2))) + '%';

                if ((tpr.style.left.replace("%", "") - tpl.style.left.replace("%", "")) <= MaxDisP)
                    tpl.style.left = Math.max(MinP, Math.min(MaxP, tpr.style.left.replace("%", "") - MaxDisP)) + '%';
                tpl.children[0].innerHTML = TimeText;
            } else {
                tpr.style.left = Math.max(MinP, Math.min(MaxP, (left * 100 - MaxDisP / 2))) + '%';

                if (((tpr.style.left.replace("%", "") || 100) - tpl.style.left.replace("%", "")) <= MaxDisP)
                    tpr.style.left = Math.max(MinP, Math.min(MaxP, tpl.style.left.replace("%", "") - 0 + MaxDisP)) + '%';
                tpr.children[0].innerHTML = TimeText;
            }
            //-- Control Time
            if (writeControlTime) {
                var time = TimeText.split(":"),
                        h, m, s;
                if (time.length == 2) {
                    h = 0;
                    m = time[0];
                    s = time[1];
                } else {
                    h = time[0];
                    m = time[1];
                    s = time[2];
                }
                // ctp.children[0].value = h;
                ctp.children[0].value = m;
                ctp.children[1].value = s;
            }
        }
        return true;
    };

    videojsSeekRSBar.prototype.calculateDistance = function (event) {
        var rstbX = this.getRSTBX();
        var rstbW = this.getRSTBWidth();
        var handleW = this.getWidth();

        // Adjusted X and Width, so handle doesn't go outside the bar
        rstbX = rstbX + (handleW / 2);
        rstbW = rstbW - handleW;

        // Percent that the click is through the adjusted area
        return Math.max(0, Math.min(1, (event.pageX - rstbX) / rstbW));
    };

    videojsSeekRSBar.prototype.getRSTBWidth = function () {
        return this.el_.offsetWidth;
    };
    videojsSeekRSBar.prototype.getRSTBX = function () {
        return _vjs7.findPosition(this.el_).left;
    };
    videojsSeekRSBar.prototype.getWidth = function () {
        return this.rs.left.el_.offsetWidth;//does not matter left or right
    };

    videojs.registerComponent('SeekRSBar', videojsSeekRSBar);


    /**
     * This is the bar with the selection of the RangeSlider
     * @param {videojs.Player|Object} player
     * @param {Object=} options
     * @constructor
     */
    var videojsSelectionBar = videojs.extend(videojsComponent, {
        /** @constructor */
        constructor: function (player, options) {
            videojsComponent.call(this, player, options);
            this.on('mouseup', this.onMouseUp);
            this.fired = false;
        }
    });

    videojsSelectionBar.prototype.init_ = function () {
        this.rs = this.player_.rangeslider;
    };

    videojsSelectionBar.prototype.createEl = function () {
        return videojsComponent.prototype.createEl.call(this, 'div', {
            className: 'vjs-selectionbar-RS'
        });
    };

    videojsSelectionBar.prototype.onMouseUp = function () {
        var start = this.rs.left.el_.style.left.replace("%", ""),
            end = this.rs.right.el_.style.left.replace("%", ""),
            duration = this.player_.duration(),
            precision = this.rs.updatePrecision,
            segStart = _vjs7.round(start * duration / 100, precision),
            segEnd = _vjs7.round(end * duration / 100, precision);
        this.player_.currentTime(segStart);
        this.player_.play();
        this.rs.bar.activatePlay(segStart, segEnd);
    };

    videojsSelectionBar.prototype.updateLeft = function (left) {
        var rightVal = this.rs.right.el_.style.left !== '' ? this.rs.right.el_.style.left : 100;
        var right = parseFloat(rightVal) / 100;

        var width = _vjs7.round((right - left), this.rs.updatePrecision); //round necessary for not get 0.6e-7 for example that it's not able for the html css width

        //(right+0.00001) is to fix the precision of the css in html
        if (left <= (right + 0.00001)) {
            this.rs.bar.el_.style.left = (left * 100) + '%';
            this.rs.bar.el_.style.width = (width * 100) + '%';
            return true;
        }
        return false;
    };

    videojsSelectionBar.prototype.updateRight = function (right) {
        var leftVal = this.rs.left.el_.style.left !== '' ? this.rs.left.el_.style.left : 0;
        var left = parseFloat(leftVal) / 100;

        var width = _vjs7.round((right - left), this.rs.updatePrecision);//round necessary for not get 0.6e-7 for example that it's not able for the html css width

        //(right+0.00001) is to fix the precision of the css in html
        if ((right + 0.00001) >= left) {
            this.rs.bar.el_.style.width = (width * 100) + '%';
            this.rs.bar.el_.style.left = ((right - width) * 100) + '%';
            return true;
        }
        return false;
    };

    videojsSelectionBar.prototype.activatePlay = function (start, end) {
        this.timeStart = start;
        this.timeEnd = end;

        this.suspendPlay();

        this.player_.on("timeupdate", videojs.bind(this, this._processPlay));
    };

    videojsSelectionBar.prototype.suspendPlay = function () {
        this.fired = false;
        this.player_.off("timeupdate", videojs.bind(this, this._processPlay));
    };

    videojsSelectionBar.prototype._processPlay = function () {
        //Check if current time is between start and end
        if (this.player_.currentTime() >= this.timeStart && (this.timeEnd < 0 || this.player_.currentTime() < this.timeEnd)) {
            if (this.fired) { //Do nothing if start has already been called
                return;
            }
            this.fired = true; //Set fired flag to true
        } else {
            if (!this.fired) { //Do nothing if end has already been called
                return;
            }
            this.fired = false; //Set fired flat to false
            this.player_.pause(); //Call end function
            this.player_.currentTime(this.timeEnd);
            this.suspendPlay();
        }
    };

    videojsSelectionBar.prototype.process_loop = function () {
        var player = this.player;

        if (player && this.looping) {
            var current_time = player.currentTime();

            if (current_time < this.timeStart || this.timeEnd > 0 && this.timeEnd < current_time) {
                player.currentTime(this.timeStart);
            }
        }
    };

    videojs.registerComponent('SelectionBar', videojsSelectionBar);

    /**
     * This is the left arrow to select the RangeSlider
     * @param {videojs.Player|Object} player
     * @param {Object=} options
     * @constructor
     */
    var videojsSelectionBarLeft = videojs.extend(videojsComponent, {
        /** @constructor */
        constructor: function (player, options) {
            videojsComponent.call(this, player, options);
            this.on('mousedown', this.onMouseDown);
            this.pressed = false;
        }
    });

    videojsSelectionBarLeft.prototype.init_ = function () {
        this.rs = this.player_.rangeslider;
    };

    videojsSelectionBarLeft.prototype.createEl = function () {
        return videojsComponent.prototype.createEl.call(this, 'div', {
            className: 'vjs-rangeslider-handle vjs-selectionbar-left-RS',
            innerHTML: '<div class="vjs-selectionbar-arrow-RS"></div><div class="vjs-selectionbar-line-RS"></div>'
        });
    };

    videojsSelectionBarLeft.prototype.onMouseDown = function (event) {
        event.preventDefault();
        _vjs7.blockTextSelection();
        if (!this.rs.options.locked) {
            this.pressed = true;
            _vjs7.on(document, "mouseup", videojs.bind(this, this.onMouseUp));
            _vjs7.addClass(this.el_, 'active');
        }
    };

    videojsSelectionBarLeft.prototype.onMouseUp = function (event) {
        _vjs7.off(document, "mouseup", this.onMouseUp, false);
        _vjs7.removeClass(this.el_, 'active');
        if (!this.rs.options.locked) {
            this.pressed = false;
        }
    };

    videojs.registerComponent('SelectionBarLeft', videojsSelectionBarLeft);


    /**
     * This is the right arrow to select the RangeSlider
     * @param {videojs.Player|Object} player
     * @param {Object=} options
     * @constructor
     */
    var videojsSelectionBarRight = videojs.extend(videojsComponent, {
        /** @constructor */
        constructor: function (player, options) {
            videojsComponent.call(this, player, options);
            this.on('mousedown', this.onMouseDown);
            this.pressed = false;
        }
    });

    videojsSelectionBarRight.prototype.init_ = function () {
        this.rs = this.player_.rangeslider;
    };

    videojsSelectionBarRight.prototype.createEl = function () {
        return videojsComponent.prototype.createEl.call(this, 'div', {
            className: 'vjs-rangeslider-handle vjs-selectionbar-right-RS',
            innerHTML: '<div class="vjs-selectionbar-arrow-RS"></div><div class="vjs-selectionbar-line-RS"></div>'
        });
    };


    videojsSelectionBarRight.prototype.onMouseDown = function (event) {
        event.preventDefault();
        _vjs7.blockTextSelection();
        if (!this.rs.options.locked) {
            this.pressed = true;
            _vjs7.on(document, "mouseup", videojs.bind(this, this.onMouseUp));
            _vjs7.addClass(this.el_, 'active');
        }
    };

    videojsSelectionBarRight.prototype.onMouseUp = function (event) {
        _vjs7.off(document, "mouseup", this.onMouseUp, false);
        _vjs7.removeClass(this.el_, 'active');
        if (!this.rs.options.locked) {
            this.pressed = false;
        }
    };

    videojs.registerComponent('SelectionBarRight', videojsSelectionBarRight);

    /**
     * This is the time panel
     * @param {videojs.Player|Object} player
     * @param {Object=} options
     * @constructor
     */
    var videojsTimePanel = videojs.extend(videojsComponent, {
        /** @constructor */
        constructor: function (player, options) {
            videojsComponent.call(this, player, options);
        }
    });

    videojsTimePanel.prototype.init_ = function () {
        this.rs = this.player_.rangeslider;
    };

    videojsTimePanel.prototype.options_ = {
        children: {
            'TimePanelLeft': {},
            'TimePanelRight': {},
        }
    };

    videojsTimePanel.prototype.createEl = function () {
        return videojsComponent.prototype.createEl.call(this, 'div', {
            className: 'vjs-timepanel-RS'
        });
    };

    videojs.registerComponent('TimePanel', videojsTimePanel);

    /**
     * This is the left time panel
     * @param {videojs.Player|Object} player
     * @param {Object=} options
     * @constructor
     */
    var videojsTimePanelLeft = videojs.extend(videojsComponent, {
        /** @constructor */
        constructor: function (player, options) {
            videojsComponent.call(this, player, options);
        }
    });

    videojsTimePanelLeft.prototype.init_ = function () {
        this.rs = this.player_.rangeslider;
    };

    videojsTimePanelLeft.prototype.createEl = function () {
        return videojsComponent.prototype.createEl.call(this, 'div', {
            className: 'vjs-timepanel-left-RS',
            innerHTML: '<span class="vjs-time-text">00:00</span>'
        });
    };

    videojs.registerComponent('TimePanelLeft', videojsTimePanelLeft);


    /**
     * This is the right time panel
     * @param {videojs.Player|Object} player
     * @param {Object=} options
     * @constructor
     */
    var videojsTimePanelRight = videojs.extend(videojsComponent, {
        /** @constructor */
        constructor: function (player, options) {
            videojsComponent.call(this, player, options);
        }
    });

    videojsTimePanelRight.prototype.init_ = function () {
        this.rs = this.player_.rangeslider;
    };

    videojsTimePanelRight.prototype.createEl = function () {
        return videojsComponent.prototype.createEl.call(this, 'div', {
            className: 'vjs-timepanel-right-RS',
            innerHTML: '<span class="vjs-time-text">00:00</span>'
        });
    };

    videojs.registerComponent('TimePanelRight', videojsTimePanelRight);

    /**
     * This is the control time panel
     * @param {videojs.Player|Object} player
     * @param {Object=} options
     * @constructor
     */
    var videojsControlTimePanel = videojs.extend(videojsComponent, {
        /** @constructor */
        constructor: function (player, options) {
            videojsComponent.call(this, player, options);
        }
    });

    videojsControlTimePanel.prototype.init_ = function () {
        this.rs = this.player_.rangeslider;
    };


    videojsControlTimePanel.prototype.options_ = {
        children: {
            'ControlTimePanelLeft': {},
            'ControlTimePanelRight': {},
            'ControlTimeSetButton': {},
        }
    };

    videojsControlTimePanel.prototype.createEl = function () {
        return videojsComponent.prototype.createEl.call(this, 'div', {
            className: 'vjs-controltimepanel-RS vjs-control',
        });
    };

    videojsControlTimePanel.prototype.enable = function (enable) {
        enable = typeof enable != 'undefined' ? enable : true;
        this.rs.ctpl.el_.children[0].disabled = enable ? "" : "disabled";
        this.rs.ctpl.el_.children[1].disabled = enable ? "" : "disabled";
        // this.rs.ctpl.el_.children[2].disabled = enable ? "" : "disabled";
        this.rs.ctpr.el_.children[0].disabled = enable ? "" : "disabled";
        this.rs.ctpr.el_.children[1].disabled = enable ? "" : "disabled";
        // this.rs.ctpr.el_.children[2].disabled = enable ? "" : "disabled";
    };

    videojs.registerComponent('ControlTimePanel', videojsControlTimePanel);

    /**
     * This is the control left time panel
     * @param {videojs.Player|Object} player
     * @param {Object=} options
     * @constructor
     */
    var videojsControlTimePanelLeft = videojs.extend(videojsComponent, {
        /** @constructor */
        constructor: function (player, options) {
            videojsComponent.call(this, player, options);
            this.on('keyup', this.onKeyUp);
            this.on('keydown', this.onKeyDown);
        }
    });

    videojsControlTimePanelLeft.prototype.init_ = function () {
        this.rs = this.player_.rangeslider;
        this.timeOld = {};
    };

    videojsControlTimePanelLeft.prototype.createEl = function () {
        return videojsComponent.prototype.createEl.call(this, 'div', {
            className: 'vjs-controltimepanel-left-RS',
            innerHTML: 'Start: <input type="number" id="from_minute" maxlength="2" min="0" max="59" value="0"/>:<input type="number" id="from_second" maxlength="2" min="0" max="59" value="0"/>'
        });
    };

    videojsControlTimePanelLeft.prototype.onKeyDown = function (event) {
        this.timeOld[0] = this.el_.children[0].value;
        this.timeOld[1] = this.el_.children[1].value;
        // this.timeOld[2] = this.el_.children[2].value;
    };

    videojsControlTimePanelLeft.prototype.onKeyUp = function (event) {
        this.rs._checkControlTime(0, this.el_.children, this.timeOld);
    };


    /**
     * This is the control right time panel
     * @param {videojs.Player|Object} player
     * @param {Object=} options
     * @constructor
     */
    var videojsControlTimePanelRight = videojs.extend(videojsComponent, {
        /** @constructor */
        constructor: function (player, options) {
            videojsComponent.call(this, player, options);
            this.on('keyup', this.onKeyUp);
            this.on('keydown', this.onKeyDown);
        }
    });

    videojsControlTimePanelRight.prototype.init_ = function () {
        this.rs = this.player_.rangeslider;
        this.timeOld = {};
    };

    videojsControlTimePanelRight.prototype.createEl = function () {
        return videojsComponent.prototype.createEl.call(this, 'div', {
            className: 'vjs-controltimepanel-right-RS',
            innerHTML: 'End: <input type="number" id="to_minute" maxlength="2" min="0" max="59" value="0"/>:<input type="number" id="to_second" maxlength="2" min="0" max="59" value="0"/>'
        });
    };

    videojsControlTimePanelRight.prototype.onKeyDown = function (event) {
        this.timeOld[0] = this.el_.children[0].value;
        this.timeOld[1] = this.el_.children[1].value;
        // this.timeOld[2] = this.el_.children[2].value;
    };

    videojsControlTimePanelRight.prototype.onKeyUp = function (event) {
        this.rs._checkControlTime(1, this.el_.children, this.timeOld);
    };


    /**
     * This is the control time panel SET button
     * @param {videojs.Player|Object} player
     * @param {Object=} options
     * @constructor
     */
    var videojsControlTimeSetButton = videojs.extend(videojsComponent, {
        /** @constructor */
        constructor: function (player, options) {
            videojsComponent.call(this, player, options);
            this.on('click', this.set);
        }
    });

    videojsControlTimeSetButton.prototype.init_ = function () {
        this.rs = this.player_.rangeslider;
        this.timeOld = {};
    };

    videojsControlTimeSetButton.prototype.createEl = function () {
        return videojsComponent.prototype.createEl.call(this, 'div', {
            className: 'vjs-controltime-set-button',
            innerHTML: '<button type="button" class="btn btn-success btn-sm">SET</button>'
        });
    };

    videojsControlTimeSetButton.prototype.set = function (event) {
        event_emitter.trigger('videojs.go_to_sec', this.player());
    };


    videojs.registerComponent('ControlTimePanelLeft', videojsControlTimePanelLeft);
    videojs.registerComponent('ControlTimePanelRight', videojsControlTimePanelRight);
    videojs.registerComponent('ControlTimeSetButton', videojsControlTimeSetButton);
})();

$( function() {

    var active_episodes = 0;
    var episodes_counter = 0;
    var episodes_per_row = 4;
    var player = videojs.getPlayer('video-preview');
    var episodes_holder = $('#episodes-holder');
    var form_get_episode = $('#get_episode');
    var button = form_get_episode.find('button[type="button"]');
    var is_loading = false;
    var add_episode = function(src, poster) {

        var id = 'video-episode-' + episodes_counter;
        episodes_holder.append(
            '<div class="col-md-' + Math.floor( 12 / episodes_per_row ) + '">'
            + '<div class="row mx-auto">'
            + '<video id="' + id + '" class="col-sm-12 video-js vjs-big-play-centered vjs-default-skin mr-2 mt-2" controls poster="/images/no_video.png" preload="auto" data-setup=\'{"inactivityTimeout":0,"width":426,"height":225,"playbackRates":[0.5,1,1.25,1.5,2], "seekButtons":{"forward": 5,"back": 5}}\'></video>'
            + '</div>'
            + '<div class="row mx-auto">'
            + '<button id="remove-' + id + '" class="col-sm-12 btn btn-danger btn-md oi oi-trash"></button>'
            + '</div>'
            + '</div>'
        );

        $('#remove-' + id).unbind().on('click', function(e) {

            $('#' + id).parent().parent().remove();
            active_episodes--;

            if (active_episodes === 0) {
                $('#episodes-to-movie').hide();
            }
            video_player.dispose();
        });

        var video_player = videojs(id, { width: 426, height: 225, controls: true, plugins: {} });
        var options = { hidden:true, responsive: true, width: 426, height: 225 }
        global_functions.set_playlist_to_player(video_player, src);
        global_functions.set_poster_to_player(video_player, poster);
        video_player.currentTime(0.1);
        video_player.rangeslider(options);
        episodes_counter++;
        active_episodes++;

        if (active_episodes) {
            $('#episodes-to-movie').show();
        }
    }
    var range_is_valid = function(from, to) {
        return from >= 0 && to > 0 && from < to;
    }

    button.on('click', function(e) {
        e.preventDefault();
        form_get_episode.submit();
    });

    form_get_episode.on('submit', function(e) {
        e.preventDefault();


        if (!is_loading) {

            is_loading = true;
            var from = Math.floor(player.rangeslider.start);
            var to = Math.ceil(player.rangeslider.end);
            var source = player.currentSource();

            if (source !== undefined && source.src !== undefined && range_is_valid(from, to)) {

                var form = $(this);
                var url = form.attr('action');

                global_functions.button_is_loading(button);
                $.ajax({
                    method: 'post',
                    url: url,
                    data: {
                        from: from,
                        to: to,
                        playlist: source.src,
                        csrf_name: form.find('input[name="csrf_name"]').val(),
                        csrf_value: form.find('input[name="csrf_value"]').val()
                    },
                    complete: function (result) {
                        event_emitter.trigger('form.ajax.result.alert', [result]);
                        global_functions.button_is_not_loading(button);
                        is_loading = false;
                        if (
                            result.responseJSON.result !== undefined
                            && result.responseJSON.result.src !== undefined
                        ) {
                            add_episode(result.responseJSON.result.src, result.responseJSON.result.poster);
                        }
                    }
                });
            }
            else {
                event_emitter.trigger('show_global_errors', [ ['Please load a playlist first and then set the time range correctly.'] ]);
                is_loading = false;
            }
        }
    });
});
$( function() {

    var modal_new_movie = $('#new_movie');
    var form_get_movie = $('#get_movie');
    var button = form_get_movie.find('#get_movie_submit_button');
    var movies_holder = $('#movies-holder');
    var global_templates_holder = $('#global-templates-holder');
    var global_list_movie = global_templates_holder.find('li[name="global_template_list_movie"]');
    var is_loading = false
    var movie_modal = $('#modal_movie');
    var movie_player = $('#modal_movie_play');
    var form_edit_article = $('#edit_article');
    var button_edit = form_edit_article.find('#edit_article_submit_button');
    var add_movie = function(movie) {
        global_functions.build_template(global_list_movie, movie).prependTo(movies_holder);
        register_actions();
    };
    var register_actions = function() {

        movies_holder.find('button[name="play-btn"]').unbind().on('click', function(e) {

            var btn = $(this);
            var this_holder = btn.closest('li');

            movie_player.find('source').attr('src', $(this).attr('data-src'));
            movie_player[0].load();
            movie_player[0].pause();

            // set form fields to current article values of corresponding fields
            $.each(form_edit_article.find('input'), function(i, input) {

                input = $(input);
                var type = input.attr('type');

                if (type === 'submit') return true;

                var field_name = input.attr('name');
                var field = this_holder.find('[name="' + field_name + '"]');
                var value = field.html();

                if (value === undefined || value.length === 0) {
                    value = field.val();
                }

                if (value !== undefined) {
                    value = value.trim();
                    input.val(value);
                    input.attr('value', value);
                }
            });
            event_emitter.trigger('movie.edit.open', this_holder.find('div[name="id"]').html().trim());

        });
        movies_holder.find('button[name="download-btn"]').unbind().on('click', function(e) {
            window.location.href = $(this).attr('data-download');
        });
        movies_holder.find('button[name="delete-btn"]').unbind().on('click', function(e) {

            if (!is_loading) {

                var btn = $(this);
                var url = btn.attr('data-action-url');
                var this_holder = btn.closest('li');
                var id = this_holder.find('div[name="id"]').html().trim();

                if (id) {

                    is_loading = true;
                    global_functions.button_is_loading(btn);

                    $.ajax({
                        method: 'post',
                        url: url,
                        data: {
                            id: id,
                            csrf_name: movies_holder.find('input[name="csrf_name"]').val(),
                            csrf_value: movies_holder.find('input[name="csrf_value"]').val()
                        },
                        complete: function (result) {
                            global_functions.button_is_not_loading(btn);
                            is_loading = false;
                            if (result.responseJSON !== undefined && result.responseJSON.success) {
                                this_holder.remove();
                            }
                        }
                    });
                }
            }
        });
    };

    event_emitter.on('movie.get.list', function(e, data) {
        $.ajax({
            method: 'post',
            url: movies_holder.attr('data-movie-list-url'),
            data: data,
            complete: function (result) {
                if (
                    result.responseJSON !== undefined
                    && result.responseJSON.success
                    && result.responseJSON.result !== undefined
                    && Array.isArray(result.responseJSON.result.movies)
                ) {

                    movies_holder.html('');
                    for(var i in result.responseJSON.result.movies) {
                        add_movie(result.responseJSON.result.movies[i]);
                    }
                }
            }
        });
    });

    button.on('click', function(e) {
        e.preventDefault();
        form_get_movie.submit();
    });

    button_edit.on('click', function(e) {
        e.preventDefault();
        form_edit_article.submit();
    });

    movie_modal.on('hidden.bs.modal', function (e) {
        movie_player[0].pause();

        // clear fields of edit form when modal closes
        $.each(form_edit_article.find('input'), function(i, input) {

            input = $(input);
            var type = input.attr('type');

            if (type === 'submit') return true;

            input.val('');
            input.attr('value', '');
        });
    });

    form_get_movie.on('submit', function(e) {
        e.preventDefault();

        if (!is_loading) {

            is_loading = true;

            var players = videojs.getAllPlayers();
            var episodes = [];

            for(var i = 0; i < players.length; i++) {

                var player = players[i];
                if (player.id_.search("video-episode") > -1) {
                    episodes.push(player.currentSource().src);
                };

            }

            if (episodes.length) {

                var form = $(this);
                var url = form.attr('action');
                var data = global_functions.form_to_json(form);
                data.episodes = episodes;

                global_functions.button_is_loading(button);

                $.ajax({
                    method: 'post',
                    url: url,
                    data: data,
                    complete: function (result) {
                        event_emitter.trigger('form.ajax.result.alert', [result, form]);
                        global_functions.button_is_not_loading(button);
                        is_loading = false;
                        if (result.responseJSON !== undefined && result.responseJSON.success) {
                            add_movie(result.responseJSON.result);
                            modal_new_movie.modal('hide');
                        }
                    }
                });
            }
        }
    });
    form_edit_article.on('submit', function(e) {
        e.preventDefault();

        var form = $(this);
        var url = form.attr('action');
        var data = global_functions.form_to_json(form);

        global_functions.button_is_loading(button);

        $.ajax({
            method: 'post',
            url: url,
            data: data,
            complete: function (result) {

                event_emitter.trigger('form.ajax.result.alert', [result, form]);
                global_functions.button_is_not_loading(button);

                if (result.responseJSON !== undefined && result.responseJSON.success) {

                    // update target row with new values
                    var id = form_edit_article.find('input[name="id"]').val();
                    var ids = movies_holder.find('div[name="id"]');
                    var target_row = false;

                    $.each(ids, function(i, div) {

                        div = $(div);
                        if (div.html().trim() === id) {
                            target_row = div.closest('li');
                            return false;
                        }
                    });

                    if (target_row) {
                        $.each(form_edit_article.find('input'), function(i, input) {

                            input = $(input);
                            var type = input.attr('type');

                            if (type === 'submit') return true;

                            var field_name = input.attr('name');
                            var new_value = input.val();
                            var field = target_row.find('[name="' + field_name + '"]');

                            if (field.attr('value') !== undefined) {
                                field.val(new_value);
                            }
                            else {
                                field.html(new_value);
                            }
                        });
                    }

                    // close modal
                    movie_modal.modal('hide');
                }
            }
        });
    });
    register_actions();
});

$( function() {

    var form = $("#get_playlist");
    var playlists_holder = $("#playlists_holder");
    var global_templates_holder = $('#global-templates-holder');
    var global_alert_playlist = global_templates_holder.find('div[name="global_template_alert_playlist"]');
    var button = form.find('button[type="button"]');
    var is_loading = false;
    var add_playlists = function(playlists) {

        playlists_holder.html('');
        $.each(playlists, function(i, playlist) {
            global_functions.launch_template(
                global_functions.build_template(global_alert_playlist, playlist),
                playlists_holder
            );
        });
        activate_playlists();
    }
    var activate_playlists = function() {
        playlists_holder.find('.list-group-item').unbind().on('click', function() {

            var playlist = $(this);
            var data = playlist.data();

            global_functions.set_playlist_to_videojs(data.url);
            global_functions.set_poster_to_videojs(data.poster);
        });
    }

    button.on('click', function(e) {
        e.preventDefault();
        form.trigger('submit');
    });

    form.on("submit", function(e) {

        e.preventDefault();

        if (!is_loading) {

            is_loading = true;
            var form = $(this);
            var data = global_functions.form_to_json(form);

            global_functions.button_is_loading(button);
            event_emitter.trigger('movie.get.list', data);
            $.ajax({
                method: 'post',
                url: form.attr('action'),
                data: data,
                complete: function (result) {
                    event_emitter.trigger('form.ajax.result.alert', [result, form]);
                    global_functions.button_is_not_loading(button);
                    is_loading = false;
                    if (
                        result.responseJSON !== undefined
                        && result.responseJSON.result !== undefined
                        && result.responseJSON.result.playlists !== undefined
                    ) {
                        add_playlists(result.responseJSON.result.playlists);
                        global_functions.clear_episodes();
                    }
                }
            });
        }
    });

    activate_playlists();

});
$( function() {

    var player = videojs.getPlayer('video-preview');
    var button_clear_player = $('#clear_player');
    var max_tries = 25;

    var init_player = setInterval(function() {

        if (player !== undefined) {
            player.ready(function() {
                var options = {
                    hidden: false,
                    responsive: true,
                    width: 800,
                    height: 400,
                    controlTime: true,
                    controlBar: {
                        volumePanel: {
                            vertical: true
                        }
                    },
                };
                player.rangeslider(options);

            });
            clearInterval(init_player);
        }
        else if (max_tries === 0) {
            clearInterval(init_player);
        }
        max_tries--;
    }, 200);

    button_clear_player.on('click', function(e) {
        e.preventDefault();
        global_functions.reset_player();
    });

});