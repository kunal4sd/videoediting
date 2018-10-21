$( function() {

    var player = videojs('video-preview', {
        // fluid: true,
        width: 400,
        height: 300,
        playbackRates: [ .5, 1, 1.25, 1.5, 2 ],
        plugins: {
            hotkeys: {
                volumeStep: 0.1,
                seekStep: 5,
                enableNumbers: false
            },
            seekButtons: {
                forward: 5,
                back: 5
            }
        }
    });

    player.ready(function() {
        // setTimeout(function() {
        //     player.play();
        // }, 3000);
    });

});