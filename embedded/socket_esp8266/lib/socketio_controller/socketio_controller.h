#ifndef SOCKETIO_CONTROLLER_H
#define SOCKETIO_CONTROLLER_H

#include "secrets.h"
#include "controller_constants.h"
#include <Arduino.h>
#include <SocketIOclient.h>
#include <ArduinoJson.h>

class SocketIOController {
public:
    SocketIOController(SocketIOclient& socketIOClient);
    ~SocketIOController();
    void turnOnRequest();
    void turnOnResponse(const char* payload);
    void controlResponse(const char* payload);
    void getControlResponse(const char* payload);

private:
    SocketIOclient& socketIOClient;
};

#endif
