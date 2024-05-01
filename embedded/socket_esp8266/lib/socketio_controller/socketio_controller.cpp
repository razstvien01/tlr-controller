#include "socketio_controller.h"

SocketIOController::SocketIOController(SocketIOclient& socketIOClient)
    : socketIOClient(socketIOClient) {
    // Constructor initialization if needed
}

SocketIOController::~SocketIOController() {
    
}


void SocketIOController::turnOn() {
    DynamicJsonDocument doc(1024);
    JsonArray array = doc.to<JsonArray>();
    
    array.add("controller/TurnOnRobot/request");
    
    JsonObject param1 = array.createNestedObject();
    param1["id"] = RID;
    
    String output;
    serializeJson(doc, output);
    
    socketIOClient.sendEVENT(output);
}

void SocketIOController::handleTurnOnResponse(const char *payload)
{
    Serial.println("Turn On Response Received: ");
    Serial.println(payload);
}

void SocketIOController::handleControlResponse(const char *payload)
{
    Serial.println("Control Robot Response Received: ");
    Serial.println(payload);
}

void SocketIOController::handleGetControlResponse(const char *payload)
{
    Serial.println("Get Control Response Received: ");
    Serial.println(payload);
}