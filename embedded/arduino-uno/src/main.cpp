#include <Wire.h>
#include <VL53L0X.h>
#include <MPU6050.h>
// #include <AccelStepper.h>

// #define dirPin  4
// #define stepPin 5

//* Function prototypes
void checkSettings();
double get74HC595DistanceHCSSR04(byte funcTriggerPin, byte funcEchoPin);
void initializeSensors();
void handleReceivedData();
void readVCSELSensors();
void readMPU6050();
void readUltrasonicSensors();
void sendDataToESP(const char *robotStatusInMessage);
void sendInfoToESP(const char *robotStatusInMessage);
void leftTurn();
void rightTurn();
void backward();
void stopMotors();
void forward();

// Constants
const byte clockPin = 11; // Pin 11 (SHCP) of 74HC595
const byte latchPin = 12; // Pin 12 (STCP) of 74HC595
const byte dataPin = 13;  // Pin 14 (DS) of 74HC595

// Needed objects
// AccelStepper stepperM3(1, stepPin, dirPin);
VL53L0X vcselU4, vcselU5, vcselU6, vcselU7;
MPU6050 mpuU8;

// Needed global variables
unsigned int operation = 0;
unsigned long timer = 0;
int steer = 0, drive = 0;
float timeStep = 0.01;
float pitch = 0, roll = 0, yaw = 0;
byte leftS = 100, rightS = 90;
bool stop = false; // Flag to indicate if movement should be stopped

void setup()
{
  // put your setup code here, to run once:
  Serial.begin(115200);
  Serial.println("Initializing...");
  Wire.begin();
  for (int i = 2; i <= 13; i++)
  { // set pins 2 to 5 and 9 to 13 as OUTPUT
    // Serial.println(i);
    if (i >= 6 && i <= 8)
    { // skip pins 6, 7, and 8
      continue;
    }
    pinMode(i, OUTPUT);
  }
  Serial.println("Initializing Inputs...");
  for (int i = A0; i <= A3; i++)
  {
    // Serial.println(i);
    pinMode(i, INPUT);
  }
  initializeSensors();
  // initializeMPU();
  //  stepperM3.setMaxSpeed(1000);
  //  stepperM3.setAcceleration(200);
  //  stepperM3.setCurrentPosition(0);
}

void loop()
{
  readVCSELSensors();
  // readMPU6050();
  // readUltrasonicSensors();

  if (Serial.available())
  {
    handleReceivedData();
  }
}

// Functions needed
void updateControl()
{
  digitalWrite(latchPin, LOW);
  shiftOut(dataPin, clockPin, MSBFIRST, operation >> 8); // send upper byte to IC2
  shiftOut(dataPin, clockPin, MSBFIRST, operation);      // send lower byte to IC1
  // Serial.println(operation);
  digitalWrite(latchPin, HIGH);
}

void setMotorSpeeds(byte leftSPD, byte rightSPD)
{
  analogWrite(9, leftSPD);
  analogWrite(10, rightSPD);
}

// RX/TX
void handleReceivedData() // receives data while in loop
{
  String line = Serial.readStringUntil('\n');
  if (line.length() > 13 || !(line.startsWith("1, 0,") || line.startsWith("1, 1,")))
  {
    return;
  }

  int values[4]; // convert this to a global
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
    //* Data for steer and drive

    drive = values[2]; // values sent
    steer = values[3]; // values sent

    readUltrasonicSensors(); // Check ultrasonic sensors before moving

    if (stop)
    { // If obstacle detected, don't execute movement commands
      stopMotors();
      return;
    }

    switch (steer)
    {
    case -1:
      leftTurn();
      return;
    case 0:
      switch (drive)
      {
      case -1:
        backward();
        break;
      case 0:
        stopMotors();
        break;
      case 1:
        forward();
        break;
      }
      return;
    case 1:
      rightTurn();
      return;
    }
  }
}

void sendInfoToESP(const char *status)
{
  String message = "A , ";
  message += status;
  Serial.println(message);
}

// Motors
void forward()
{
  // no need for full speed
  setMotorSpeeds(leftS, rightS);
  // inputs 1 and 4 HIGH, inputs 2 and 3 LOW
  operation &= ~(0x0F); // clear lowest 4 bits
  operation |= 0x09;    // set bits 0 and 3
  // sendDataToESP("9"); //'9' - Forward
  sendInfoToESP("9"); //'9' - Forward
  updateControl();
}

