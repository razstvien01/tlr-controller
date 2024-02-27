"use client";

import React from "react";
import { useSession } from "next-auth/react";

import { redirect, useRouter } from "next/navigation";
import { UserAuth } from "@/context/auth_context";

export default function Dashboard() {
  const { user } = UserAuth();
  const session = useSession({
    required: true,
    onUnauthenticated() {
      if (!user) {
        redirect("/");
      }
    },
    
  });
  return <div>Dashboard</div>;
}

Dashboard.requireAuth = true;
