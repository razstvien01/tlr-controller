import { useState } from "react";
import { io, Socket } from "socket.io-client";

const socket: Socket = io("http://localhost:5000/");

async function turnOn(idInput: string) {
  socket.emit('controller/TurnOnRobot/request', { id: idInput });

  socket.on('controller/TurnOnRobot/response', (data: any) => {
    console.log('Turn On Response received ', data);
  });
}

async function turnOff(idInput: string) {
  socket.emit('controller/TurnOffRobot/request', { id: idInput });

  socket.on('controller/TurnOffRobot/response', (data: any) => {
    console.log('Turn Off Response received ', data);
  });
}

async function useRobot(userInput: string, idInput: string, toUse: boolean) {
  socket.emit('controller/UseRobot/request', {
    id: idInput,
    userId: userInput,
    toUse: toUse
  });

  socket.on('controller/UseRobot/response', (data: any) => {
    console.log('Use Robot received ', data);
  });
}

async function driveRobot(userInput: string, idInput: string) {
  socket.emit('controller/ControlRobot/request', {
    robotId: idInput,
    userId: userInput,
    drive: 1,
    steer: null
  });

  socket.on('controller/ControlRobot/response', (data: any) => {
    console.log('Drive Robot received ', data);
  });
}

async function reverseRobot(userInput: string, idInput: string) {
  socket.emit('controller/ControlRobot/request', {
    robotId: idInput,
    userId: userInput,
    drive: -1,
    steer: null
  });

  socket.on('controller/ControlRobot/response', (data: any) => {
    console.log('Reverse Robot received ', data);
  });
}

async function steerLeftRobot(userInput: string, idInput: string) {
  socket.emit('controller/ControlRobot/request', {
    robotId: idInput,
    userId: userInput,
    drive: null,
    steer: -1
  });

  socket.on('controller/ControlRobot/response', (data: any) => {
    console.log('Steer Left Robot received ', data);
  });
}

async function steerRightRobot(userInput: string, idInput: string) {
  socket.emit('controller/ControlRobot/request', {
    robotId: idInput,
    userId: userInput,
    drive: null,
    steer: 1
  });

  socket.on('controller/ControlRobot/response', (data: any) => {
    console.log('Steer Right Robot received ', data);
  });
}

async function stopSteerRobot(userInput: string, idInput: string) {
  socket.emit('controller/ControlRobot/request', {
    robotId: idInput,
    userId: userInput,
    drive: null,
    steer: 0
  });

  socket.on('controller/ControlRobot/response', (data: any) => {
    console.log('Stop Steer Robot received ', data);
  });
}

async function stopDriveRobot(userInput: string, idInput: string) {
  socket.emit('controller/ControlRobot/request', {
    robotId: idInput,
    userId: userInput,
    drive: 0,
    steer: null
  });

  socket.on('controller/ControlRobot/response', (data: any) => {
    console.log('Stop Steer Robot received ', data);
  });
}

async function getControl(idInput: string, setControlStringFunction: any) {
  socket.emit('controller/GetControl/request', {
    robotId: idInput,
  });

  socket.on('controller/GetControl/response', (data: any) => {
    if (data.statusCode == 404) {
      setControlStringFunction(`${idInput} is offline`);
    } else {
      setControlStringFunction(`Steer:${data.Steer}\tDrive:${data.Drive}`);
    }
  });
}

function ControllerTest() {
  const [idInput, setIdInput] = useState("");
  const [userInput, setUserInput] = useState("");
  const [controlValuePresent, setControlValuePresent] = useState("");

  getControl(idInput, setControlValuePresent);
  return (
    <div>
      <div>
        Input
        <input type="text" value={idInput} onChange={(e) => setIdInput(e.target.value)} />
        <button id="TurnOnTest" onClick={() => {
          turnOn(idInput)
          getControl(idInput, setControlValuePresent)
        }}>Turn On</button>
        <button id="TurnOffTest" onClick={() => {
          turnOff(idInput)
          getControl(idInput, setControlValuePresent)
        }}>Turn Off</button>
      </div>
      <div>
        User Id
        <input type="text" value={userInput} onChange={(e) => setUserInput(e.target.value)} />
        <button onClick={() => {
          useRobot(userInput, idInput, true)
          getControl(idInput, setControlValuePresent);
        }} className="control-button">Use Robot</button>
        <button onClick={() => {
          useRobot(userInput, idInput, false)
          getControl(idInput, setControlValuePresent);
        }} className="control-button">Un-Use Robot</button>
      </div>
      <div>
        <button onClick={() => {
          steerLeftRobot(userInput, idInput)
          getControl(idInput, setControlValuePresent);
        }} className="control-button">Steer Left</button>
        <button onClick={() => {
          steerRightRobot(userInput, idInput)
          getControl(idInput, setControlValuePresent);
        }} className="control-button">Steer Right</button>
        <button onClick={() => {
          stopSteerRobot(userInput, idInput)
          getControl(idInput, setControlValuePresent);
        }} className="control-button">Stop Steer</button>
      </div>
      <div>
        <button onClick={() => {
          driveRobot(userInput, idInput)
          getControl(idInput, setControlValuePresent);
        }} className="control-button">Drive</button>
        <button onClick={() => {
          reverseRobot(userInput, idInput)
          getControl(idInput, setControlValuePresent);
        }} className="control-button">Reverse</button>
        <button onClick={() => {
          stopDriveRobot(userInput, idInput)
          getControl(idInput, setControlValuePresent);
        }} className="control-button">Stop Drive</button>
      </div>
      <div>
        <div>Current Controls</div>
        <p>{controlValuePresent}</p>
      </div>
    </div>
  );

}

export default ControllerTest;