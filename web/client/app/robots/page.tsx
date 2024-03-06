"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { AddRobotDialog } from "@/components/dialogs/add-robot-dialog";
import Link from "next/link";
import RobotCard from "@/components/robot-card";

export default function Robots() {
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [successAdd, setSuccessAdd] = useState<boolean>(false);
  // Dummy data for robot cards (replace this with your actual data)
  const robotCards = [
    { id: "robot1", name: "Robot 1" },
    { id: "robot2", name: "Robot 2" },
    { id: "robot3", name: "Robot 3" },
    { id: "robot4", name: "Robot 4" },
    { id: "robot5", name: "Robot 5" },
    { id: "robot6", name: "Robot 6" },
  ];
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
            <p className="text-sm text-muted-foreground">List of robotsssss</p>
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
            {robotCards.slice().reverse().map((robot) => (
              <Link key={robot.id} href={`/controller`}>
                <RobotCard/>
              </Link>
            ))}
          </div>
          {/* <ScrollArea>
          <div className="flex space-x-4 pb-4">
            {projects
              ? projects.map((project: any, index: number) => {
                  return (
                    <ProjectCard
                      key={index}
                      project={project}
                      className="w-[350px]"
                      aspectRatio="portrait"
                      width={400}
                      height={200}
                    />
                  );
                })
              : null}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea> */}
        </div>
        <Separator className="my-4" />
      </div>
    </>
  );
}
