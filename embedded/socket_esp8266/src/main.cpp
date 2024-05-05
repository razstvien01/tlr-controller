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

  // //! Connect to WiFi
  wifiHelper.wifiConnect(WIFI_SSID, WIFI_PASSWORD);

  //! Initialize SocketIOClient
  socketIOManager.begin(SOCKETIO_LOCALHOST, SOCKETIO_LOCALPORT, SOCKETIO_URL);
}

// StaticJsonDocument<200> doc; // Adjust the size as needed

// void sendDataToArduino()
// {
//   // Create and populate the JSON data
//   JsonObject data = doc.to<JsonObject>();
//   data["key"] = "value";  // Add your JSON data here
//   data["source"] = "esp"; // Add the source information
//   serializeJson(data, Serial);
//   Serial.println(); // Add a newline to indicate the end of JSON data
// }

void loop()
{
  socketIOManager.loop();

  if (!wifiHelper.isConnected())
  {
    wifiHelper.wifiConnect(WIFI_SSID, WIFI_PASSWORD);
  }

  // sendDataToArduino(); // Send JSON data to the ESP every 5 seconds

  // if (Serial.available())
  // {
  //   // Process incoming data from the ESP
  //   deserializeJson(doc, Serial);
  //   const char *key = doc["key"];
  //   if (key)
  //   {
  //     // Print the received key
  //     Serial.print("Received key: ");
  //     Serial.println(key);

  //     // Check if the data is received from the ESP
  //     const char *source = doc["source"];
  //     if (source && strcmp(source, "arduino") == 0)
  //     {
  //       Serial.println("Data received from Aruino");
  //     }
  //   }
  // }

  // delay(1000); 
}
