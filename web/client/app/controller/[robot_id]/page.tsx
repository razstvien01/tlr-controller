"use client";

import { Label } from "@/components/ui/label";
import React, { useCallback, useEffect, useState } from "react";
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

const RobotControllerPage = ({ params }: { params: { robot_id: string } }) => {
  const [controller, setController] = useState<ControllerService | null>(null);
  const [isUseRobot, setIsUseRobot] = useState(false);
  const [controlValuePresent, setControlValuePresent] = useState({
    steer: 0,
    drive: 0,
  });

  const [updateControls, setUpdateControls] = useState(false);

  redirectBackIfUnAuthenticated();

  if (!controller) {
    //* Create the controller only if it's not already created
    const newController = new ControllerService(
      params.robot_id,
      "z5vydzfsluZm0RPqTBVHccrip9i2"
    );
    setController(newController);

    newController.turnOn(params.robot_id);
  }

  // useEffect(() => {
  //   console.log('Controller test', controller);
  //   if (!controller) {
  //     //* Create the controller only if it's not already created
  //     const newController = new ControllerService(
  //       params.robot_id,
  //       "z5vydzfsluZm0RPqTBVHccrip9i2"
  //     );
  //     setController(newController);

  //     newController.turnOn(params.robot_id);
  //   }


  //   return () => { };
  // }, [controller, params.robot_id]);

  // useEffect(() => {
  //   if (controller) {
  //     console.log("Listen for turn on response");
  //     controller.handleTurnOnResponse((data: any) => {
  //       console.log("Turn On Response Received", data);
  //       controller.socket.off("controller/TurnOnRobot/response");
  //     });
  //   }

  //   return () => {
  //     // // Clean up by removing the listener when the component unmounts
  //     // controller.socket.off("controller/TurnOnRobot/response");
  //   };
  // }, [controller]);

  useEffect(() => {
    if (controller) {
      controller.getControl(setControlValuePresent);
    }

    return () => { };
  }, [controller, isUseRobot, updateControls]);

  const useRobot = () => {
    if (controller) {
      setIsUseRobot((prevState) => !prevState);
      stopRobot();
      stopSteerRobot();
      controller.useRobot(!isUseRobot);
      setUpdateControls((prevState) => !prevState);
    }
  };

  const stopRobot = () => {
    if (controller) {
      controller.stopDriveRobot();
      setUpdateControls(!updateControls);
    }
  };

  const driveRobot = () => {
    if (controller) {
      controller.driveRobot();
      setUpdateControls(!updateControls);
    }
  };

  const reverseDriveRobot = () => {
    if (controller) {
      controller.reverseDriveRobot();
      setUpdateControls(!updateControls);
    }
  };

  const steerControlRobot = (isSteerLeft: boolean) => {
    if (controller) {
      if (isSteerLeft) {
        if (controlValuePresent.steer == -1 || controlValuePresent.steer == 0) {
          steerLeftRobot();
        } else {
          console.log("Will agi here");
          stopSteerRobot();
        }
      } else {
        if (controlValuePresent.steer == 1 || controlValuePresent.steer == 0) {
          console.log("Will agi here A");
          steerRightRobot();
        } else {
          console.log("Will agi here B");
          stopSteerRobot();
        }
      }
      setUpdateControls(!updateControls);
    }
  };

  const stopSteerRobot = () => {
    if (controller) {
      controller.stopSteerRobot();
    }
  };
  const steerLeftRobot = () => {
    if (controller) {
      controller.steerLeftRobot();
    }
  };

  const steerRightRobot = () => {
    if (controller) {
      controller.steerRightRobot();
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-col justify-between p-5 items-rigjt">
        <Toggle
          className="text-lg ml-auto mr-4 bg-primary"
          id="toggleUse"
          variant={"outline"}
          size={"lg"}
          onPressedChange={useRobot}
        >
          {isUseRobot ? "Un-Use Robot" : "Use Robot"}
        </Toggle>
      </div>
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
          <h3 className="font-semibold mb-2 text-lg ">Move Camera</h3>

          <Button
            className="mb-3 text-lg border-primary"
            variant="outline"
            size="icon"
          >
            <ChevronUpIcon className="h-4 w-4" />
          </Button>
          <div className="flex flex-row justify-between h-12 text-xl gap-3 mb-3">
            <Button
              className="text-lg border-primary"
              variant="outline"
              size="icon"
            >
              <ChevronLeftIcon className="h-4 w-4" />
            </Button>
            <Button className="text-lg border-primary" variant={"destructive"}>
              Reset
            </Button>
            <Button
              className="text-lg border-primary"
              variant="outline"
              size="icon"
            >
              <ChevronRightIcon className="h-4 w-4" />
            </Button>
          </div>
          <Button
            className="text-lg border-primary"
            variant="outline"
            size="icon"
          >
            <ChevronDownIcon className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex flex-col p-5 items-center">
          <Label className="text-xl font-bold">Current Controls: </Label>
          <Label className="text-lg font-semibold">
            Steer: {controlValuePresent.steer}
          </Label>
          <Label className="text-lg font-semibold">
            Drive: {controlValuePresent.drive}
          </Label>
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

          <Button
            id="drive"
            className="mb-3 text-lg border-primary"
            variant="outline"
            size="icon"
            onClick={() => {
              driveRobot();
            }}
          >
            <ChevronUpIcon className="h-4 w-4" />
          </Button>
          <div className="flex flex-row justify-between h-12 text-xl gap-3 mb-3">
            <Button
              className="text-lg border-primary"
              id="leftSteer"
              variant="outline"
              size="icon"
              onClick={() => {
                // steerLeftRobot();
                steerControlRobot(true);
              }}
            >
              <ChevronLeftIcon className="h-4 w-4" />
            </Button>
            <Button
              className="text-lg border-primary"
              size={"lg"}
              variant={"destructive"}
              onClick={() => {
                stopRobot();
              }}
            >
              Stop
            </Button>
            <Button
              className="text-lg border-primary"
              id="righhtSteer"
              variant="outline"
              size="icon"
              onClick={() => {
                steerControlRobot(false);
              }}
            >
              <ChevronRightIcon className="h-4 w-4" />
            </Button>
          </div>
          <Button
            className="text-lg border-primary"
            id="reverse"
            variant="outline"
            size="icon"
            onClick={() => {
              reverseDriveRobot();
            }}
          >
            <ChevronDownIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RobotControllerPage;
