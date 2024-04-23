#ifndef SOCKETIO_MANAGER_H
#define SOCKETIO_MANAGER_H

#include <Arduino.h>
#include <SocketIOclient.h>
#include <ArduinoJson.h>

#include "socketio_controller.h"

class SocketIOManager {
public:
    SocketIOManager();
    void begin(const char* host, uint16_t port, const char* path);
    void loop();
    void onEvent(socketIOmessageType_t type, uint8_t *payload, size_t length);

private:
    SocketIOclient socketIO;
    SocketIOController controller;
};

#endif
