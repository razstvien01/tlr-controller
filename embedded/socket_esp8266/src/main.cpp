
#include <Arduino.h>
#include "secrets/secrets.h"
#include "wifi_helper/wifi_helper.h"
#include "socketio_client/socketio_client.h"

WifiHelper wifiHelper;
WebSocketClient webSocketClient;

void setup()
{
  Serial.begin(9600);
  delay(1000);

  wifiHelper.wifiConnect(WIFI_SSID, WIFI_PASSWORD);
  webSocketClient.begin(WEBSOCKETS_HOST, WEBSOCKETS_PORT);
}

void loop()
{
  webSocketClient.loop();
  delay(1000);
}