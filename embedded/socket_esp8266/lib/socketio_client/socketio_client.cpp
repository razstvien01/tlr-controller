#include "socketio_client.h"

SocketIOClient::SocketIOClient()
{
  webSocket.onEvent(std::bind(&SocketIOClient::webSocketEvent, this, std::placeholders::_1, std::placeholders::_2, std::placeholders::_3));
}

void SocketIOClient::begin(const char *host, uint16_t port)
{
  webSocket.begin(host, port, "/");
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
  case WStype_ERROR:
    Serial.println("[SocketIO] WebSocket error occurred!");
    // Handle WebSocket errors here
    break;
  case WStype_BIN:
    Serial.println("[SocketIO] Binary data received!");
    // Handle binary data received from WebSocket
    break;
  case WStype_FRAGMENT_TEXT_START:
  case WStype_FRAGMENT_BIN_START:
  case WStype_FRAGMENT:
  case WStype_FRAGMENT_FIN:
    // Handle fragmented WebSocket messages
    break;
  case WStype_PING:
    Serial.println("[SocketIO] Ping received!");
    // Handle WebSocket ping messages
    break;
  case WStype_PONG:
    Serial.println("[SocketIO] Pong received!");
    // Handle WebSocket pong messages
    break;
  default:
    Serial.println("[SocketIO] Unknown WebSocket event!");
    // Handle any other WebSocket events here
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
