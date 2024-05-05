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
    // Serial.println("Received JSON: " + receivedData); // Debugging: Print the received JSON string

    StaticJsonDocument<200> receivedDoc;
    DeserializationError error = deserializeJson(receivedDoc, receivedData);
    
    if (!error) {
      // Extract the event and payload
      const char *event = receivedDoc[0];
      JsonObject payload = receivedDoc[1];
      
      // Print the event
      Serial.print("Event: ");
      Serial.println(event);
      
      // for (JsonPair kv : payload) {
      //   const char *key = kv.key().c_str();
      //   const char *value = kv.value().as<const char *>();
        
      //   Serial.print("Key: ");
      //   Serial.print(key);
      // }
    } else {
      Serial.println("JSON Parsing Error");
    }
  }
}