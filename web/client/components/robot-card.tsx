import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { RobotDataProps } from "@/configs/types";

interface RobotCardProps {
  robot: RobotDataProps;
}

export default function RobotCard({ robot }: RobotCardProps) {
  const limitDescription = (description: string) => {
    if (description.length > 100) {
      return description.substring(0, 300) + "...";
    }
    return description;
  };

  return (
    <Card className="lg:max-w-md w-full">
      <CardHeader>
        <CardTitle>{robot.robot_name}</CardTitle>
        <CardDescription>{robot.doc_id}</CardDescription>
      </CardHeader>
      <div className="relative h-80">
        <Image
          src="https://images.unsplash.com/photo-1538370965046-79c0d6907d47?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Robot Image"
          className="object-cover w-full h-full rounded-t-md"
          layout="fill"
        />
      </div>

      <CardContent className="p-4 flex flex-row">
        <p className="text-lg font-semibold">{robot?.location}</p>
        {/* <p
          className={`pl-2 text-lg font-semibold mb-2 ${
            robot.status === "active" ? "text-green-500" : "text-red-500"
          }`}
        >
          {robot.status.charAt(0).toUpperCase() + robot.status.substring(1)}
        </p> */}
      </CardContent>
      <CardFooter>
        <p className="text-gray-600 mb-4">
          {limitDescription(robot.robot_description)}
        </p>
      </CardFooter>
    </Card>
  );
}
