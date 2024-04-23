#include "socketio_controller.h"

#include <ArduinoJson.h>

SocketIOController::SocketIOController(const char* rId, const char* uId, const char* serverURL, uint16_t port)
    : socketManager(SocketIOManager()), robotId(rId), userId(uId) {
    // socketManager.begin(serverURL, port, "/socket.io");
    
    
}

void SocketIOController::turnOn() {
    DynamicJsonDocument doc(1024);
    doc["id"] = robotId;
    String payload;
    serializeJson(doc, payload);
    // socketManager.emit("controller/TurnOnRobot/request", payload.c_str());
}

void SocketIOController::handleTurnOnResponse(const char* payload) {
    // Handle the Turn On response here
    // For example, parse the JSON payload if needed
    Serial.println("Turn On Response Received: ");
    Serial.println(payload);
}

void SocketIOController::handleControlResponse(const char* payload) {
    // Handle the Control Robot response here
    // For example, parse the JSON payload if needed
    Serial.println("Control Robot Response Received: ");
    Serial.println(payload);
}

void SocketIOController::handleGetControlResponse(const char* payload) {
    // Handle the Get Control response here
    // For example, parse the JSON payload if needed
    Serial.println("Get Control Response Received: ");
    Serial.println(payload);
}

void SocketIOController::listen() {
    // Add any additional listening logic here if needed
    socketManager.loop();
}
