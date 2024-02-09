import axios from "axios";
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
  await axios.post("http://localhost:5000/controller/RPC", {
    jsonrpc: '2.0',
    method: 'control',
    params: [idInput, userInput, 1, null],
    id: 1,
  });
}

async function reverseRobot(userInput: string, idInput: string) {
  await axios.post("http://localhost:5000/controller/RPC", {
    jsonrpc: '2.0',
    method: 'control',
    params: [idInput, userInput, -1, null],
    id: 1,
  });
}

async function steerLeftRobot(userInput: string, idInput: string) {
  await axios.post("http://localhost:5000/controller/RPC", {
    jsonrpc: '2.0',
    method: 'control',
    params: [idInput, userInput, null, -1],
    id: 1,
  });
}

async function steerRightRobot(userInput: string, idInput: string) {
  await axios.post("http://localhost:5000/controller/RPC", {
    jsonrpc: '2.0',
    method: 'control',
    params: [idInput, userInput, null, 1],
    id: 1,
  });
}

async function stopSteerRobot(userInput: string, idInput: string) {
  await axios.post("http://localhost:5000/controller/RPC", {
    jsonrpc: '2.0',
    method: 'control',
    params: [idInput, userInput, null, 0],
    id: 1,
  });
}

async function stopDriveRobot(userInput: string, idInput: string) {
  await axios.post("http://localhost:5000/controller/RPC", {
    jsonrpc: '2.0',
    method: 'control',
    params: [idInput, userInput, 0, null],
    id: 1,
  });
}

async function getControl(idInput: string, setControlStringFunction: any) {
  const response = await axios.post("http://localhost:5000/controller/RPC", {
    jsonrpc: '2.0',
    method: '//getControl',
    params: [idInput],
    id: 1,
  });

  if (response.data.error && response.data.error.code == -32603) {
    setControlStringFunction(`${idInput} is offline`);
  } else {
    setControlStringFunction(`Steer:${response.data.result.Steer}\tDrive:${response.data.result.Drive}`);
  }

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
          //getControl(idInput, setControlValuePresent)
        }}>Turn On</button>
        <button id="TurnOffTest" onClick={() => {
          turnOff(idInput)
          //getControl(idInput, setControlValuePresent)
        }}>Turn Off</button>
      </div>
      <div>
        User Id
        <input type="text" value={userInput} onChange={(e) => setUserInput(e.target.value)} />
        <button onClick={() => {
          useRobot(userInput, idInput, true)
          //getControl(idInput, setControlValuePresent);
        }} className="control-button">Use Robot</button>
        <button onClick={() => {
          useRobot(userInput, idInput, false)
          //getControl(idInput, setControlValuePresent);
        }} className="control-button">Un-Use Robot</button>
      </div>
      <div>
        <button onClick={() => {
          steerLeftRobot(userInput, idInput)
          //getControl(idInput, setControlValuePresent);
        }} className="control-button">Steer Left</button>
        <button onClick={() => {
          steerRightRobot(userInput, idInput)
          //getControl(idInput, setControlValuePresent);
        }} className="control-button">Steer Right</button>
        <button onClick={() => {
          stopSteerRobot(userInput, idInput)
          //getControl(idInput, setControlValuePresent);
        }} className="control-button">Stop Steer</button>
      </div>
      <div>
        <button onClick={() => {
          driveRobot(userInput, idInput)
          //getControl(idInput, setControlValuePresent);
        }} className="control-button">Drive</button>
        <button onClick={() => {
          reverseRobot(userInput, idInput)
          //getControl(idInput, setControlValuePresent);
        }} className="control-button">Reverse</button>
        <button onClick={() => {
          stopDriveRobot(userInput, idInput)
          //getControl(idInput, setControlValuePresent);
        }} className="control-button">Stop</button>
      </div>
      <div>
        <div>Current Controls</div>
        <p>{controlValuePresent}</p>
      </div>
    </div>
  );

}

export default ControllerTest;
