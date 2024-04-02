#ifndef SOCKETIO_CLIENT_H
#define SOCKETIO_CLIENT_H

#include <Arduino.h>
#include <WebSocketsClient.h>
#include <SocketIOclient.h>

class SocketIOClientRev
{
public:
  SocketIOClientRev();
  void begin(const char *host, uint16_t port);
  void loop();
  void sendMessage(const char *event, const char *message);

private:
  SocketIOclient socketIO;
  void socketIOEvent(socketIOmessageType_t type, uint8_t * payload, size_t length);
};

#endif
