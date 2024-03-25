#include <Arduino.h>
#include "socketio_client/socketio_client.h"
#include <ESP8266WiFi.h>

const char* ssid = "YourWiFiSSID";
const char* password = "YourWiFiPassword";
const char* host = "your-flask-backend-hostname";
const uint16_t port = 5000;

SocketIOClient socketIOClient;

void wifiConnect();

void setup() {
  Serial.begin(115200);
  delay(100);
  
}

void loop() {
  
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