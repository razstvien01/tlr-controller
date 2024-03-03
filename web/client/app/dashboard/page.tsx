"use client";

import React, { useEffect } from "react";

import { useUserDataAtom } from "@/hooks/user-data-atom";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { UserAuth } from "@/context/auth_context";
import Link from "next/link";
import { redirectBackIfUnAuthenticated } from "@/utility/utility";

export default function Dashboard() {
  const [currentUser, setCurrentUser] = useUserDataAtom();
  
  redirectBackIfUnAuthenticated()

  // Dummy data for robot cards (replace this with your actual data)
  const robotCards = [
    { id: "robot1", name: "Robot 1" },
    { id: "robot2", name: "Robot 2" },
    { id: "robot3", name: "Robot 3" },
  ];

  return (
    // <div className="flex flex-col items-center min-h-screen">
    //   <TPH1 className="pt-10 pb-10">Dashboard</TPH1>

    //   {/* Button to register a new robot */}
    //   <Link href="/register-robot">
    //     <Button className="px-4 py-2 rounded-md mb-4">
    //       Register a Robot
    //     </Button>
    //   </Link>

    //   {/* List of robot cards */}
    //   <div className="grid grid-cols-3 gap-4">
    //     {robotCards.map((robot) => (
    //       <Link key={robot.id} href={`/robot-control/${robot.id}`}>
    //         <div className="border p-4 rounded-md hover:bg-gray-100 transition">
    //           <h2 className="text-xl font-bold mb-2">{robot.name}</h2>
    //           <p className="text-gray-500">Robot ID: {robot.id}</p>
    //         </div>
    //       </Link>
    //     ))}
    //   </div>
    // </div>
    <div className="h-full px-4 py-6 lg:px-8 items-center min-h-screen">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight">
            Robot List
          </h2>
          <p className="text-sm text-muted-foreground">
            List of robotsssss
          </p>
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