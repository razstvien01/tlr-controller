"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { AddRobotDialog } from "@/components/dialogs/add-robot-dialog";
import Link from "next/link";
import RobotCard from "@/components/robot-card";
import { getRobots } from "@/service/robots.service";
import { RobotDataProps } from "@/configs/types";
import { RobotDataInit } from "@/configs/init";

export default function Robots() {
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [successAdd, setSuccessAdd] = useState<boolean>(false);
  const [robots, setRobots] = useState<RobotDataProps[]>([])
  
  const fetchRobots = async () =>{
    const response = await getRobots()
    setRobots(response.robot_data)
  }
  
  useEffect(() => {
    fetchRobots()
  
    return () => {
      
    }
  }, [successAdd])
  
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
            {robots.map((robot: RobotDataProps) => (
              <Link key={robot.robot_id} href={`/controller/${robot.doc_id}`}>
                <RobotCard robot={robot}/>
              </Link>
            ))}
          </div>
        </div>
        <Separator className="my-4" />
      </div>
    </>
  );
}
