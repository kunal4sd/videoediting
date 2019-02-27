//g++ -o duration -lavutil -lavformat duration.cpp
//g++ -o duration duration.cpp `pkg-config --cflags --libs libavformat libavutil`

#define __STDC_CONSTANT_MACROS
#include <iostream>

#ifdef __cplusplus
extern "C" {
#endif
#include "libavutil/avutil.h"
#include "libavformat/avformat.h"
#ifdef __cplusplus
}
#endif

int main(int argc, char* argv[])
{
    if(argc != 2)
    {
		std::cout << "usage: " << argv[0] << " video_file\n";
		return 0;
    }
    char* file = argv[1];
    AVFormatContext* formatContext = avformat_alloc_context();

    formatContext->max_analyze_duration = 30000000;
    av_register_all();

    // Open video file
    avformat_open_input(&formatContext, file, NULL, NULL);
    avformat_find_stream_info(formatContext, NULL);

    // Lower log level since av_log() prints at AV_LOG_ERROR by default
    av_log_set_level(AV_LOG_INFO);

    // av_log(NULL, AV_LOG_INFO, "  Duration: ");
    if (formatContext->duration != AV_NOPTS_VALUE) {
        int hours, mins, secs, us;
        int64_t duration = formatContext->duration + 5000;
        secs  = duration / AV_TIME_BASE;
        us    = duration % AV_TIME_BASE;
        // mins  = secs / 60;
        // secs %= 60;
        // hours = mins / 60;
        // mins %= 60;
        // av_log(NULL, AV_LOG_INFO, "%02d:%02d:%02d.%02d\n", hours, mins, secs, (100 * us) / AV_TIME_BASE);
        printf("%d.%02d", secs, (100 * us) / AV_TIME_BASE);
    }

    return 0;
}