void backward()
{
  // no need for full speed
  setMotorSpeeds(leftS, rightS);
  // inputs 1 and 4 LOW, inputs 2 and 3 HIGH
  operation &= ~(0x0F); // clear lowest 4 bits
  operation |= 0x06;    // set bits 1 and 2
  sendInfoToESP("1");   //'1' - Reverse
  updateControl();
}

void leftTurn()
{
  // no need for full speed
  setMotorSpeeds(leftS, rightS);
  // inputs 1 and 3 LOW, inputs 2 and 4 HIGH
  operation &= ~(0x0F); // clear lowest 4 bits
  operation |= 0x0A;    // set bits 1 and 3
  sendInfoToESP("2");   //'2' - Left Turn
  updateControl();
}

void rightTurn()
{
  // no need for full speed
  setMotorSpeeds(leftS, rightS);
  // inputs 1 and 3 HIGH, inputs 2 and 4 LOW
  operation &= ~(0x0F); // clear lowest 4 bits
  operation |= 0x05;    // set bits 0 and 2
  sendInfoToESP("3");   //'3' - Right Turn
  updateControl();
}

void stopMotors()
{
  // all inputs LOW
  operation &= ~(0x0F); // clear lowest 4 bits
  sendInfoToESP("0");   //'0' - Stop
  updateControl();
}

// Setup Sensors
void initializeSensors()
{
  Serial.println("Initializing Sensors...");
  // Initialize U4 to U7 VL53L0X VCSEL Sensors
  operation &= ~(0xF0); // clear bits 4 to 7
  updateControl();
  // keep bit 4 set then clear bits 5 to 7
  bitSet(operation, 4); // only set bit 4
  Serial.println("Initializing U4");
  updateControl();
  delay(500);

  bitSet(operation, 5);
  Serial.println("Initializing U5");
  updateControl();
  vcselU5.setAddress(0x2A);
  delay(500);

  bitSet(operation, 6);
  Serial.println("Initializing U6");
  updateControl();
  vcselU6.setAddress(0x2B);
  delay(500);

  bitSet(operation, 7);
  Serial.println("Initializing U7");
  updateControl();
  vcselU7.setAddress(0x2C);
  delay(500);

  vcselU4.init();
  vcselU5.init();
  vcselU6.init();
  vcselU7.init();

  vcselU4.setTimeout(500);
  vcselU5.setTimeout(500);
  vcselU6.setTimeout(500);
  vcselU7.setTimeout(500);

  vcselU4.startContinuous();
  vcselU5.startContinuous();
  vcselU6.startContinuous();
  vcselU7.startContinuous();
}

void initializeMPU()
{
  // Initialize U8 MPU6050
  Serial.println("Initialize MPU6050");
  while (!mpuU8.begin(MPU6050_SCALE_2000DPS, MPU6050_RANGE_2G))
  {
    Serial.println("Could not find a valid MPU6050 sensor, check wiring!");
    sendInfoToESP("-1");
    delay(500);
  }

  // If you want, you can set gyroscope offsets
  // mpu.setGyroOffsetX(155);
  // mpu.setGyroOffsetY(15);
  // mpu.setGyroOffsetZ(15);

  // Calibrate gyroscope. The calibration must be at rest.
  // If you don't want calibrate, comment this line.
  mpuU8.calibrateGyro();

  // Set threshold sensivty. Default 3.
  // If you don't want use threshold, comment this line or set 0.
  mpuU8.setThreshold(3);

  // Check settings
  checkSettings();
}

