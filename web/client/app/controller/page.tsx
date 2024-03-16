import { Label } from "@/components/ui/label";
import React from "react";

const RobotControllerPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-10">
      <div className="flex justify-between bg-slate-500 w-full mb-4">
        <div className="w-2/3 border border-black h-96 mr-2 justify-center">
          <h1 className="text-center">ROBOT CAMERA</h1>
        </div>
        <div className="w-1/3 border border-black h-96 ml-2">
          <h1 className="text-center">OPERATOR CAMERA</h1>
        </div>
      </div>
      <div className="flex justify-between w-full mb-4">
        <div className="flex flex-col items-center">
          <button className="w-12 h-12 text-xl mb-2">▲</button>
          <div className="flex justify-between w-24">
            <button className="w-8 h-8">◄</button>
            <button className="w-8 h-8">►</button>
          </div>
          <button className="w-12 h-12 mt-2">▼</button>
          <button className="mt-4">Reset</button>
        </div>
        <div className="flex flex-col p-5 items-center">
          <Label className="text-lg">Current Controls: </Label>
          <label className="text-xl font-bold">Hello world</label>
        </div>
        <div className="flex flex-col items-center">
          <button className="w-12 h-12 text-xl mb-2">▲</button>
          <div className="flex justify-between w-24">
            <button className="w-8 h-8">◄</button>
            <button className="w-8 h-8">►</button>
          </div>
          <button className="w-12 h-12 mt-2">▼</button>
          <button className="mt-4">Stop</button>
        </div>
      </div>
      {/* <div className="border border-black p-4">HELLO WORLD</div> */}
    </div>
  );
};

export default RobotControllerPage;
