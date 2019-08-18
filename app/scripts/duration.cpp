//g++ -o duration -lavutil -lavformat -ljsoncpp duration.cpp
//g++ -o duration duration.cpp -ljsoncpp `pkg-config --cflags --libs libavformat libavutil`

#define __STDC_CONSTANT_MACROS
#include <iostream>
#include <jsoncpp/json/json.h>
#include <jsoncpp/json/writer.h>
#include <fstream>
#include <string>
#include <sstream>

#ifdef __cplusplus
extern "C" {
#endif
#include "libavutil/avutil.h"
#include "libavformat/avformat.h"
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
	
	av_log_set_level(AV_LOG_INFO);
	av_register_all();
	char dur[20];

	Json::Value root;		
	
	for(int i = 1; i < argc; i++)
	{
		char* file = argv[i];
		AVFormatContext* formatContext = NULL;	//avformat_alloc_context();

		// Open video file
		avformat_open_input(&formatContext, file, NULL, NULL);
		avformat_find_stream_info(formatContext, NULL);

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
			sprintf(dur, "%d.%02d", secs, (100 * us) / AV_TIME_BASE);
			Json::Value jfile;
			jfile["filename"] = file;
			jfile["duration"] = dur;
			root.append(jfile);			
		}
	}

	Json::StyledWriter sw;
	cout << sw.write(root);

    return 0;
}
