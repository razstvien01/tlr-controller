"use client";

import { Label } from "@/components/ui/label";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  ChevronRightIcon,
  ChevronUpIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
} from "@radix-ui/react-icons";
import { ControllerService } from "@/service/controller.service";
import { redirectBackIfUnAuthenticated } from "@/utility/utility";
import { Toggle } from "@/components/ui/toggle";

// const controller = new ControllerService();

// TODO -
const RobotControllerPage = ({ params }: { params: { robot_id: string } }) => {
  const [update, setUpdate] = useState<boolean>(false);
  const [isUseRobot, setIsUseRobot] = useState(false);
  const [controller, setController] = useState<ControllerService | null>(null);
  const [isDriveRobot, setIsDriveRobot] = useState(false);

  redirectBackIfUnAuthenticated();

  useEffect(() => {
    if (!controller) {
      // Create the controller only if it's not already created
      const newController = new ControllerService(params.robot_id, "user_id");
      setController(newController);
    }

    return () => {};
  }, [controller, params.robot_id]);

  const useRobot = () => {
    if (controller) {
      setIsUseRobot(!isUseRobot);
      controller.useRobot(!isUseRobot);
    }
  };

  const driveRobot = () => {
    if (controller) {
      setIsDriveRobot(!isDriveRobot);
      if (!isDriveRobot) {
        controller.driveRobot();
      } else controller.stopDriveRobot();
    }
  };

  return (
    <div className="flex flex-col items-center h-screen">
      <div className="flex justify-between bg-slate-500 w-full h-full mr-2 ml-2">
        <div className="w-2/3 border border-black justify-center">
          <h1 className="text-center">ROBOT CAMERA {params.robot_id}</h1>
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
          <Toggle
            id="toggleUse"
            variant={"outline"}
            onPressedChange={() => {
              useRobot();
            }}
          >
            {isUseRobot ? "Un-Use Robot" : "Use Robot"}
          </Toggle>
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
            {/* <Button variant={"destructive"}>
              {isDriveRobot ? "Stop Drive" : "Drive Robot"}
            </Button> */}
            <Toggle
              size={"lg"}
              className="bg-destructive"
              variant={"outline"}
              onPressedChange={() => {
                driveRobot();
              }}
            >
              {isDriveRobot ? "Stop" : "Drive"}
            </Toggle>
            <Button variant="outline" size="icon">
              <ChevronRightIcon className="h-4 w-4" />
            </Button>
          </div>
          <Button variant="outline" size="icon">
            <ChevronDownIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RobotControllerPage;
