"use client";

import React, { useEffect } from "react";

import { useUserDataAtom } from "@/hooks/user-data-atom";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { UserAuth } from "@/context/auth_context";
import Link from "next/link";
import { redirectBackIfUnAuthenticated } from "@/utility/utility";
import Head from "next/head";

export default function Dashboard() {
  const [currentUser, setCurrentUser] = useUserDataAtom();

  redirectBackIfUnAuthenticated();

  // Dummy data for robot cards (replace this with your actual data)
  const robotCards = [
    { id: "robot1", name: "Robot 1" },
    { id: "robot2", name: "Robot 2" },
    { id: "robot3", name: "Robot 3" },
  ];

  return (
    <div className="flex flex-col items-center justify-center h-screen ">
      <Head>
        <title>Telepresence Robot Controller - Dashboard</title>
        <meta
          name="description"
          content="Dashboard for Telepresence Robot Controller"
        />
      </Head>

      <main className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
        CONTENTS HERE
        {/* Your dashboard content goes here */}
      </main>
    </div>
  );
}
