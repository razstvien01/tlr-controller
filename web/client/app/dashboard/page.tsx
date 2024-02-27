"use client";

import React from "react";
import { useSession } from "next-auth/react";

import { redirect, useRouter } from "next/navigation";
// import { UserAuth } from "@/context/auth_context";
import { useUserDataAtom } from "@/hooks/user-data-atom";

export default function Dashboard() {
  const [currentUser, setCurrentUser] = useUserDataAtom();
  
  
  const session = useSession({
    required: true,
    onUnauthenticated() {
      // if (!user) {
        redirect("/");
      // }
    },
    
  });
  
  console.log(session.data?.user?.email)
  
  return <div>Dashboard</div>;
}
