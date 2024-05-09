#include "secrets.h"

#include <Arduino.h>
#include <ESP8266Ping.h>

#include "wifi_helper.h"
#include "socketio_manager.h"

WifiHelper wifiHelper;
SocketIOManager socketIOManager;

void setup()
{
  Serial.begin(9600);
  delay(1000);
  

  // //! Connect to WiFi
  wifiHelper.wifiConnect(WIFI_SSID, WIFI_PASSWORD);
  
  if(Ping.ping(SOCKETIO_HOST)){
    Serial.println("Can now ping the socketio host");
  }  else{
    Serial.println("Can't connect the server");
  }

  //! Initialize SocketIOClient
  socketIOManager.begin(SOCKETIO_LOCALHOST, SOCKETIO_LOCALPORT, SOCKETIO_URL);
}

void loop()
{
  
  // socketIOManager.loop();

  if (!wifiHelper.isConnected())
  {
    wifiHelper.wifiConnect(WIFI_SSID, WIFI_PASSWORD);
  }
}
