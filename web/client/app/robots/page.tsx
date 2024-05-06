"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { AddRobotDialog } from "@/components/dialogs/add-robot-dialog";
import Link from "next/link";
import RobotCard from "@/components/robot-card";
import { getRobots, getRobotsByID } from "@/service/robots.service";
import { RobotDataProps } from "@/configs/types";
import { useUserDataAtom } from "@/hooks/user-data-atom";
import { TPH2 } from "@/components/typography/tp-h2";

export default function Robots() {
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [successAdd, setSuccessAdd] = useState<boolean>(false);
  const [robots, setRobots] = useState<RobotDataProps[]>([]);
  const [userData, setUserData] = useUserDataAtom();

  const fetchRobots = async () => {
    if (userData.user_id) {
      const response = await getRobotsByID(userData.user_id);
      setRobots(response.robot_data);
    }
  };

  useEffect(() => {
    fetchRobots();

    return () => {};
  }, [successAdd, userData.user_id]);

  return (
    <>
      <AddRobotDialog
        showDialog={showDialog}
        setShowDialog={setShowDialog}
        setSuccessAdd={setSuccessAdd}
      />
      <div className="h-full px-4 py-6 lg:px-8 justify-center min-h-screen">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold tracking-tight">
              Robot List
            </h2>
            <p className="text-sm text-muted-foreground">List of robots</p>
          </div>

          <div className="ml-auto mr-4">
            <Button onClick={() => setShowDialog(!showDialog)}>
              <PlusIcon className="mr-2 h-4 w-4" />
              Register a Robot
            </Button>
          </div>
        </div>
        <Separator className="my-4" />

        <div className="relative justify-center items-center">
          <div className="grid grid-cols-4">
            {robots?.length > 0 ? (
              robots?.map((robot: RobotDataProps) => (
                <Link key={robot.robot_id} href={`/controller/${robot.doc_id}`}>
                  <RobotCard robot={robot} />
                </Link>
              ))
            ) : (
              <TPH2>No Robots Found</TPH2>
            )}
          </div>
        </div>
        <Separator className="my-4" />
      </div>
    </>
  );
}
