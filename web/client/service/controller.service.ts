import { SetStateAction, useEffect } from "react";
import { Socket, io } from "socket.io-client";

type UpdateFunction = (update: boolean) => void;

export class ControllerService {
  private _socketURL: string | undefined;
  private _robotId: string | undefined;
  private _socket: Socket | undefined;
  private _userId: string | undefined
  constructor(robotId: string, userId: string) {
    this.socketURL = process.env.NEXT_PUBLIC_SOCKET_URL;
    if (!this.socketURL) {
      throw new Error(
        "NEXT_PUBLIC_SOCKET_URL is not defined in the environment variables."
      );
    }
    this._socket = io(this.socketURL);
    this._robotId = robotId;
    this._userId = userId
    
    this.turnOn(this._robotId)
  }

  public get socketURL(): string | undefined {
    return this._socketURL;
  }

  public set socketURL(url: string | undefined) {
    this._socketURL = url;
  }

  private get socket() {
    return this._socket!;
  }

  public async turnOn(idInput: string) {
    this.socket.off("controller/TurnOnRobot/response");

    this.socket.emit("controller/TurnOnRobot/request", { id: idInput });

    this.socket.on("controller/TurnOnRobot/response", (data: any) => {
      console.log("Turn On Response Received", data);
    });
  }

  public async turnOff(idInput: string) {
    this.socket.off("controller/TurnOffRobot/response");

    this.socket.emit("controller/TurnOffRobot/request", { id: idInput });

    this.socket.on("controller/TurnOffRobot/response", (data: any) => {
      console.log("Turn Off Response received", data);
    });
  }

  public useRobot(
    // userInput: string,
    // idInput: string,
    isUseRobot: boolean,
    update: boolean,
    setUpdate: UpdateFunction
  ): void {
    useEffect(() => {
      
      console.log(this._robotId)
      console.log(this._userId)
      console.log(isUseRobot)
      this.socket.emit("controller/UseRobot/request", {
        id: this._robotId,
        userId: this._userId,
        toUse: isUseRobot,
      });

      this.socket.on("controller/UseRobot/response", (data: any) => {
        console.log("Use Robot received ", data);
      });
      // }

      return () => {
        setUpdate(!update);
        // Clean up socket event listeners if needed
        this.socket.off("controller/UseRobot/response");
      };
    }, [isUseRobot]);
  }
}
