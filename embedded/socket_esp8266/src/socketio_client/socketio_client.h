#ifndef SOCKETIO_CLIENT_H
#define SOCKETIO_CLIENT_H

#include <Arduino.h>
#include <WebSocketsClient.h>

class SocketIOClient
{
public:
  SocketIOClient();
  
  void begin(const char* host, uint16_t port);
  
  void loop();
  
  void onMessage(std::function<void (WStype_t type, uint8_t* payload, size_t length)> callback);
  
private:
  WebSocketsClient webSocket;
  void webSocketEvent(WStype_t type, uint8_t* payload, size_t length);
};

#endif
