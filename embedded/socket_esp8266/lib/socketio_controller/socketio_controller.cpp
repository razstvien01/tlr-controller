#include "socketio_controller.h"

//! Constructor
SocketIOController::SocketIOController(SocketIOclient &socketIOClient)
    : socketIOClient(socketIOClient)
{
    // Constructor initialization if needed
}

//! Desconstructor
SocketIOController::~SocketIOController()
{
}

//! Request functions
void SocketIOController::turnOnRequest()
{
    DynamicJsonDocument doc(1024);
    JsonArray array = doc.to<JsonArray>();

    array.add(C_REQ_TURNON_ROBOT);

    JsonObject param1 = array.createNestedObject();
    param1["id"] = RID;
    param1["power"] = 1;

    String output;
    serializeJson(doc, output);

    socketIOClient.sendEVENT(output);
}

void SocketIOController::turnOffRequest()
{
    DynamicJsonDocument doc(1024);
    JsonArray array = doc.to<JsonArray>();

    array.add(C_REQ_TURNOFF_ROBOT);

    JsonObject param1 = array.createNestedObject();
    param1["id"] = RID;
    param1["power"] = 0;

    String output;
    serializeJson(doc, output);

    socketIOClient.sendEVENT(output);
}

void SocketIOController::controlRobotRequest()
{
    DynamicJsonDocument doc(1024);
    JsonArray array = doc.to<JsonArray>();

    array.add(C_REQ_TURNOFF_ROBOT);

    JsonObject param1 = array.createNestedObject();
    param1["id"] = RID;
    param1["power"] = 1;

    String output;
    serializeJson(doc, output);

    socketIOClient.sendEVENT(output);
}

void SocketIOController::getControlRequest()
{
    DynamicJsonDocument doc(1024);
    JsonArray array = doc.to<JsonArray>();

    array.add(C_REQ_GET_CONTROL);

    JsonObject param1 = array.createNestedObject();
    param1["robotId"] = RID;

    String output;
    serializeJson(doc, output);

    socketIOClient.sendEVENT(output);
}

//! Response Functions
void SocketIOController::turnOnResponse(const char *payload)
{
    Serial.println("Turn On Response Received : ");
    Serial.println(payload);
}

void SocketIOController::turnOffResponse(const char *payload)
{
    Serial.println("Turn Off Response Received: ");
    Serial.println(payload);
}

void SocketIOController::controlRobotResponse(const char *payload)
{
    Serial.println("Control Robot Response Received: ");
    Serial.println(payload);
}

void SocketIOController::getControlResponse(const char *payload)
{
    Serial.println("Get Control Response Received: ");
    Serial.println(payload);
}
