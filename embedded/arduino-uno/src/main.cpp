#include "controller_constants.h"

#include <ArduinoJson.h>

void setup()
{
  Serial.begin(115200);
  delay(1000);
}


void handleReceivedData()
{
  String line = Serial.readStringUntil('\n');
  
  int values[4];
  int index = 0;
  char lineCopy[256];
  line.toCharArray(lineCopy, sizeof(lineCopy));
  char *token = strtok(lineCopy, ",");

  while (token != NULL)
  {
    values[index++] = atoi(token);
    token = strtok(NULL, ",");
  }

  if (values[0] == 1)
  {
    //* Anhi ka kuha ug data sa steer and drive
    int steer = values[2];
    int drive = values[3];
  }
}

void sendDataToESP(const char* robotStatusInMessage)
{
  JsonDocument doc;
  JsonObject data = doc.to<JsonObject>();
  data["message"] = robotStatusInMessage;
  serializeJson(data, Serial);
  Serial.println();
}

void loop()
{
  sendDataToESP("Natumba ang robot");
  if (Serial.available())
  {
    handleReceivedData();
  }
}