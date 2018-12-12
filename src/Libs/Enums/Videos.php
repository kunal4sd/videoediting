<?php

namespace App\Libs\Enums;

class Videos
{
    const RAW_VIDEO_PATH = 'videos';
    const RAW_VIDEO_FORMAT = 'ts';
    const RAW_VIDEO_LENGTH = 5;
    const PLAYLIST_PATH = 'tmp/playlist';
    const POSTER_PATH = 'tmp/poster';
    const MOVIE_PATH = 'userfiles/output/testOutput';
    const MOVIE_PATH_LIVE = 'userfiles/output/liveVideos';
    const PLAYLIST_FORMAT = 'm3u8';
    const POSTER_FORMAT = 'jpg';
    const MOVIE_FORMAT = 'mp4';
    const STANDARD_SCANNING_PERIOD = 4; // RAW_VIDEO_LENGTH - 1
    const EXTENDED_SCANNING_PERIOD = 3600;
}
