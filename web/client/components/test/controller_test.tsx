import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Toggle } from "@/components/ui/toggle";

const socket: Socket = io("http://localhost:5000/");

const ControllerTest = () => {
  //******************************** HOOKS  ************************************/
  const [idInput, setIdInput] = useState("");
  const [userInput, setUserInput] = useState("");
  const [controlValuePresent, setControlValuePresent] = useState("");
  const [isOnRobot, setIsOnRobot] = useState(false);
  const [isUseRobot, setIsUseRobot] = useState(false);
  const [update, setUpdate] = useState(false);

  //************************ CONTROLLER FUNCTIONS  *****************************/
  async function turnOn(idInput: string) {
    socket.emit("controller/TurnOnRobot/request", { id: idInput });

    socket.on("controller/TurnOnRobot/response", (data: any) => {
      console.log("Turn On Response Received", data);
    });
  }

  async function turnOff(idInput: string) {
    socket.emit("controller/TurnOffRobot/request", { id: idInput });

    socket.on("controller/TurnOffRobot/response", (data: any) => {
      console.log("Turn Off Response received", data);
    });
  }

  async function useRobot(userInput: string, idInput: string, toUse: boolean) {
    socket.emit("controller/UseRobot/request", {
      id: idInput,
      userId: userInput,
      toUse: toUse,
    });

    socket.on("controller/UseRobot/response", (data: any) => {
      console.log("Use Robot received ", data);
    });
  }

  async function steerRightRobot(userInput: string, idInput: string) {
    socket.emit("controller/ControlRobot/request", {
      robotId: idInput,
      userId: userInput,
      drive: null,
      steer: 1,
    });

    socket.on("controller/ControlRobot/response", (data: any) => {
      console.log("Steer Right Robot received ", data);
    });
    
    setUpdate(!update)
  }

  async function steerLeftRobot(userInput: string, idInput: string) {
    socket.emit("controller/ControlRobot/request", {
      robotId: idInput,
      userId: userInput,
      drive: null,
      steer: -1,
    });

    socket.on("controller/ControlRobot/response", (data: any) => {
      console.log("Steer Left Robot received ", data);
    });
    
    setUpdate(!update)
  }

  async function stopSteerRobot(userInput: string, idInput: string) {
    socket.emit("controller/ControlRobot/request", {
      robotId: idInput,
      userId: userInput,
      drive: null,
      steer: 0,
    });

    socket.on("controller/ControlRobot/response", (data: any) => {
      console.log("Stop Steer Robot received ", data);
    });
    
    setUpdate(!update)
  }

  async function driveRobot(userInput: string, idInput: string) {
    socket.emit("controller/ControlRobot/request", {
      robotId: idInput,
      userId: userInput,
      drive: 1,
      steer: null,
    });

    socket.on("controller/ControlRobot/response", (data: any) => {
      console.log("Drive Robot received ", data);
    });
    
    setUpdate(!update)
  }

  async function stopDriveRobot(userInput: string, idInput: string) {
    socket.emit("controller/ControlRobot/request", {
      robotId: idInput,
      userId: userInput,
      drive: 0,
      steer: null,
    });

    socket.on("controller/ControlRobot/response", (data: any) => {
      console.log("Stop Steer Robot received ", data);
    });
    
    setUpdate(!update)
  }

  async function reverseRobot(userInput: string, idInput: string) {
    socket.emit("controller/ControlRobot/request", {
      robotId: idInput,
      userId: userInput,
      drive: -1,
      steer: null,
    });

    socket.on("controller/ControlRobot/response", (data: any) => {
      console.log("Reverse Robot received ", data);
    });
    
    setUpdate(!update)
  }

  async function getControl(idInput: string, setControlStringFunction: any) {
    socket.emit("controller/GetControl/request", {
      robotId: idInput,
    });

    socket.on("controller/GetControl/response", (data: any) => {
      if (data.statusCode == 404) {
        setControlStringFunction(`${idInput} is offline`);
      } else {
        setControlStringFunction(`Steer:${data.Steer}\tDrive:${data.Drive}`);
      }
    });
  }

  //***************************** useEffects ************************************/
  //* Getting control of the robot
  useEffect(() => {
    getControl(idInput, setControlValuePresent);

    return () => {};
  }, [isOnRobot, isUseRobot, update]);

  return (
    // <div className="flex flex-col items-center justify-center h-screen">
    <div>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="robotId">Robot ID</Label>
        <Input
          type="text"
          id="robotId"
          placeholder="Input Robot ID"
          value={idInput}
          onChange={(e) => setIdInput(e.target.value)}
        />
        <Toggle
          id="toggleOnOff"
          onPressedChange={() => {
            if (!isOnRobot) turnOn(idInput);
            else turnOff(idInput);

            setIsOnRobot(!isOnRobot);
          }}
        >
          {isOnRobot ? "Turn Off" : "Turn On"}
        </Toggle>
        <Label htmlFor="userId">User ID</Label>
        <Input
          type="text"
          id="userId"
          placeholder="Input User ID"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
        />
        <Toggle
          id="toggleUse"
          onPressedChange={() => {
            if (!isUseRobot) useRobot(userInput, idInput, !isUseRobot);
            else turnOff(idInput);

            setIsUseRobot(!isUseRobot);
          }}
        >
          {isUseRobot ? "Un-Use Robot" : "Use Robot"}
        </Toggle>
      </div>
      <div className="grid grid-cols-3 gap-4 pt-5">
        <Button
          className="p-4 bg-blue-500 h-50"
          onClick={() => steerLeftRobot(userInput, idInput)}
        >
          Steer Left
        </Button>
        <Button
          className="p-4 bg-blue-500 h-50"
          onClick={() => driveRobot(userInput, idInput)}
        >
          Drive
        </Button>
        <Button
          className="p-4 bg-blue-500 h-50"
          onClick={() => steerRightRobot(userInput, idInput)}
        >
          Steer Right
        </Button>
        <Button
          className="p-4 bg-red-500 h-50"
          onClick={() => stopSteerRobot(userInput, idInput)}
        >
          Stop Steer
        </Button>
        <Button
          className="p-4 bg-red-500 h-50"
          onClick={() => reverseRobot(userInput, idInput)}
        >
          Reverse
        </Button>
        <Button
          className="p-4 bg-red-500 h-50"
          onClick={() => stopDriveRobot(userInput, idInput)}
        >
          Stop Drive
        </Button>
      </div>
      <div className="flex flex-col p-5 items-center">
        <Label className="text-lg">Current Controls: </Label>
        <label className="text-xl font-bold">{controlValuePresent}</label>
      </div>
    </div>
  );
};

export default ControllerTest;
