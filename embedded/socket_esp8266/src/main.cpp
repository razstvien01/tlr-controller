
#include <Arduino.h>

#include "secrets.h"
#include "wifi_helper.h"
#include "socketio_client.h"

WifiHelper wifiHelper;

SocketIOClient socketIOClient;

void setup()
{
  Serial.begin(9600);
  delay(1000);

  //! Connect to WiFi
  wifiHelper.wifiConnect(WIFI_SSID, WIFI_PASSWORD);

  //! Initialize SocketIOClient
  socketIOClient.begin(SOCKETIO_HOST, SOCKETIO_PORT);
}

void loop()
{
  socketIOClient.loop();
  delay(1000);
}
