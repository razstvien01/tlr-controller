import { RobotDataProps } from "@/configs/types";
import { Dispatch, SetStateAction } from "react";
import { Socket, io } from "socket.io-client";

export class ControllerService {
  private _socketURL: string | undefined;
  private _robotId: string | undefined;
  private _socket: Socket | undefined;
  private _userId: string | undefined;
  private _messages: string[] = [];

  constructor(robotId: string, userId: string) {
    this.socketURL = process.env.NEXT_PUBLIC_SOCKET_URL;
    if (!this.socketURL) {
      throw new Error(
        "NEXT_PUBLIC_SOCKET_URL is not defined in the environment variables."
      );
    }
    this._socket = io(this.socketURL, {
      transports: ["websocket", "polling", "flashsocket"],
    });

    this._robotId = robotId;
    this._userId = userId;

    this.socket.on("/", (data: any) => {
      this.addMessage("Connected to the server. " + JSON.stringify(data));
    });

    this.socket.on("controller/TurnOnRobot/response", (data: any) => {
      this.addMessage("Turn On Response Received: " + JSON.stringify(data));
    });

    this.socket.on("sensor/SensorInfo/response", (data: any) => {
      this.addMessage("Sensor Info Response Received: " + JSON.stringify(data));
    });

    this.socket.on("controller/TurnOffRobot/response", (data: any) => {
      this.addMessage("Turn Off Response Received: " + JSON.stringify(data));
    });

    this.socket.on("controller/UseRobot/response", (data: any) => {
      this.addMessage("Use Robot Response Received: " + JSON.stringify(data));
    });

    this.socket.on("controller/ControlRobot/response", (data: any) => {
      this.addMessage(
        "Control Robot Response Received: " + JSON.stringify(data)
      );
    });

    this.socket.on("controller/OnOffInfo/response", (data: any) => {
      this.addMessage("Power Robot Response Received: " + JSON.stringify(data));
    });
  }

  private addMessage(message: string) {
    if (this._messages.length >= 50) this._messages.shift();
    this._messages.push(message);
  }

  public getMessages(): string[] {
    return this._messages;
  }

  public getContolResponseOff() {
    this.socket.off("controller/GetControl/response");
  }

  public getSensorInfoOff() {
    this.socket.off("sensor/SensorInfo/response");
  }

  public setRobotPowerInfoResponse(
    setPower: Dispatch<SetStateAction<boolean>>
  ) {
    this.socket.on("controller/OnOffInfo/response", (data: any) => {
      this.addMessage("Power Robot received: " + JSON.stringify(data));
      if (data.statusCode !== 404 && data.Power && data.Power == 1) {
        setPower(true);
      } else {
        setPower(false);
      }
    });
  }

  public setGetSensorInfoResponse(
    robot: RobotDataProps,
    setRobot: Dispatch<SetStateAction<RobotDataProps>>
  ) {
    this.socket.on("sensor/SensorInfo/response", (data: any) => {
      this.addMessage("Sensor Info received: " + JSON.stringify(data));
      if (data.statusCode !== 404 && data.Message !== "" && data.Message) {
        setRobot({ ...robot, sensor_info: data.Message });
      }
    });
  }

  public setGetControlResponse(
    setControl: Dispatch<SetStateAction<{ steer: number; drive: number }>>
  ) {
    this.socket.on("controller/GetControl/response", (data: any) => {
      this.addMessage("Retrieved Control: " + JSON.stringify(data));
      if (data.statusCode === 404) {
        setControl({ steer: 0, drive: 0 }); // Set default values
      } else {
        const controlObject = { steer: data.Steer, drive: data.Drive };
        setControl(controlObject);
      }
    });
  }

  public get socketURL(): string | undefined {
    return this._socketURL;
  }

  public set socketURL(url: string | undefined) {
    this._socketURL = url;
  }

  public get socket() {
    return this._socket!;
  }

  public turnOn(robot_id: string) {
    this.socket.emit("controller/TurnOnRobot/request", { id: robot_id });
  }

  public turnOff(idInput: string) {
    this.socket.emit("controller/TurnOffRobot/request", { id: idInput });
  }

  public handleTurnOnResponse(callback: (data: any) => void): void {
    this.socket.on("controller/TurnOnRobot/response", callback);
  }

  public useRobot(isUseRobot: boolean): void {
    this.socket.emit("controller/UseRobot/request", {
      id: this._robotId,
      userId: this._userId,
      toUse: isUseRobot,
    });
  }

  public driveRobot() {
    this.socket.emit("controller/ControlRobot/request", {
      robotId: this._robotId,
      userId: this._userId,
      drive: 1,
      steer: null,
    });
  }

  public stopDriveRobot() {
    this.socket.emit("controller/ControlRobot/request", {
      robotId: this._robotId,
      userId: this._userId,
      drive: 0,
      steer: null,
    });
  }

  public reverseDriveRobot() {
    this.socket.emit("controller/ControlRobot/request", {
      robotId: this._robotId,
      userId: this._userId,
      drive: -1,
      steer: null,
    });
  }

  public steerRightRobot() {
    this.socket.emit("controller/ControlRobot/request", {
      robotId: this._robotId,
      userId: this._userId,
      drive: null,
      steer: 1,
    });
  }

  public steerLeftRobot() {
    this.socket.emit("controller/ControlRobot/request", {
      robotId: this._robotId,
      userId: this._userId,
      drive: null,
      steer: -1,
    });
  }

  public stopSteerRobot() {
    this.socket.emit("controller/ControlRobot/request", {
      robotId: this._robotId,
      userId: this._userId,
      drive: null,
      steer: 0,
    });
  }

  public getControl() {
    this.socket.emit("controller/GetControl/request", {
      robotId: this._robotId,
    });
  }
  public getSensorInfo() {
    this.socket.emit("sensor/SensorInfo/request", {
      robot_id: this._robotId,
    });
  }
  public getPowerInfo() {
    this.socket.emit("controller/OnOffInfo/request", {
      robot_id: this._robotId,
    });
  }
}
