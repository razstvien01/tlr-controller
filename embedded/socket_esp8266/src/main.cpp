
#include <Arduino.h>
#include "secrets.h"

#include "wifi_helper.h"
// #include <ArduinoJson.h>

// #include <WebSocketsClient.h>
// #include <SocketIOclient.h>

#include "socketio_manager.h"

WifiHelper wifiHelper;
SocketIOManager socketIOManager;

// SocketIOClientRev socketIOClient;
// SocketIOclient socketIO;

// void socketIOEvent(socketIOmessageType_t type, uint8_t *payload, size_t length)
// {
//   switch (type)
//   {
//   case sIOtype_DISCONNECT:
//     Serial.printf("[IOc] Disconnected!\n");
//     break;
//   case sIOtype_CONNECT:
//     Serial.printf("[IOc] Connected to url: %s\n", payload);

//     // join default namespace (no auto join in Socket.IO V3)
//     socketIO.send(sIOtype_CONNECT, "/");
//     break;
//   case sIOtype_EVENT:
//   {
//     char *sptr = NULL;
//     int id = strtol((char *)payload, &sptr, 10);
//     Serial.printf("[IOc] get event: %s id: %d\n", payload, id);
//     if (id)
//     {
//       payload = (uint8_t *)sptr;
//     }
//     DynamicJsonDocument doc(1024);

//     DeserializationError error = deserializeJson(doc, payload, length);

//     if (error)
//     {
//       Serial.print(F("deSerializeJson() failed: "));
//       Serial.println(error.c_str());
//       return;
//     }

//     String eventName = doc[0];
//     Serial.printf("[IOc] event name: %s\n", eventName.c_str());

//     // Message Includes a ID for a ACK (callback)
//     if (id)
//     {
//       // creat JSON message for Socket.IO (ack)
//       DynamicJsonDocument docOut(1024);
//       JsonArray array = docOut.to<JsonArray>();

//       // add payload (parameters) for the ack (callback function)
//       JsonObject param1 = array.createNestedObject();
//       param1["now"] = millis();

//       // JSON to String (Serializion)
//       String output;
//       output += id;

//       serializeJson(docOut, output);

//       // Send event
//       socketIO.send(sIOtype_ACK, output);
//     }
//   }
//   break;
//   case sIOtype_ACK:
//     Serial.printf("[IOc] get ack: %u\n", length);
//     break;
//   case sIOtype_ERROR:
//     Serial.printf("[IOc] get error: %u\n", length);
//     break;
//   case sIOtype_BINARY_EVENT:
//     Serial.printf("[IOc] get binary: %u\n", length);
//     break;
//   case sIOtype_BINARY_ACK:
//     Serial.printf("[IOc] get binary ack: %u\n", length);
//     break;
//   }
// }

void setup()
{
  Serial.begin(9600);
  delay(1000);

  //! Connect to WiFi
  wifiHelper.wifiConnect(WIFI_SSID, WIFI_PASSWORD);

  //! Initialize SocketIOClient
  // socketIOClient.begin(SOCKETIO_HOST, SOCKETIO_PORT);
  // socketIOClient.emitConnect();

  // socketIO.begin(SOCKETIO_LOCALHOST, SOCKETIO_LOCALPORT, SOCKETIO_URL);

  // event handler
  // socketIO.onEvent(socketIOEvent);
  socketIOManager.begin(SOCKETIO_LOCALHOST, SOCKETIO_LOCALPORT, SOCKETIO_URL);
}

void loop()
{
  socketIOManager.loop();
  // socketIO.loop();
  if (!wifiHelper.isConnected())
  {
    wifiHelper.wifiConnect(WIFI_SSID, WIFI_PASSWORD);
  }
}
