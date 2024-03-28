
#include <Arduino.h>
#include <ESP8266WiFi.h>
#include "secrets/secrets.h"
#include "wifi_helper/wifi_helper.h"

WifiHelper wifiHelper;

void setup()
{
  Serial.begin(9600);
  delay(1000);

  wifiHelper.wifiConnect(WIFI_SSID, WIFI_PASSWORD);
}

void loop()
{
  
  Serial.println("Hello world");
  delay(1000);
}
