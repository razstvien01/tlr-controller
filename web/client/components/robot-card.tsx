import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  // Image,
} from "@/components/ui/card";
import { Button } from "./ui/button";
import Image from "next/image";

export default function RobotCard() {
  return (
    <Card className="lg:max-w-md w-full">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
      <Image
        src="https://cdn.pixabay.com/photo/2023/03/16/16/49/watercolor-7857103_640.png"
        alt="Card Image"
        className="w-full"
        width={50}
        height={50}
      />
      <CardContent>
        <p>Card Content</p>
      </CardContent>
      <CardFooter>
        <Button>Button</Button>
      </CardFooter>
    </Card>
  );
}
