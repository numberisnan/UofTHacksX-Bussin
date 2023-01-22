#include <SPI.h>
#include <RH_RF95.h>
#ifdef ADAFRUIT_FEATHER_M0
#define RFM95_CS 8
#define RFM95_INT 3
#define RFM95_RST 4
#else
#define RFM95_CS 10
#define RFM95_RST 2
#define RFM95_INT 3
#endif
RH_RF95 rf95(RFM95_CS, RFM95_INT);

void setup() {
  // put your setup code here, to run once:
  pinMode(LED_BUILTIN, OUTPUT);
  #ifndef ADAFRUIT_FEATHER_M0
  pinMode(RFM95_RST, OUTPUT);
  digitalWrite(RFM95_RST, HIGH);
  #endif
  Serial.begin(9600);
  // wait for serial port to connect
  while (!Serial);
  if (!rf95.init()) {
    Serial.println("wireless init failed");
  }
}

void loop() {
  // put your main code here, to run repeatedly:
  digitalWrite(LED_BUILTIN, LOW);
  uint8_t buf[RH_RF95_MAX_MESSAGE_LEN];
  uint8_t len = sizeof(buf);

  // receive first
  if (rf95.available()) {
    if (rf95.recv(buf, &len)) {
      digitalWrite(LED_BUILTIN, HIGH);
      Serial.println((char*)buf);
      digitalWrite(LED_BUILTIN, LOW);
    }
  }

  // transmit
  if (Serial.available() > 0) {
    String txStr = Serial.readString();
    txStr.trim();
    char tx[txStr.length() + 1];
    txStr.toCharArray(tx, txStr.length() + 1);
    digitalWrite(LED_BUILTIN, HIGH);
    rf95.send((uint8_t*)tx, sizeof(tx));
    rf95.waitPacketSent();
  }
}
