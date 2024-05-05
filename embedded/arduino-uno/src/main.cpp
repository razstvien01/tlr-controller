#include <ArduinoJson.h>

StaticJsonDocument<200> doc;

void setup()
{

  Serial.begin(9600);
  delay(1000);
}

void sendDataToESP()
{
  // Create and populate the JSON data
  JsonObject data = doc.to<JsonObject>();
  data["key"] = "value";      // Add your JSON data here
  data["source"] = "arduino"; // Add the source information
  serializeJson(data, Serial);
  Serial.println(); // Add a newline to indicate the end of JSON data
}

void loop()
{
  sendDataToESP(); // Send JSON data to the ESP every 5 seconds

  if (Serial.available())
  {
    // Process incoming data from the ESP
    deserializeJson(doc, Serial);
    const char *key = doc["key"];
    if (key)
    {
      // Print the received key
      Serial.print("Received key: ");
      Serial.println(key);

      // Check if the data is received from the ESP
      const char *source = doc["source"];
      if (source && strcmp(source, "esp") == 0)
      {
        Serial.println("Data received from ESP8266");
      }
    }
  }

  delay(1000); // Delay for 5 seconds before sending the next JSON data
}
