//g++ -o ../bin/duration_multiple duration_multiple.cpp `pkg-config --cflags --libs libavformat libavutil jsoncpp`

#include <future>
#include <vector>
#include <string>
#include <algorithm>
#include <jsoncpp/json/json.h>
#include <jsoncpp/json/writer.h>

using namespace std;

string get_details(char* file)
{

	char buffer[512];
	char cmd[512];
	string result;

	sprintf(
		cmd,
		"ffmpeg -i %s -vn -acodec copy -f null - 2>&1 \
		| grep -E 'time=|Duration: ' \
		| sed -nr 's/.*([0-9]{2}:[0-9]{2}:[0-9]{2}\\.[0-9]{2}).*/\\1/p' \
		| echo '{\"filename\":\"%s\"' $(awk '{ if(NR==1) print \",\\\"duration\\\":\\\"\"$1\"\\\"\"; else if(NR==2) print \",\\\"time\\\":\\\"\"$1\"\\\"\"; }') '}'",
		file,
		file
	);
	FILE *pipe = popen(cmd, "r");

	if(!pipe) {
		return result;
	}
	while(fgets(buffer, sizeof(buffer), pipe) != nullptr) {
		result += buffer;
	}
	pclose(pipe);
	result.erase(remove_if(result.begin(), result.end(), ::isspace), result.end());

	return result;
}

int main(int argc, char* argv[])
{
	if(argc < 2) {
		cout << "usage: " << argv[0] << " video_file(s)\n";
		return 0;
	}

	if(argc > 33) {
		cout << "call exceeds the maximum allowed number of files (32)\n";
		return 0;
	}

	Json::Value tmp;
	Json::Value root;
	Json::Reader reader;
	Json::StyledWriter sw;
	vector<future<string>> futures;

	for (int i = 1; i < argc; i++) {
		futures.push_back(async(launch::async, get_details, argv[i]));
	}

	for (auto &e : futures) {
		reader.parse( e.get().c_str(), tmp);
		root.append(tmp);
	}

	cout << sw.write(root);

	return 0;
}