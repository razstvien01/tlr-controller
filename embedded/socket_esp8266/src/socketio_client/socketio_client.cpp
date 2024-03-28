#include "socketio_client.h"

WebSocketClient::WebSocketClient()
{
  webSocket.onEvent(std::bind(&WebSocketClient::webSocketEvent, this, std::placeholders::_1, std::placeholders::_2, std::placeholders::_3));
}

void WebSocketClient::begin(const char *host, uint16_t port)
{
  webSocket.begin(host, port, "/");
  webSocket.setReconnectInterval(5000);
}

void WebSocketClient::loop()
{
  webSocket.loop();
}

void WebSocketClient::sendMessage(const char *message)
{
  webSocket.sendTXT(message);
}

void WebSocketClient::webSocketEvent(WStype_t type, uint8_t *payload, size_t length)
{
  switch (type)
  {
  case WStype_DISCONNECTED:
    Serial.printf("[WSc] Disconnected!\n");
    break;
  case WStype_CONNECTED:
    Serial.printf("[WSc] Connected to url: %s\n", payload);
    sendMessage("Hello from ESP8266!");
    break;
  case WStype_TEXT:
    Serial.printf("[WSc] Received: %s\n", payload);
    // Handle received messages here
    break;
  case WStype_ERROR:
    Serial.printf("[WSc] Error: %s\n", payload);
    break;
  }
}
