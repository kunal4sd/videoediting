//g++ -o ../bin/duration_multiple duration_multiple.cpp `pkg-config --cflags --libs libavformat libavutil jsoncpp`

#define __STDC_CONSTANT_MACROS
#include <iostream>
#include <future>
#include <vector>
#include <jsoncpp/json/json.h>
#include <jsoncpp/json/writer.h>
#include <cstdio>
#include <memory>
#include <stdexcept>
#include <string>
#include <array>
#include <regex>

using namespace std;

Json::Value get_length(char* file)
{

	Json::Value jfile;
	char dur[10];
	char buffer[512];
	char cmd[256];
	std::string result;
	smatch m;
	regex re("time=([0-9:.]+)+");

	jfile["filename"] = file;
	sprintf(cmd, "ffmpeg -i %s -acodec copy -vn -f null - 2>&1", file);
	FILE *pipe = popen(cmd, "r");

	if (!pipe) {
			throw std::runtime_error("popen() failed!");
	}
	while (fgets(buffer, sizeof(buffer), pipe) != nullptr) {
			result += buffer;
	}
	pclose(pipe);

	string sp(result);
	regex_search(sp, m, re);
	jfile["duration"] = m.str(1);

	return jfile;
}

int main(int argc, char* argv[])
{
	if(argc < 2) {
		std::cout << "usage: " << argv[0] << " video_file(s)\n";
		return 0;
	}

	Json::Value root;
	std::vector<std::future<Json::Value>> futures;

	for(int i = 1; i < argc; i++)
	{
		futures.push_back(std::async(std::launch::async, get_length, argv[i]));
	}

	for(auto &e : futures) {
		root.append(e.get());
	}

	Json::StyledWriter sw;
	cout << sw.write(root);

	return 0;
}
