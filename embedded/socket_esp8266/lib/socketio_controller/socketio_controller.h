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
    void turnOnResponse(const JsonObject &obj);
    void turnOffRequest();
    void turnOffResponse(const JsonObject &obj);
    void controlRobotRequest();
    void controlRobotResponse(const JsonObject &obj);
    void getControlRequest();
    void getControlResponse(const JsonObject &obj);

private:
    SocketIOclient& socketIOClient;
};

#endif
