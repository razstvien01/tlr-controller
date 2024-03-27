#ifndef HELPER_H
#define HELPER_H

#include <Arduino.h>
#include <Firebase_ESP_Client.h>
#include "secrets/secrets.h"

// Declare FirebaseData variable
extern FirebaseData firebaseData;
extern FirebaseAuth auth;
extern FirebaseConfig config;

// Function prototypes
void initFirebase();
void updateRobotStatus(const char* robotId, bool status);

#endif
