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
    <div>
      DASHBOARD
    </div>
  );
}