void checkSettings()
{
  // Serial.println();

  // Serial.print(" * Sleep Mode:        ");
  // Serial.println(mpuU8.getSleepEnabled() ? "Enabled" : "Disabled");

  Serial.print(" * Clock Source:      ");
  switch (mpuU8.getClockSource())
  {
  case MPU6050_CLOCK_KEEP_RESET:
    // Serial.println("Stops the clock and keeps the timing generator in reset");
    break;
  case MPU6050_CLOCK_EXTERNAL_19MHZ:
    // Serial.println("PLL with external 19.2MHz reference");
    break;
  case MPU6050_CLOCK_EXTERNAL_32KHZ:
    // Serial.println("PLL with external 32.768kHz reference");
    break;
  case MPU6050_CLOCK_PLL_ZGYRO:
    // Serial.println("PLL with Z axis gyroscope reference");
    break;
  case MPU6050_CLOCK_PLL_YGYRO:
    // Serial.println("PLL with Y axis gyroscope reference");
    break;
  case MPU6050_CLOCK_PLL_XGYRO:
    // Serial.println("PLL with X axis gyroscope reference");
    break;
  case MPU6050_CLOCK_INTERNAL_8MHZ:
    // Serial.println("Internal 8MHz oscillator");
    break;
  }

  // Serial.print(" * Accelerometer:         ");
  switch (mpuU8.getRange())
  {
  case MPU6050_RANGE_16G:
    // Serial.println("+/- 16 g");
    break;
  case MPU6050_RANGE_8G:
    // Serial.println("+/- 8 g");
    break;
  case MPU6050_RANGE_4G:
    // Serial.println("+/- 4 g");
    break;
  case MPU6050_RANGE_2G:
    // Serial.println("+/- 2 g");
    break;
  }

  // Serial.print(" * Accelerometer offsets: ");
  // Serial.print(mpuU8.getAccelOffsetX());
  // Serial.print(" / ");
  // Serial.print(mpuU8.getAccelOffsetY());
  // Serial.print(" / ");
  // Serial.println(mpuU8.getAccelOffsetZ());

  // Serial.print(" * Gyroscope:         ");
  switch (mpuU8.getScale())
  {
  case MPU6050_SCALE_2000DPS:
    // Serial.println("2000 dps");
    break;
  case MPU6050_SCALE_1000DPS:
    // Serial.println("1000 dps");
    break;
  case MPU6050_SCALE_500DPS:
    // Serial.println("500 dps");
    break;
  case MPU6050_SCALE_250DPS:
    // Serial.println("250 dps");
    break;
  }

  // Serial.print(" * Gyroscope offsets: ");
  // Serial.print(mpuU8.getGyroOffsetX());
  // Serial.print(" / ");
  // Serial.print(mpuU8.getGyroOffsetY());
  // Serial.print(" / ");
  // Serial.println(mpuU8.getGyroOffsetZ());

  // Serial.println();
}

// Reading sensors
void readVCSELSensors()
{
  uint16_t heights[4];
  uint16_t heightInMM;
  // Serial.println("VCSEL Sensor");
  for (int i = 4; i < 8; i++)
  {
    // Serial.print("U");
    // Serial.print(i); // U4 is the first VCSEL sensor
    // Serial.print(": ");
    switch (i)
    {
    case 4:
      heightInMM = vcselU4.readRangeContinuousMillimeters();
      break;
    case 5:
      heightInMM = vcselU5.readRangeContinuousMillimeters();
      break;
    case 6:
      heightInMM = vcselU6.readRangeContinuousMillimeters();
      break;
    case 7:
      heightInMM = vcselU7.readRangeContinuousMillimeters();
      break;
    }
    heights[i - 4] = heightInMM; // i=4 stores at index 0
    // Serial.print(heightInMM);
    // Serial.println(" mm");
  }
  // Serial.println();
  // bool detected = false;
  for (int i = 0; i < 4; i++)
  {
    char *dataVCSEL = "4";
    if (heights[i] > 70 && heights[i] != 65535)
    { // greater than 70mm height from the ground (will still permit driving off ramps)
      dataVCSEL[0] = (char)i + 0x34;
      Serial.print("VCSEL status code: ");
      Serial.println(dataVCSEL);
      sendInfoToESP(dataVCSEL); // 0x34 = '4', 0x35 = '5', 0x36 = '6', 0x37 = '7'
      //'4' - ahead, '5'- behind, '6' - left, '7' - right
    }
  }
  // delay(200);
}

void readUltrasonicSensors()
{
  double distances[4];
  // Serial.println("Ultrasonic Sensor");
  for (int i = 0; i < 4; i++)
  { // 4 ultrasonic sensors
    // Serial.print("U");
    // Serial.print(i + 9); // U9 is the first sensor;
    // if (i == 0)
    // {
    // Serial.print(":  "); // add two spaces after U9's comma to align with rest of output
    // }
    // else
    // {
    // Serial.print(": ");
    // }
    distances[i] = get74HC595DistanceHCSSR04(i + 8, i + A0); // start with bit 8 of shift register chain and Leonardo A0 = pin 18
    // Serial.print(distances[i]);
    // Serial.println(" cm");
  }

  stop = false;

  for (int i = 0; i < 4; i++)
  {
    char *dataUltrasonic = "A";
    if (distances[i] <= 15 && distances[i] != 0)
    { // less than 5 cm distance
      dataUltrasonic[0] = (char)i + 0x41;
      sendInfoToESP(dataUltrasonic); // 0x41 = 'A', 0x42 = 'B', 0x43 = 'C', 0x44 = 'D', 0x45 = 'E', 0x46 = 'F'
      //'A' - ahead, 'B'- behind, 'C' - left, 'D' - right, 'E' - low hanging front, 'F' - low hanging rear

      if (i == 0 && drive == 1)
      { // Front sensor and moving forward
        stopMotors();
        drive = 0;
        Serial.print(distances[i]);
        Serial.println("cm");
        sendInfoToESP("A"); // Indicate stop due to front obstacle
        stop = true;        // Set stop flag
      }
      else if (i == 1 && drive == -1)
      { // Rear sensor and moving backward
        stopMotors();
        Serial.print(distances[i]);
        Serial.println("cm");
        drive = 0;
        sendInfoToESP("B"); // Indicate stop due to rear obstacle
        stop = true;        // Set stop flag
      }
    }
  }
}

