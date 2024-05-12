#include "controller_constants.h"

#include <ArduinoJson.h>

StaticJsonDocument<200> doc;
bool toggleTest = true;

void setup()
{
  Serial.begin(9600);
  delay(1000);
}

bool isFormatCorrect(const String &str)
{
  char buffer[50];

  sprintf(buffer, "%d, %d, %d, %d", str.toInt(), str.toInt(), str.toInt(), str.toInt());

  return strcmp(buffer, str.c_str()) == 0;
}

void handleReceivedData()
{
  String line = Serial.readStringUntil('\n');
  // Serial.println("Received data: " + line);

  // if (!isFormatCorrect(line))
  // {
  //   // Data is not in the expected format. Not handling.
  //   Serial.println("Not Correct format");
  //   return;
  // }

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
    int steer = values[2];
    int drive = values[3];
    
    Serial.print("Drive ");
    Serial.print(steer);
    Serial.print(", Steer ");
    Serial.println(drive);
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
  // sendDataToESP();
  if (Serial.available())
  {
    handleReceivedData();
  }
}