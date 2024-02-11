import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const socket: Socket = io("http://localhost:5000/");

const ControllerTest = () => {
  const [idInput, setIdInput] = useState("");
  const [userInput, setUserInput] = useState("");
  const [controlValuePresent, setControlValuePresent] = useState("");
  
  async function turnOn(idInput: string) {
    socket.emit("controller/TurnOnRobot/request", { id: idInput });

    socket.on("controller/TurnOnRobot/response", (data: any) => {
      console.log("Turn On Response Received", data);
    });
  }

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
    
    getControl(idInput, setControlValuePresent)

    return () => {};
  }, []);

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
        <Button
          id="TurnOnTest"
          onClick={() => {
            turnOn(idInput);
          }}
        >
          Turn On
        </Button>
      </div>
    </>
  );
};

export default ControllerTest;
