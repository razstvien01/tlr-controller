#include "controller_constants.h"

#include <ArduinoJson.h>

StaticJsonDocument<200> doc;

void setup()
{

  Serial.begin(9600);
  delay(1000);
}

void sendDataToESP()
{
  JsonObject data = doc.to<JsonObject>();
  data["key"] = "value";
  data["source"] = "arduino";
  serializeJson(data, Serial);
  Serial.println();
}

void loop()
{
  if (Serial.available()) {
    String receivedData = Serial.readStringUntil('\n');
    // Serial.println("Received JSON: " + receivedData);

    StaticJsonDocument<200> receivedDoc;
    DeserializationError error = deserializeJson(receivedDoc, receivedData);
    
    if (!error) {
      //* Extract the event and payload
      const char *event = receivedDoc[0];
      JsonObject payload = receivedDoc[1];
      
      // Serial.print("Event: ");
      // Serial.println(event);
      
      if(strcmp(event, C_RES_TURNOFF_ROBOT) == 0){
        
      }
      else if (strcmp(event, C_RES_GET_CONTROL) == 0) {
        // Serial.println(receivedData);
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
      
    } else {
      Serial.println("JSON Parsing Error");
    }
  }
}