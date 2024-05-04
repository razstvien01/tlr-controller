#include "socketio_controller.h"

SocketIOController::SocketIOController(SocketIOclient& socketIOClient)
    : socketIOClient(socketIOClient) {
    // Constructor initialization if needed
}

SocketIOController::~SocketIOController() {
    
}


void SocketIOController::turnOnRequest() {
    DynamicJsonDocument doc(1024);
    JsonArray array = doc.to<JsonArray>();
    
    array.add(C_REQ_TURNON_ROBOT);
    
    JsonObject param1 = array.createNestedObject();
    param1["id"] = RID;
    
    String output;
    serializeJson(doc, output);
    
    socketIOClient.sendEVENT(output);
}


void SocketIOController::turnOnResponse(const char *payload)
{
    Serial.println("Turn On Response Received: ");
    Serial.println(payload);
}

void SocketIOController::controlResponse(const char *payload)
{
    Serial.println("Control Robot Response Received: ");
    Serial.println(payload);
}

void SocketIOController::getControlResponse(const char *payload)
{
    Serial.println("Get Control Response Received: ");
    Serial.println(payload);
}