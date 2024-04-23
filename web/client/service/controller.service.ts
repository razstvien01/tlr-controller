import { Dispatch, SetStateAction } from "react";
import { Socket, io } from "socket.io-client";

export class ControllerService {
  private _socketURL: string | undefined;
  private _robotId: string | undefined;
  private _socket: Socket | undefined;
  private _userId: string | undefined;

  constructor(robotId: string, userId: string) {
    this.socketURL = process.env.NEXT_PUBLIC_SOCKET_URL;
    if (!this.socketURL) {
      throw new Error(
        "NEXT_PUBLIC_SOCKET_URL is not defined in the environment variables."
      );
    }
    this._socket = io(this.socketURL);
    this._robotId = robotId;
    this._userId = userId;

    // this.turnOn(this._robotId);
    console.log("Robot ID: " +  this._robotId)
    console.log("User ID: " + this._userId)
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
    this.socket.off("controller/TurnOnRobot/response");

    this.socket.emit("controller/TurnOnRobot/request", { id: robot_id });

    this.socket.on("controller/TurnOnRobot/response", (data: any) => {
      console.log("Turn On Response Received", data);
    });
  }

  public turnOff(idInput: string) {
    this.socket.off("controller/TurnOffRobot/response");

    this.socket.emit("controller/TurnOffRobot/request", { id: idInput });

    this.socket.on("controller/TurnOffRobot/response", (data: any) => {
      console.log("Turn Off Response received", data);
    });
  }

  public useRobot(isUseRobot: boolean): void {
    this.socket.off("controller/UseRobot/response");
    this.socket.emit("controller/UseRobot/request", {
      id: this._robotId,
      userId: this._userId,
      toUse: isUseRobot,
    });

    this.socket.on("controller/UseRobot/response", (data: any) => {
      if (isUseRobot) console.log("Use Robot received ", data);
      else console.log("Un-Use Robot received ", data);
    });
  }

  public driveRobot() {
    this.socket.off("controller/ControlRobot/response");

    this.socket.emit("controller/ControlRobot/request", {
      robotId: this._robotId,
      userId: this._userId,
      drive: 1,
      steer: null,
    });

    this.socket.on("controller/ControlRobot/response", (data: any) => {
      console.log("Drive Robot received ", data);
    });
  }

  public stopDriveRobot() {
    this.socket.off("controller/ControlRobot/response");

    this.socket.emit("controller/ControlRobot/request", {
      robotId: this._robotId,
      userId: this._userId,
      drive: 0,
      steer: null,
    });

    this.socket.on("controller/ControlRobot/response", (data: any) => {
      console.log("Stop Drive Robot received ", data);
    });
  }

  public reverseDriveRobot() {
    this.socket.off("controller/ControlRobot/response");

    this.socket.emit("controller/ControlRobot/request", {
      robotId: this._robotId,
      userId: this._userId,
      drive: -1,
      steer: null,
    });
    this.socket.on("controller/ControlRobot/response", (data: any) => {
      console.log("Reverse Robot received ", data);
    });
  }

  public steerRightRobot() {
    this.socket.off("controller/ControlRobot/response");

    this.socket.emit("controller/ControlRobot/request", {
      robotId: this._robotId,
      userId: this._userId,
      drive: null,
      steer: 1,
    });

    this.socket.on("controller/ControlRobot/response", (data: any) => {
      console.log("Steer Right Robot received ", data);
    });
  }

  public steerLeftRobot() {
    this.socket.off("controller/ControlRobot/response");

    this.socket.emit("controller/ControlRobot/request", {
      robotId: this._robotId,
      userId: this._userId,
      drive: null,
      steer: -1,
    });

    this.socket.on("controller/ControlRobot/response", (data: any) => {
      console.log("Steer Left Robot received ", data);
    });
  }

  public stopSteerRobot() {
    this.socket.off("controller/ControlRobot/response");

    this.socket.emit("controller/ControlRobot/request", {
      robotId: this._robotId,
      userId: this._userId,
      drive: null,
      steer: 0,
    });

    this.socket.on("controller/ControlRobot/response", (data: any) => {
      console.log("Stop Steer Robot received ", data);
    });
  }

  public getControl(
    setControl: Dispatch<SetStateAction<{ steer: number; drive: number }>>
  ) {
    this.socket.off("controller/GetControl/response");

    this.socket.emit("controller/GetControl/request", {
      robotId: this._robotId,
    });

    this.socket.on("controller/GetControl/response", (data: any) => {
      if (data.statusCode === 404) {
        setControl({ steer: 0, drive: 0 }); // Set default values
      } else {
        const controlObject = { steer: data.Steer, drive: data.Drive };
        setControl(controlObject);
      }
    });
  }
}
