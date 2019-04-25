//g++ -o ../bin/duration_multiple duration_multiple.cpp `pkg-config --cflags --libs libavformat libavutil jsoncpp`

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

Json::Value get_details(char* file)
{

	AVFormatContext* formatContext = NULL;
	Json::Value jfile;
	char dur[10];

	jfile["filename"] = file;
	if (
		avformat_open_input(&formatContext, file, NULL, NULL) >= 0
		&& avformat_find_stream_info(formatContext, NULL) >= 0
		&& formatContext->duration != AV_NOPTS_VALUE
	) {
		int secs, us;
		int64_t duration = formatContext->duration + 5000;
		secs  = duration / AV_TIME_BASE;
		us    = duration % AV_TIME_BASE;
		sprintf(dur, "%d.%02d", secs, (100 * us) / AV_TIME_BASE);
		jfile["duration"] = dur;
	}
	else {
		jfile["duration"] = 0.01;
	}

	return jfile;
}

int main(int argc, char* argv[])
{
	if(argc < 2) {
		cout << "usage: " << argv[0] << " video_file(s)\n";
		return 0;
	}

	av_log_set_level(AV_LOG_INFO);
	av_register_all();

	Json::Value root;
	for(int i = 1; i < argc; i++) {
		char* file = argv[i];
		root.append(get_details(file));
	}

	Json::StyledWriter sw;
	cout << sw.write(root);

	return 0;
}
