"use client";

import React from "react";
import { ModeToggle } from "../components/mode-toggle";
import { UserNav } from "../components/user-nav";
import { useUserDataAtom } from "@/hooks/user-data-atom";
import { useSession } from "next-auth/react";

export function Header() {
  const session = useSession();
  const isLogin = session.status === "authenticated";

  return (
    <div className="border-b-2">
      <div className="flex h-16 items-center px-4">
        <h1 className="text-2xl font-bold">Telepresence Robot App</h1>

        <div className="ml-auto flex items-center space-x-4">
          <ModeToggle />

          {isLogin ? <UserNav /> : null}
        </div>
      </div>
    </div>
  );
}
