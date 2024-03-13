import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";
import Image from "next/image";
import { RobotDataProps } from "@/configs/types";

interface RobotCardProps {
  robot: RobotDataProps;
}

export default function RobotCard({ robot }: RobotCardProps) {
  // Function to limit the description to 100 characters
  // const limitDescription = (description) => {
  //   if (description.length > 100) {
  //     return description.substring(0, 100) + "...";
  //   }
  //   return description;
  // };
  
  const limitDescription = (description: string) =>{
    if(description.length > 100) {
      return description.substring(0, 300) + "...";
    } return description;
  }
  
  return (
    <Card className="lg:max-w-md w-full">
      <CardHeader>
        <CardTitle>{robot.robot_name}</CardTitle>
        <CardDescription>{robot.robot_id}</CardDescription>
      </CardHeader>
      <div className="relative h-80">
        <Image
          src="https://images.unsplash.com/photo-1538370965046-79c0d6907d47?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Robot Image"
          className="object-cover w-full h-full rounded-t-md"
          layout="fill"
        />
      </div>

      <CardContent className="p-4">
        <p
          className={`text-lg font-semibold mb-2 ${
            robot.status === "online" ? "text-green-500" : "text-red-500"
          }`}
        >
          {robot.status}
        </p>
        <p className="text-gray-600 mb-4">{limitDescription(robot.robot_description)}</p>
      </CardContent>
    </Card>
  );
}
