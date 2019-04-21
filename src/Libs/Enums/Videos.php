<?php

namespace App\Libs\Enums;

class Videos
{
    const RAW_VIDEO_PATH = 'videos';
    const RAW_VIDEO_FORMAT = 'ts';
    const RAW_VIDEO_LENGTH = 5;
    const CUT_VIDEO_PATH = 'tmp/perfect_cuts';
    const PLAYLIST_PATH = 'tmp/playlist';
    const POSTER_PATH = 'tmp/poster';
    const MOVIE_PATH = 'userfiles/output/testOutput';
    const MOVIE_PATH_LIVE = 'userfiles/output/liveVideos';
    const PLAYLIST_FORMAT = 'm3u8';
    const POSTER_FORMAT = 'jpg';
    const MOVIE_FORMAT = 'mp4';
    const STANDARD_SCANNING_PERIOD = 60;
    const EXTENDED_SCANNING_PERIOD = 3600;
}
