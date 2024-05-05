#include <Arduino.h>

void setup(){
  Serial.begin(9600);
}

void loop() {
  Serial.println("Hello from Arduino");
  
  if(Serial.available()){
    String data = Serial.readStringUntil('\n');
    Serial.print("Received from esp8266: ");
    Serial.println(data);
  }
  delay(5000);
}
