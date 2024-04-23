#include "socketio_controller.h"
#include <cstring>
#include <ArduinoJson.h>

SocketIOController::SocketIOController(const char *robotId, const char *userId, SocketIOclient &socketIOClient)
    : robotId(new char[strlen(robotId) + 1]), userId(new char[strlen(userId) + 1]), socketIOClient(socketIOClient)
{
    strcpy(this->robotId, robotId);
    strcpy(this->userId, userId);
}

SocketIOController::~SocketIOController()
{
    delete[] robotId;
    delete[] userId;
}

void SocketIOController::turnOn()
{
    DynamicJsonDocument doc(1024);
    doc["id"] = robotId;

    String payload;
    serializeJson(doc, payload);
    Serial.printf(robotId);

    // Use socketIOClient to send the "Turn On" request
    // socketIOClient.sendTXT("controller/TurnOnRobot/request", payload.c_str(), payload.length());
    // socketIOClient.send(sIOtype_CONNECT, "/");
    
}

void SocketIOController::handleTurnOnResponse(const char *payload)
{
    // Handle the Turn On response here
    // For example, parse the JSON payload if needed
    Serial.println("Turn On Response Received: ");
    Serial.println(payload);
}

void SocketIOController::handleControlResponse(const char *payload)
{
    // Handle the Control Robot response here
    // For example, parse the JSON payload if needed
    Serial.println("Control Robot Response Received: ");
    Serial.println(payload);
}

void SocketIOController::handleGetControlResponse(const char *payload)
{
    // Handle the Get Control response here
    // For example, parse the JSON payload if needed
    Serial.println("Get Control Response Received: ");
    Serial.println(payload);
}