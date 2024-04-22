#ifndef SOCKETIO_CONTROLLER_H
#define SOCKETIO_CONTROLLER_H

#include "socketio_manager.h"

class SocketIOController{
  public:
    SocketIOController(const char* rId, const char* uId, const char* serverURL, uint16_t port);
    void turnOn();
    void handleTurnOnResponse(const char* payload);
    void handleControlResponse(const char* payload);
    void handleGetControlResponse(const char* payload);
    void listen();
    
  private:
    SocketIOManager socketManager;
    const char* robotId;
    const char* userId;
};

#endif