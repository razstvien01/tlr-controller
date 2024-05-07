#include "controller_constants.h"

#include <ArduinoJson.h>

StaticJsonDocument<200> doc;

void setup()
{
  Serial.begin(9600);
  delay(1000);
}

void handleControlEvent(JsonObject payload) {
  if (payload.containsKey("statusCode")) {
    int statusCode = payload["statusCode"];
    Serial.print("Status Code: ");
    Serial.println(statusCode);
  } else {
    int drive = payload["Drive"];
    int steer = payload["Steer"];
    
    Serial.print("Drive: ");
    Serial.print(drive);
    Serial.print(", Steer: ");
    Serial.println(steer);
  }
}

void handleReceivedData() {
  String receivedData = Serial.readStringUntil('\n');
  StaticJsonDocument<200> receivedDoc;
  DeserializationError error = deserializeJson(receivedDoc, receivedData);

  if (!error) {
    const char *event = receivedDoc[0];
    JsonObject payload = receivedDoc[1];

    if (strcmp(event, C_RES_TURNOFF_ROBOT) == 0) {
      // Handle turn off robot event
    } else if (strcmp(event, C_RES_GET_CONTROL) == 0) {
      handleControlEvent(payload);
    }
  } else {
    Serial.println("JSON Parsing Error");
  }
}

void sendDataToESP()
{
  JsonObject data = doc.to<JsonObject>();
  data["key"] = "Sensor Info";
  data["message"] = "BLAH BLAH BLAH BLAH";
  serializeJson(data, Serial);
  Serial.println();
}

void loop()
{
  sendDataToESP();
  if (Serial.available()) {
    handleReceivedData();
  }
}