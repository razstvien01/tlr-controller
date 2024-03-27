
#include <Arduino.h>
#include <ESP8266WiFi.h>
// #include <ESP8266>
// #include <Firebase_ESP_Client.h>
#include <Firebase_ESP_Client.h>
#include "secrets/secrets.h"

const char* ssid = WIFI_SSID;
const char* password = WIFI_PASSWORD;
const char* host = BACKEND_HOST;
const uint16_t port = PORT;

FirebaseData firebaseData;

void wifiConnect();

void setup() {
  Serial.begin(9600);
  delay(100);
  
  wifiConnect();
}

void loop() {
  // Serial.read => software
  Serial.println("Hello world");
  delay(1000);
  
}

void wifiConnect(){
  WiFi.begin(ssid, password);
  while(WiFi.status() != WL_CONNECTED){
    delay(1000);;
    Serial.println("Connecting to WiFi...");
  }
  
  Serial.println("Connected to WiFi!");
  
  // Initializee and connect socket.io client
}