// #ifndef SOCKETIO_CONTROLLER_H
// #define SOCKETIO_CONTROLLER_H
// #include "controller_constants.h"
// #include <SocketIOclient.h>

// class SocketIOController{
//   public:
//     SocketIOController(const char* robotId, const char* userId, SocketIOclient& socketIOClient);
//     ~SocketIOController(); //* Destructor
//     void turnOn();
//     void handleTurnOnResponse(const char* payload);
//     void handleControlResponse(const char* payload);
//     void handleGetControlResponse(const char* payload);
//     void listen();
    
//   private:
//     char* robotId;
//     char* userId;
//     SocketIOclient& socketIOClient; // Reference to the SocketIOclient object
// };

// #endif
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
    void turnOn();

private:
    SocketIOclient& socketIOClient;
};

#endif
