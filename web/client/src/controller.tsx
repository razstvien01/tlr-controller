import axios from "axios";
import { useState } from "react";


async function turnOn(idInput: string) {
  const response = await axios.post("http://localhost:5000/controller/TurnOnRobot", {
    id: idInput
  });

  console.log('Turn on pressed ', idInput);
}

async function turnOff(idInput: string) {
  const response = await axios.post("http://localhost:5000/controller/TurnOffRobot", {
    id: idInput
  });

  console.log('Turn off pressed', idInput)
}

function ControllerTest() {
  const [idInput, setIdInput] = useState("");

  return (
    <div>
      Input
      <input type="text" value={idInput} onChange={(e) => {
        console.log('Text Changed');
        setIdInput(e.target.value);
      }} />
      <button id="TurnOnTest" onClick={() => turnOn(idInput)}>Turn On</button>
      <button id="TurnOffTest" onClick={() => turnOff(idInput)}>Turn Off</button>
    </div>
  );
}

export default ControllerTest;
