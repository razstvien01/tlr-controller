#include "socketio_client_rev.h"

void SocketIOClientRev::begin(const char *host, uint16_t port)
{
  socketIO.begin(host, port, "/");
  socketIO.onEvent([this](socketIOmessageType_t type, uint8_t *payload, size_t length)
                   { this->socketIOEvent(type, payload, length); });
  socketIO.setReconnectInterval(5000);
}

void SocketIOClientRev::loop()
{
  socketIO.loop();
}

void SocketIOClientRev::emitConnect()
{
  // Send connect event
  // creat JSON message for Socket.IO (event)
  DynamicJsonDocument doc(1024);
  JsonArray array = doc.to<JsonArray>();

  // add evnet name
  // Hint: socket.on('event_name', ....
  array.add("connect");

  // JSON to String (serializion)
  String output;
  serializeJson(doc, output);

  // Send event
  socketIO.sendEVENT(output);
}

void sampleEmit()
{
  // creat JSON message for Socket.IO (event)
  DynamicJsonDocument doc(1024);
  JsonArray array = doc.to<JsonArray>();

  // add evnet name
  // Hint: socket.on('event_name', ....
  array.add("event_name");

  // add payload (parameters) for the event
  JsonObject param1 = array.createNestedObject();
  param1["test"] = "test";

  // JSON to String (serializion)
  String output;
  serializeJson(doc, output);

  // Send event
  // socketIO.sendEVENT(output);
}

void SocketIOClientRev::eventNameHandler(String eventName)
{
  if (eventName == "message")
  {
    // Do something
  }
  else if (eventName == "flask_to_client_message")
  {
    // Do something else
  }
}

void SocketIOClientRev::socketIOEvent(socketIOmessageType_t type, uint8_t *payload, size_t length)
{
  switch (type)
  {
  case sIOtype_DISCONNECT:
    Serial.printf("[IOc] Disconnected!\n");
    break;
  case sIOtype_CONNECT:
    Serial.printf("[IOc] Connected to url: %s\n", payload);

    // join default namespace (no auto join in Socket.IO V3)
    socketIO.send(sIOtype_CONNECT, "/");
    break;
  case sIOtype_EVENT:
  {
    Serial.printf("[IOc] get event: %s\n", payload);

    char *sptr = NULL;
    int id = strtol((char *)payload, &sptr, 10);
    Serial.printf("[IOc] get event: %s id: %d\n", payload, id);
    if (id)
    {
      payload = (uint8_t *)sptr;
    }
    Serial.printf("[IOc] retrieved char: %s\n", sptr);

    DynamicJsonDocument doc(1024);
    DeserializationError error = deserializeJson(doc, payload, length);
    if (error)
    {
      Serial.print(F("deserializeJson() failed: "));
      Serial.println(error.c_str());
      return;
    }

    String eventName = doc[0];
    Serial.printf("[IOc] event name: %s\n", eventName.c_str());

    // Message Includes a ID for a ACK (callback)
    // if(id) {
    //     // creat JSON message for Socket.IO (ack)
    //     DynamicJsonDocument docOut(1024);
    //     JsonArray array = docOut.to<JsonArray>();

    //     // add payload (parameters) for the ack (callback function)
    //     JsonObject param1 = array.createNestedObject();
    //     param1["now"] = millis();

    //     // JSON to String (serializion)
    //     String output;
    //     output += id;
    //     serializeJson(docOut, output);

    //     // Send event
    //     socketIO.send(sIOtype_ACK, output);
    // }
  }
  break;
  case sIOtype_ACK:
    Serial.printf("[IOc] get ack: %u\n", length);
    hexdump(payload, length);
    break;
  case sIOtype_ERROR:
    Serial.printf("[IOc] get error: %u\n", length);
    hexdump(payload, length);
    break;
  case sIOtype_BINARY_EVENT:
    Serial.printf("[IOc] get binary: %u\n", length);
    hexdump(payload, length);
    break;
  case sIOtype_BINARY_ACK:
    Serial.printf("[IOc] get binary ack: %u\n", length);
    hexdump(payload, length);
    break;
  }
}