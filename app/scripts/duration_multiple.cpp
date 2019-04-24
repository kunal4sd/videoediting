//g++ -o duration_multiple duration_multiple.cpp `pkg-config --cflags --libs libavformat libavutil jsoncpp`

#define __STDC_CONSTANT_MACROS
#include <iostream>
#include <jsoncpp/json/json.h>
#include <jsoncpp/json/writer.h>

#ifdef __cplusplus
extern "C" {
#endif
#include <libavutil/avutil.h>
#include <libavformat/avformat.h>
#ifdef __cplusplus
}
#endif

using namespace std;

int main(int argc, char* argv[])
{
    if(argc < 2)
    {
		std::cout << "usage: " << argv[0] << " video_file(s)\n";
		return 0;
    }

	// Lower log level since av_log() prints at AV_LOG_ERROR by default
	av_log_set_level(AV_LOG_INFO);
	av_register_all();
	char dur[10];

	Json::Value root;
	for(int i = 1; i < argc; i++)
	{
		char* file = argv[i];
		AVFormatContext* formatContext = NULL;
		Json::Value jfile;

		jfile["filename"] = file;

		// Open video file
		if (avformat_open_input(&formatContext, file, NULL, NULL) < 0) {
			jfile["duration"] = 0.00;
			root.append(jfile);
			continue;
		}
		if (avformat_find_stream_info(formatContext, NULL) < 0) {
			jfile["duration"] = 0.00;
			root.append(jfile);
			continue;
		}

		//av_log(NULL, AV_LOG_INFO, "  Duration: ");
		if (formatContext->duration != AV_NOPTS_VALUE) {
			int hours, mins, secs, us;
			int64_t duration = formatContext->duration + 5000;
			secs  = duration / AV_TIME_BASE;
			us    = duration % AV_TIME_BASE;
			// mins  = secs / 60;
			// secs %= 60;
			// hours = mins / 60;
			// mins %= 60;
			// sprintf(dur, "%02d:%02d:%02d.%02d", hours, mins, secs, (100 * us) / AV_TIME_BASE);
			sprintf(dur, "%d.%02d", secs, (100 * us) / AV_TIME_BASE);
		}

		jfile["duration"] = dur;
		root.append(jfile);
	}

	Json::StyledWriter sw;

	cout << sw.write(root);

    return 0;
}
