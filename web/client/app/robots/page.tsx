import React from "react";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export default function Robots() {
  // Dummy data for robot cards (replace this with your actual data)
  const robotCards = [
    { id: "robot1", name: "Robot 1" },
    { id: "robot2", name: "Robot 2" },
    { id: "robot3", name: "Robot 3" },
  ];
  return (
    <div className="h-full px-4 py-6 lg:px-8 items-center min-h-screen">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight">Robot List</h2>
          <p className="text-sm text-muted-foreground">List of robotsssss</p>
        </div>

        <div className="ml-auto mr-4">
          <Button
          // onClick={() => setShowDialog(!showDialog)}
          >
            <PlusIcon className="mr-2 h-4 w-4" />
            Register a Robot
          </Button>
        </div>
      </div>
      <Separator className="my-4" />

      <div className="relative">
        <div className="grid grid-cols-2 gap-4">
          {robotCards.map((robot) => (
            <Link key={robot.id} href={`/controller`}>
              <div className="border p-4 rounded-md hover:bg-primary transition">
                <h2 className="text-xl font-bold mb-2">{robot.name}</h2>
                <p className="text-muted-foreground">Robot ID: {robot.id}</p>
              </div>
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
  );
}
