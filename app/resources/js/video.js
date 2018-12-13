$( function() {

    var player = videojs.getPlayer('video-preview');
    var button_clear_player = $('#video-clear-player');
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
        global_functions.unselect_playlists();
    });

});