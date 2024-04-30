#include "socketio_controller.h"

SocketIOController::SocketIOController(SocketIOclient& socketIOClient)
    : socketIOClient(socketIOClient) {
    // Constructor initialization if needed
}

SocketIOController::~SocketIOController() {
    
}


void SocketIOController::turnOn() {
    // Create JSON message for Socket.IO (event)
    DynamicJsonDocument doc(1024);
    JsonArray array = doc.to<JsonArray>();

    // Add event name
    array.add("controller/TurnOnRobot/request");

    // Add payload (parameters) for the event
    JsonObject param1 = array.createNestedObject();
    param1["id"] = RID;

    // JSON to String (serialization)
    String output;
    serializeJson(doc, output);

    // Send event
    socketIOClient.sendEVENT(output);
}


// #include "socketio_controller.h"
// #include <cstring>
// #include <ArduinoJson.h>

// SocketIOController::SocketIOController(const char *robotId, const char *userId, SocketIOclient &socketIOClient)
//     : robotId(new char[strlen(robotId) + 1]), userId(new char[strlen(userId) + 1]), socketIOClient(socketIOClient)
// {
//     strcpy(this->robotId, robotId);
//     strcpy(this->userId, userId);
// }

// SocketIOController::~SocketIOController()
// {
//     delete[] robotId;
//     delete[] userId;
// }

// void SocketIOController::turnOn()
// {
//     DynamicJsonDocument doc(1024);
//     JsonArray array = doc.to<JsonArray>();
    
//     array.add(C_RES_TURNONROBOT);

//     JsonObject param1 = array.createNestedObject();
//     param1["id"] = robotId;
    
//     String output;
//     serializeJson(doc, output);
    
//     Serial.printf(robotId);
    
//     socketIOClient.sendEVENT(output);
// }

// void SocketIOController::handleTurnOnResponse(const char *payload)
// {
//     // Handle the Turn On response here
//     // For example, parse the JSON payload if needed
//     Serial.println("Turn On Response Received: ");
//     Serial.println(payload);
// }

// void SocketIOController::handleControlResponse(const char *payload)
// {
//     // Handle the Control Robot response here
//     // For example, parse the JSON payload if needed
//     Serial.println("Control Robot Response Received: ");
//     Serial.println(payload);
// }

// void SocketIOController::handleGetControlResponse(const char *payload)
// {
//     // Handle the Get Control response here
//     // For example, parse the JSON payload if needed
//     Serial.println("Get Control Response Received: ");
//     Serial.println(payload);
// }