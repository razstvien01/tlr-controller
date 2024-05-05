#include "socketio_manager.h"
#include "secrets.h"

void SocketIOManager::onEvent(socketIOmessageType_t type, uint8_t *payload, size_t length)
{
  switch (type)
  {
  case sIOtype_DISCONNECT:
    Serial.printf("[IOc] Disconnected!\n");
    break;
  case sIOtype_CONNECT:
    Serial.printf("[IOc] Connected to url: %s\n", payload);

    socketIO.send(sIOtype_CONNECT, "/");

    controller.turnOnRequest();

    break;
  case sIOtype_EVENT:
  {
    char *sptr = NULL;
    int id = strtol((char *)payload, &sptr, 10);
    // Serial.printf("[IOc] get event: %s id: %d\n", payload, id);

    if (id)
    {
      payload = (uint8_t *)sptr;
    }
    DynamicJsonDocument doc(1024);

    DeserializationError error = deserializeJson(doc, payload, length);

    if (error)
    {
      Serial.print(F("deSerializeJson() failed: "));
      Serial.println(error.c_str());
      return;
    }

    String eventName = doc[0];

    if (eventName == C_RES_CONNECT)
    {
      connectResponse(doc[1]);
    }
    else if (eventName == C_RES_TURNON_ROBOT)
    {
      controller.turnOnResponse(doc[1]);
    }
    else if (eventName == C_RES_TURNOFF_ROBOT)
    {
      controller.turnOffResponse(doc[1]);
    }
    else if (eventName == C_RES_GET_CONTROL)
    {
      controller.getControlResponse(doc[1]);
    }
    else if (eventName == C_RES_CONTROL_ROBOT)
    {
      controller.controlRobotResponse(doc[1]);
    }

    //! Message Includes a ID for a ACK (callback)
    if (id)
    {
      //* creat JSON message for Socket.IO (ack)
      DynamicJsonDocument docOut(1024);
      JsonArray array = docOut.to<JsonArray>();

      //* add payload (parameters) for the ack (callback function)
      JsonObject param1 = array.createNestedObject();
      param1["now"] = millis();

      //* JSON to String (Serializion)
      String output;
      output += id;

      serializeJson(docOut, output);

      //* Send event
      socketIO.send(sIOtype_ACK, output);
    }
  }
  break;
  case sIOtype_ACK:
    Serial.printf("[IOc] get ack: %u\n", length);
    break;
  case sIOtype_ERROR:
    Serial.printf("[IOc] get error: %u\n", length);
    break;
  case sIOtype_BINARY_EVENT:
    Serial.printf("[IOc] get binary: %u\n", length);
    break;
  case sIOtype_BINARY_ACK:
    Serial.printf("[IO  c] get binary ack: %u\n", length);
    break;
  }
}

void SocketIOManager::begin(const char *host, uint16_t port, const char *path)
{
  socketIO.begin(host, port, path);
  socketIO.onEvent([this](socketIOmessageType_t type, uint8_t *payload, size_t length)
                   { this->onEvent(type, payload, length); });
}

void SocketIOManager::connectResponse(const JsonObject &obj)
{
  const char *message = obj["message"];
  Serial.println(message);
}

void SocketIOManager::loop()
{
  socketIO.loop();
  controller.getControlRequest();
}

SocketIOManager::SocketIOManager() : controller(socketIO)
{
}

SocketIOManager::~SocketIOManager()
{
}