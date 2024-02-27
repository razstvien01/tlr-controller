"use client";

import React from "react";
import { useSession, } from "next-auth/react";

import { redirect, useRouter } from "next/navigation";
import { UserAuth } from "@/context/auth_context";
import { useUserDataAtom } from "@/hooks/user-data-atom";

export default function Dashboard() {
  const [currentUser, setCurrentUser] = useUserDataAtom();
  const { user } = UserAuth();
  console.log(currentUser.user_id + " from dashboard")
  // const session = useSession({
  //   required: true,
  //   onUnauthenticated() {
  //     if (!user) {
  //       redirect("/");
  //     }
  //   },
    
  // });
  
  if(!user) redirect("/")
  return <div>Dashboard</div>;
}

// Dashboard.requireAuth = true;
