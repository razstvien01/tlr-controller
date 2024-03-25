#include "socketio_client.h"

SocketIOClient::SocketIOClient()
{
}
void SocketIOClient::begin(const char *host, uint16_t port)
{
  webSocket.begin(host, port, "/");
  webSocket.onEvent(std::bind(&SocketIOClient::webSocketEvent, this, std::placeholders::_1, std::placeholders::_2, std::placeholders::_3));
}

void SocketIOClient::loop()
{
  webSocket.loop();
}

// void SocketIOClient::on(const char* eventName, std::function<void (const char* data)> callback) {
//     // webSocket.on(eventName, callback);
// }

void SocketIOClient::webSocketEvent(WStype_t type, uint8_t *payload, size_t length)
{
  if (type == WStype_TEXT)
  {
    Serial.printf("[WebSocket] Message received: %s\n", payload);
  }
}