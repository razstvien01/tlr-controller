#include <Arduino.h>
// #include "socketio_client/socketio_client.h"
#include <ESP8266WiFi.h>

const char* ssid = "HG8145V5_0484D";
const char* password = "PZz6VKmu";
const char* host = "your-flask-backend-hostname";
const uint16_t port = 5000;

// SocketIOClient socketIOClient;

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