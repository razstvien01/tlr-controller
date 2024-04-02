#ifndef SOCKETIO_CLIENT_H
#define SOCKETIO_CLIENT_H

#include <Arduino.h>
#include <WebSocketsClient.h>
#include <SocketIOclient.h>
#include <ArduinoJson.h>
#include <cstdlib>

class SocketIOClientRev
{
public:
  SocketIOClientRev();
  void begin(const char *host, uint16_t port);
  void loop();
  void emitConnect();

private:
  SocketIOclient socketIO;
  void socketIOEvent(socketIOmessageType_t type, uint8_t * payload, size_t length);
  void eventNameHandler(String eventName);
};

#endif
