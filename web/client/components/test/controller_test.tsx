import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Toggle } from "@/components/ui/toggle";

const socket: Socket = io("http://localhost:5000/");

const ControllerTest = () => {
  const [idInput, setIdInput] = useState("");
  const [userInput, setUserInput] = useState("");
  const [controlValuePresent, setControlValuePresent] = useState("");
  const [isOnRobot, setIsOnRobot] = useState(false);

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

  //* Getting control of the robot
  useEffect(() => {
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

    getControl(idInput, setControlValuePresent);

    return () => {};
  }, [isOnRobot]);

  return (
    <>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="email">Email</Label>
        <Input
          type="text"
          id="id"
          placeholder="Input ID"
          value={idInput}
          onChange={(e) => setIdInput(e.target.value)}
        />
        {/* <Button
          id="TurnOnTest"
          onClick={() => {
            turnOn(idInput);
          }}
        >
          Turn On
        </Button> */}
        <Toggle
          id="ToggleOnOff"
          onPressedChange={() => {
            if (!isOnRobot) turnOn(idInput);
            else turnOff(idInput);

            setIsOnRobot(!isOnRobot);
          }}
        >
          {isOnRobot ? "Turn Off" : "Turn On"}
        </Toggle>
      </div>
    </>
  );
};

export default ControllerTest;
