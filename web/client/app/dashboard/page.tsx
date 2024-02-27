"use client";

import React, { useEffect } from "react";
import { useSession } from "next-auth/react";

import { redirect, useRouter } from "next/navigation";
import { useUserDataAtom } from "@/hooks/user-data-atom";
import { getUserByEmail } from "@/service/users.service";

export default function Dashboard() {
  const [currentUser, setCurrentUser] = useUserDataAtom();

  const session = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/");
    },
  });

  const fetchUser = async () => {
    const response = await getUserByEmail(session.data?.user?.email ?? null);
    setCurrentUser(response.data);
  };

  useEffect(() => {
    fetchUser();

    console.log(currentUser);
    return () => {};
  }, [session]);

  return <div>Dashboard</div>;
}
