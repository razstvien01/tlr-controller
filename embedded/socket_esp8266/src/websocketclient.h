#ifndef WEBSOCKETCLIENT_H
#define WEBSOCKETCLIENT_H

#include <WiFiClient.h>

class WebSocketCLient
{
public:
  WebSocketCLient(bool secure = false);

  ~WebSocketCLient();

  bool connect(String host, String path, int port);

  bool isConnect();

  void disconnet();

  void send(const String &str);

  bool getMessage(String &message);

  void setAuthrizationHeader(String header);

private:
  int timeRead();

  void write(uint8_t data);

  void write(const char *str);

  String generateKey();

  WiFiClient *client;

  String authorizeHeader = "";

  bool websocketEstablished = false;
};

#endif