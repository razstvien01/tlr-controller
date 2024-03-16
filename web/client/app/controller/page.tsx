import { Label } from "@/components/ui/label";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  ChevronRightIcon,
  ChevronUpIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
} from "@radix-ui/react-icons";
import { TPP } from "@/components/typography/tp-p";
import { TPH2 } from "@/components/typography/tp-h2";

const RobotControllerPage = () => {
  return (
    <div className="flex flex-col items-center h-screen">
      <div className="flex justify-between bg-slate-500 w-full h-full mr-2 ml-2">
        <div className="w-2/3 border border-black justify-center">
          <h1 className="text-center">ROBOT CAMERA</h1>
        </div>
        <div className="w-1/3 border border-black">
          <h1 className="text-center">OPERATOR CAMERA</h1>
        </div>
      </div>
      <div className="flex justify-between w-full p-5">
        <div className="flex flex-col items-center pl-20 mb-2">
          <h3 className="font-semibold mb-2 ">Move Camera</h3>

          <Button className="mb-3" variant="outline" size="icon">
            <ChevronUpIcon className="h-4 w-4" />
          </Button>
          <div className="flex flex-row justify-between h-12 text-xl gap-3 mb-3">
            <Button variant="outline" size="icon">
              <ChevronLeftIcon className="h-4 w-4" />
            </Button>
            <Button variant={"destructive"}>Reset</Button>
            <Button variant="outline" size="icon">
              <ChevronRightIcon className="h-4 w-4" />
            </Button>
          </div>
          <Button variant="outline" size="icon">
            <ChevronDownIcon className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex flex-col p-5 items-center">
          <Label className="text-lg">Current Controls: </Label>
          <label className="text-xl font-bold">Hello world</label>
        </div>
        <div className="flex flex-col p-5 items-center">
          <Label className="text-lg">Robot Status: </Label>
          <label className="text-xl font-bold">Hello world</label>
        </div>
        {/* <div className="flex flex-col p-5 items-center">
          <Label className="text-lg">Current Controls: </Label>
          <label className="text-xl font-bold">Hello world</label>
        </div> */}
        <div className="flex flex-col items-center pr-20 mb-2">
          <h3 className="font-semibold mb-2 ">Move Robot</h3>

          <Button className="mb-3" variant="outline" size="icon">
            <ChevronUpIcon className="h-4 w-4" />
          </Button>
          <div className="flex flex-row justify-between h-12 text-xl gap-3 mb-3">
            <Button variant="outline" size="icon">
              <ChevronLeftIcon className="h-4 w-4" />
            </Button>
            <Button variant={"destructive"}>Stop</Button>
            <Button variant="outline" size="icon">
              <ChevronRightIcon className="h-4 w-4" />
            </Button>
          </div>
          <Button variant="outline" size="icon">
            <ChevronDownIcon className="h-4 w-4" />
          </Button>
        </div>
        {/* <div className="flex flex-col items-center pl-20">
          <h3 className="font-semibold">Move Robot</h3>

          <Button variant="outline" size="icon">
              <ChevronUpIcon className="h-4 w-4" />
            </Button>
          <div className="flex flex-row justify-between h-12 text-xl gap-2">
          <Button variant="outline" size="icon">
              <ChevronLeftIcon className="h-4 w-4" />
            </Button>
            <Button variant={"destructive"}>Stop</Button>
            <Button variant="outline" size="icon">
              <ChevronRightIcon className="h-4 w-4" />
            </Button>
          </div>
          <Button variant="outline" size="icon">
              <ChevronDownIcon className="h-4 w-4" />
            </Button>
        </div> */}
      </div>
      {/* <div className="border border-black p-4">HELLO WORLD</div> */}
    </div>
  );
};

export default RobotControllerPage;
