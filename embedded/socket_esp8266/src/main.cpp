#include "secrets.h"

#include <Arduino.h>

#include "wifi_helper.h"
#include "socketio_manager.h"

WifiHelper wifiHelper;
SocketIOManager socketIOManager;


void setup()
{
  Serial.begin(9600);
  delay(1000);

  //! Connect to WiFi
  wifiHelper.wifiConnect(WIFI_SSID, WIFI_PASSWORD);

  //! Initialize SocketIOClient
  socketIOManager.begin(SOCKETIO_LOCALHOST, SOCKETIO_LOCALPORT, SOCKETIO_URL);
  // socketIOManager.begin(SOCKETIO_HOST, SOCKETIO_PORT, SOCKETIO_URL);

  
}

void loop()
{
  socketIOManager.loop();

  if (!wifiHelper.isConnected())
  {
    wifiHelper.wifiConnect(WIFI_SSID, WIFI_PASSWORD);
  }
}
