#include "secrets.h"

#include <Arduino.h>
#include <ESP8266Ping.h>

#include "wifi_helper.h"
#include "socketio_manager.h"

WifiHelper wifiHelper;
SocketIOManager socketIOManager;

void pingServer(const char *host)
{
  if (Ping.ping(host, 5))
  {
    Serial.println("Can now ping the socketio host");
  }
  else
  {
    Serial.println("Can't connect the server");
  }
}

void setup()
{
  Serial.begin(115200);
  delay(1000);

  // //! Connect to WiFi
  wifiHelper.wifiConnect(WIFI_SSID, WIFI_PASSWORD);

  pingServer(SOCKETIO_HOST);

  //! Initialize SocketIOClient
  socketIOManager.begin(SOCKETIO_HOST, SOCKETIO_PORT, SOCKETIO_URL);
  // socketIOManager.begin(SOCKETIO_LOCALHOST, SOCKETIO_LOCALPORT, SOCKETIO_URL);
}

void loop()
{

  socketIOManager.loop();

  if (!wifiHelper.isConnected())
  {
    wifiHelper.wifiConnect(WIFI_SSID, WIFI_PASSWORD);
  }
}
