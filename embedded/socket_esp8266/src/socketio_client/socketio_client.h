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
  
  void on(const char* eventName, std::function<void (const char* data)> callback);
  
private:
  WebSocketsClient webSocket;
  void webSocketEvent(WStype_t type, uint8_t* payload, size_t length);
};

#endif