double get74HC595DistanceHCSSR04(byte funcTriggerPin, byte funcEchoPin)
{
  // An unsigned long is needed because the numbers produced can be much larger
  // than an int can hold (max value 32,767)
  unsigned long duration; // time taken for echo
  double myDistance;
  // digitalWrite(funcTriggerPin, LOW);
  operation &= ~(0x3F00); // clear bits 8 to 13
  updateControl();

  // A tiny delay 2 millionths of a second
  delayMicroseconds(2);

  // Sets the trigPin HIGH (ACTIVE) for 10 microseconds
  // same as turing the LED on in the blink sketch
  // digitalWrite(funcTriggerPin, HIGH);
  bitSet(operation, funcTriggerPin);
  updateControl();

  // pin stays HIGH (5v) for 10 microseconds to trigger a pulse
  delayMicroseconds(10);

  // Pin taken LOW (0v) after pulse triggered ready for next pulse
  // digitalWrite(funcTriggerPin, LOW);
  bitClear(operation, funcTriggerPin);
  updateControl();

  duration = pulseIn(funcEchoPin, HIGH);

  myDistance = duration * 0.34 / 20; // 2000 for m, 20 for cm, 2 for mm
  return myDistance;
}

void readMPU6050()
{
  timer = millis();

  // Vectors
  Vector normAccel = mpuU8.readNormalizeAccel();
  Vector normGyro = mpuU8.readNormalizeGyro();

  // Accelerometer
  // Serial.println("MPU6050 U8");
  // Serial.println("Linear Acceleration");
  // Serial.print("X: ");
  // Serial.print(normAccel.XAxis);
  // Serial.println(" m/s^2");
  // Serial.print("Y: ");
  // Serial.print(normAccel.YAxis);
  // Serial.println(" m/s^2");
  // Serial.print("Z: ");
  // Serial.print(normAccel.ZAxis);
  // Serial.println(" m/s^2");

  // Gyroscope
  // Serial.println("Angular Velocity");
  // Serial.print("X: ");
  // Serial.print(normGyro.XAxis);
  // Serial.println(" deg/s");
  // Serial.print("Y: ");
  // Serial.print(normGyro.YAxis);
  // Serial.println(" deg/s");
  // Serial.print("Z: ");
  // Serial.print(normGyro.ZAxis);
  // Serial.println(" deg/s");

  if (normAccel.ZAxis < 7.7)
  {                     // less than 7.7 m/s^2 here on Earth
    sendInfoToESP("Z"); //'Z' - indicates gravitational acceleration is no longer on Z Axis
  }

  // delay((timeStep * 1000) - (millis() - timer));
}

// #include "controller_constants.h"

// #include <ArduinoJson.h>

// void setup()
// {
//   Serial.begin(115200);
//   delay(1000);
// }

// void handleReceivedData()
// {
//   String line = Serial.readStringUntil('\n');

//   int values[4];
//   int index = 0;
//   char lineCopy[256];
//   line.toCharArray(lineCopy, sizeof(lineCopy));
//   char *token = strtok(lineCopy, ",");

//   while (token != NULL)
//   {
//     values[index++] = atoi(token);
//     token = strtok(NULL, ",");
//   }

//   if (values[0] == 1)
//   {
//     //* Anhi ka kuha ug data sa steer and drive
//     int drive = values[2];
//     int steer = values[3];

//     Serial.print("Steer: ");
//     Serial.print(steer);
//     Serial.print(", Drive: ");
//     Serial.println(drive);

//   }
// }

// void sendInfoToESP(const char *status)
// {
//   String message = "1 : ";
//   message += status;
//   Serial.println(message);
// }

// void loop()
// {
//   //* Use this function to send the robot status to the web app
//   // sendInfoToESP("A"); //! 'A'
//   if (Serial.available())
//   {
//     handleReceivedData();
//   }
// }
