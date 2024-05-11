#define C_RES_TURNON_ROBOT "controller/TurnOnRobot/response"
#define C_RES_TURNOFF_ROBOT "controller/TurnOffRobot/response"
#define C_RES_USE_ROBOT "controller/UseRobot/response"
#define C_RES_CONTROL_ROBOT "controller/ControlRobot/response"
#define C_RES_GET_CONTROL "controller/GetControl/response"

#include <Wire.h>
#include <ArduinoJson.h>
#include <VL53L0X.h>
#include <MPU6050.h>
#include <AccelStepper.h>

#define dirPin 4
#define stepPin 5

StaticJsonDocument<200> doc;
// Constants
const byte clockPin = 11; // Pin 11 (SHCP) of 74HC595
const byte latchPin = 12; // Pin 12 (STCP) of 74HC595
const byte dataPin = 13;  // Pin 14 (DS) of 74HC595

// Needed objects
AccelStepper stepperM3(1, stepPin, dirPin);
VL53L0X vcselU4, vcselU5, vcselU6, vcselU7;
MPU6050 mpuU8;

// Needed global variables
unsigned int operation = 0;
unsigned long timer = 0;
float timeStep = 0.01;
float pitch = 0, roll = 0, yaw = 0;

void setup()
{
  // put your setup code here, to run once:
  Serial.begin(115200);
  Wire.begin();
  for (int i = 2; i <= 13; i++)
  { // set pins 2 to 5 and 9 to 13 as OUTPUT
    if (i >= 6 && i <= 8)
    { // skip pins 6, 7, and 8
      continue;
    }
    pinMode(i, OUTPUT);
  }
  for (int i = A0; i <= A5; i++)
  {
    pinMode(i, INPUT);
  }
  initializeSensors();
}

void loop()
{
  if (Serial.available())
  {
    //* possible received data would be the contol values
    handleReceivedData();
  }

  //* Use this function to send data to the web controller
  //* The data that will be send should be the status of that robot based on the values of the sensors
  sendDataToESP("BLAH BLAH BLAH BLAH");

  // put your main code here, to run repeatedly:
  readVCSELSensors();
  readMPU6050();
  readUltrasonicSensors();
}

void sendDataToESP(const char* message)
{
  JsonObject data = doc.to<JsonObject>();
  data["key"] = "Sensor Info";
  data["message"] = message;
  serializeJson(data, Serial);
  Serial.println();
}

void handleControlEvent(JsonObject payload)
{
  if (!payload.containsKey("statusCode"))
  {
    int drive = payload["Drive"];
    int steer = payload["Steer"];

    //! GET THE ROBOT CONTROLS HERE
    Serial.print("Drive: ");
    Serial.print(drive);
    Serial.print(", Steer: ");
    Serial.println(steer);
  }
}

void handleReceivedData()
{
  String receivedData = Serial.readStringUntil('\n');
  StaticJsonDocument<200> receivedDoc;
  DeserializationError error = deserializeJson(receivedDoc, receivedData);

  if (!error)
  {
    const char *event = receivedDoc[0];
    JsonObject payload = receivedDoc[1];
    
    //* Handling received data events here...
    if (strcmp(event, C_RES_TURNOFF_ROBOT) == 0)
    {
      // Handle turn off robot event
    }
    else if (strcmp(event, C_RES_GET_CONTROL) == 0)
    {
      handleControlEvent(payload);
    }
  }
  else
  {
    Serial.println("JSON Parsing Error");
  }
}

// Functions needed
void updateControl()
{
  digitalWrite(latchPin, LOW);
  // shiftOut(dataPin, clockPin, MSBFIRST, operation>>8); //send upper byte to IC2
  shiftOut(dataPin, clockPin, MSBFIRST, operation); // send lower byte to IC1
  digitalWrite(latchPin, HIGH);
}

// Motors
void forward()
{
  // inputs 1 and 4 HIGH, inputs 2 and 3 LOW
  operation &= ~(0x0F); // clear lowest 4 bits
  operation |= 0x09;    // set bits 0 and 3
  updateControl();
}

void backward()
{
  // inputs 1 and 4 LOW, inputs 2 and 3 HIGH
  operation &= ~(0x0F); // clear lowest 4 bits
  operation |= 0x06;    // set bits 1 and 2
  updateControl();
}

void leftTurn()
{
  // inputs 1 and 3 LOW, inputs 2 and 4 HIGH
  operation &= ~(0x0F); // clear lowest 4 bits
  operation |= 0x0A;    // set bits 1 and 3
  updateControl();
}

void rightTurn()
{
  // inputs 1 and 3 HIGH, inputs 2 and 4 LOW
  operation &= ~(0x0F); // clear lowest 4 bits
  operation |= 0x05;    // set bits 0 and 2
  updateControl();
}

void stopMotors()
{
  // all inputs LOW
  operation &= ~(0x0F); // clear lowest 4 bits
  updateControl();
}

