#ifndef WIFI_HELPER_H
#define WIFI_HELPER_H

#include <ESP8266WiFi.h>

class WifiHelper
{
public:
  WifiHelper();

  void wifiConnect(const char *ssid, const char *password);
  
  bool isConnected();

private:
  bool connected;
};

#endif
