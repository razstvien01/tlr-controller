#ifndef SOCKETIO_CONTROLLER_H
#define SOCKETIO_CONTROLLER_H
#include <SocketIOclient.h>

class SocketIOController{
  public:
    SocketIOController(const char* robotId, const char* userId, SocketIOclient& socketIOClient);
    ~SocketIOController(); //* Destructor
    void turnOn();
    void handleTurnOnResponse(const char* payload);
    void handleControlResponse(const char* payload);
    void handleGetControlResponse(const char* payload);
    void listen();
    
  private:
    char* robotId;
    char* userId;
    SocketIOclient& socketIOClient; // Reference to the SocketIOclient object
};

#endif