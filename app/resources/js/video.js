$( function() {

    var player = videojs.getPlayer('video-preview');
    var button_clear_player = $('#clear_player');

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
    button_clear_player.on('click', function(e) {
        e.preventDefault();
        global_functions.reset_player();
    });

});