// Setup Sensors
void initializeSensors()
{
  // Initialize U4 to U7 VL53L0X VCSEL Sensors
  operation &= ~(0xF0); // clear bits 4 to 7
  updateControl();
  // keep bit 4 set then clear bits 5 to 7
  bitSet(operation, 4); // only set bit 4
  updateControl();
  vcselU4.setAddress(0x29);
  delay(500);

  bitSet(operation, 5);
  updateControl();
  vcselU5.setAddress(0x2A);
  delay(500);

  bitSet(operation, 6);
  updateControl();
  vcselU6.setAddress(0x2B);
  delay(500);

  bitSet(operation, 7);
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

  // Initialize U8 MPU6050
  Serial.println("Initialize MPU6050");
  while (!mpuU8.begin(MPU6050_SCALE_2000DPS, MPU6050_RANGE_2G))
  {
    Serial.println("Could not find a valid MPU6050 sensor, check wiring!");
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
  Serial.println();

  Serial.print(" * Sleep Mode:        ");
  Serial.println(mpuU8.getSleepEnabled() ? "Enabled" : "Disabled");

  Serial.print(" * Clock Source:      ");
  switch (mpuU8.getClockSource())
  {
  case MPU6050_CLOCK_KEEP_RESET:
    Serial.println("Stops the clock and keeps the timing generator in reset");
    break;
  case MPU6050_CLOCK_EXTERNAL_19MHZ:
    Serial.println("PLL with external 19.2MHz reference");
    break;
  case MPU6050_CLOCK_EXTERNAL_32KHZ:
    Serial.println("PLL with external 32.768kHz reference");
    break;
  case MPU6050_CLOCK_PLL_ZGYRO:
    Serial.println("PLL with Z axis gyroscope reference");
    break;
  case MPU6050_CLOCK_PLL_YGYRO:
    Serial.println("PLL with Y axis gyroscope reference");
    break;
  case MPU6050_CLOCK_PLL_XGYRO:
    Serial.println("PLL with X axis gyroscope reference");
    break;
  case MPU6050_CLOCK_INTERNAL_8MHZ:
    Serial.println("Internal 8MHz oscillator");
    break;
  }

  Serial.print(" * Accelerometer:         ");
  switch (mpuU8.getRange())
  {
  case MPU6050_RANGE_16G:
    Serial.println("+/- 16 g");
    break;
  case MPU6050_RANGE_8G:
    Serial.println("+/- 8 g");
    break;
  case MPU6050_RANGE_4G:
    Serial.println("+/- 4 g");
    break;
  case MPU6050_RANGE_2G:
    Serial.println("+/- 2 g");
    break;
  }

  Serial.print(" * Accelerometer offsets: ");
  Serial.print(mpuU8.getAccelOffsetX());
  Serial.print(" / ");
  Serial.print(mpuU8.getAccelOffsetY());
  Serial.print(" / ");
  Serial.println(mpuU8.getAccelOffsetZ());

  Serial.print(" * Gyroscope:         ");
  switch (mpuU8.getScale())
  {
  case MPU6050_SCALE_2000DPS:
    Serial.println("2000 dps");
    break;
  case MPU6050_SCALE_1000DPS:
    Serial.println("1000 dps");
    break;
  case MPU6050_SCALE_500DPS:
    Serial.println("500 dps");
    break;
  case MPU6050_SCALE_250DPS:
    Serial.println("250 dps");
    break;
  }

  Serial.print(" * Gyroscope offsets: ");
  Serial.print(mpuU8.getGyroOffsetX());
  Serial.print(" / ");
  Serial.print(mpuU8.getGyroOffsetY());
  Serial.print(" / ");
  Serial.println(mpuU8.getGyroOffsetZ());

  Serial.println();
}

// Reading sensors
void readVCSELSensors()
{
  Serial.println("VCSEL Sensor");
  Serial.print("U4: ");
  Serial.print(vcselU4.readRangeContinuousMillimeters());
  Serial.println(" mm");
  Serial.print("U5: ");
  Serial.print(vcselU5.readRangeContinuousMillimeters());
  Serial.println(" mm");
  Serial.print("U6: ");
  Serial.print(vcselU6.readRangeContinuousMillimeters());
  Serial.println(" mm");
  Serial.print("U7: ");
  Serial.print(vcselU7.readRangeContinuousMillimeters());
  Serial.println(" mm");
  Serial.println();
  // delay(200);
}

void readMPU6050()
{
  timer = millis();

  // Vectors
  Vector normAccel = mpuU8.readNormalizeAccel();
  Vector normGyro = mpuU8.readNormalizeGyro();

  // Accelerometer
  Serial.println("MPU6050 U8");
  Serial.println("Linear Acceleration");
  Serial.print("X: ");
  Serial.print(normAccel.XAxis);
  Serial.println(" m/s^2");
  Serial.print("Y: ");
  Serial.print(normAccel.YAxis);
  Serial.println(" m/s^2");
  Serial.print("Z: ");
  Serial.print(normAccel.ZAxis);
  Serial.println(" m/s^2");

  // Gyroscope
  Serial.println("Angular Velocity");
  Serial.print("X: ");
  Serial.print(normGyro.XAxis);
  Serial.println(" deg/s");
  Serial.print("Y: ");
  Serial.print(normGyro.YAxis);
  Serial.println(" deg/s");
  Serial.print("Z: ");
  Serial.print(normGyro.ZAxis);
  Serial.println(" deg/s");

  delay((timeStep * 1000) - (millis() - timer));
}

void readUltrasonicSensors()
{
  Serial.println("Ultrasonic Sensor");
  Serial.print("U9:  ");
  Serial.print(get74HC595DistanceHCSSR04(8, A0));
  Serial.println(" cm");
  Serial.print("U10: ");
  Serial.print(get74HC595DistanceHCSSR04(9, A1));
  Serial.println(" cm");
  Serial.print("U11: ");
  Serial.print(get74HC595DistanceHCSSR04(10, A2));
  Serial.println(" cm");
  Serial.print("U12: ");
  Serial.print(get74HC595DistanceHCSSR04(11, A3));
  Serial.println(" cm");
  Serial.print("U13: ");
  Serial.print(get74HC595DistanceHCSSR04(12, A4));
  Serial.println(" cm");
  Serial.print("U14: ");
  Serial.print(get74HC595DistanceHCSSR04(13, A5));
  Serial.println(" cm");
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
