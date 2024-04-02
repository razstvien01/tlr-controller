
#include <Arduino.h>

#include "secrets.h"
#include "wifi_helper.h"
#include "socketio_client_rev.h"

WifiHelper wifiHelper;

SocketIOClientRev socketIOClient;

void setup()
{
  Serial.begin(9600);
  delay(1000);

  //! Connect to WiFi
  wifiHelper.wifiConnect(WIFI_SSID, WIFI_PASSWORD);

  //! Initialize SocketIOClient
  socketIOClient.begin(SOCKETIO_HOST, SOCKETIO_PORT);
  socketIOClient.emitConnect();
}

void loop()
{

  if (!wifiHelper.isConnected())
  {
    wifiHelper.wifiConnect(WIFI_SSID, WIFI_PASSWORD);
  }

  socketIOClient.loop();
  delay(1000);
}
