#include "socketio_client.h"

SocketIOClient::SocketIOClient()
{
  webSocket.onEvent(std::bind(&SocketIOClient::webSocketEvent, this, std::placeholders::_1, std::placeholders::_2, std::placeholders::_3));
}

void SocketIOClient::begin(const char *host, uint16_t port)
{
  webSocket.begin(host, port, "/socket.io/?EIO=4&transport=websocket");
  webSocket.setReconnectInterval(5000);
}

void SocketIOClient::loop()
{
  webSocket.loop();
}

void SocketIOClient::sendMessage(const char *event, const char *message)
{
  sendSocketIOMessage(event, message);
}

void SocketIOClient::webSocketEvent(WStype_t type, uint8_t *payload, size_t length)
{
  switch (type)
  {
  case WStype_DISCONNECTED:
    Serial.println("[SocketIO] Disconnected!");
    break;
  case WStype_CONNECTED:
    Serial.println("[SocketIO] Connected to server");
    // Optionally, you can send a handshake message here to complete the Socket.IO connection process
    break;
  case WStype_TEXT:
    Serial.printf("[SocketIO] Received: %s\n", payload);
    // Handle received messages here
    break;
  }
}

void SocketIOClient::sendSocketIOMessage(const char *event, const char *message)
{
  // Implement Socket.IO message encoding and sending here
  // This typically involves sending a JSON string with the event name and message
  // For example: {"event":"myEvent","data":"Hello, world!"}
  // Note: This is a simplified example. Socket.IO messages can be more complex, including binary data and acknowledgments.
  String msg = String("{\"event\":\"") + String(event) + "\",\"data\":\"" + String(message) + "\"}";
  webSocket.sendTXT(msg.c_str());
}
