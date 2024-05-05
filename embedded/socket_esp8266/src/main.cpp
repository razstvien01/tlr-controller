#include "secrets.h"

#include <Arduino.h>

#include "wifi_helper.h"
#include "socketio_manager.h"

WifiHelper wifiHelper;
SocketIOManager socketIOManager;


void setup()
{
  Serial.begin(9600);
  // delay(1000);

  // //! Connect to WiFi
  // wifiHelper.wifiConnect(WIFI_SSID, WIFI_PASSWORD);

  // //! Initialize SocketIOClient
  // socketIOManager.begin(SOCKETIO_LOCALHOST, SOCKETIO_LOCALPORT, SOCKETIO_URL);
}

void loop()
{
  // socketIOManager.loop();

  // if (!wifiHelper.isConnected())
  // {
  //   wifiHelper.wifiConnect(WIFI_SSID, WIFI_PASSWORD);
  // }
  Serial.println("Hello from 8266");
  if(Serial.available()){
    String data = Serial.readStringUntil('\n');
    Serial.print("receive from arduino: ");
    Serial.println(data);
  }
  delay(5000);
}
