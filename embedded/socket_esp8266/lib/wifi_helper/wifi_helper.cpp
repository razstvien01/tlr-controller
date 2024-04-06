#include "wifi_helper.h"

WifiHelper::WifiHelper()
{
}

void WifiHelper::wifiConnect(const char *ssid, const char *password)
{
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED)
  {
    delay(1000);
    Serial.println("Connecting to WiFi...");
  }
  
  Serial.println("\nWiFi connected!");
  Serial.print("IP Address: ");
  Serial.println(WiFi.localIP());
}

bool WifiHelper::isConnected()
{
  return WiFi.status() == WL_CONNECTED;
}