#include "helper.h"

// Initialize Firebase
FirebaseData firebaseData;

void initFirebase()
{
  // Assign the project host and api key (required)
  config.host = FIREBASE_HOST;
  config.api_key = FIREBASE_AUTH;

  // Initialize the library with the Firebase auth and config.
  Firebase.begin(&config, &auth);
}
// void updateRobotStatus(const char *robotId, bool status)
// {
//   String path = String("robots/") + robotId + "/status";
//   if (Firebase.setBool(firebaseData, path.c_str(), status))
//   {
//     Serial.println("Robot status updated successfully");
//   }
//   else
//   {
//     Serial.println("Error updating robot status: " + firebaseData.errorReason());
//   }
// }