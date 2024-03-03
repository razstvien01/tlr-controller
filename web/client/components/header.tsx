"use client";

import { ModeToggle } from "../components/mode-toggle";
import { UserNav } from "../components/user-nav";
import { UserAuth } from "@/context/auth_context";
import { MainNav } from "@/components/main-nav";

export function Header() {
  const { user = {} } = UserAuth() || {};

  return (
    <div className="border-b-2">
      <div className="flex h-16 items-center px-4">
        <h1 className="text-2xl font-bold">Telepresence Robot App</h1>

        <div className="flex-grow"></div> {/* Add this to take up remaining space */}

        <MainNav />

        <div className="ml-auto flex items-center space-x-4 pl-10">
          <ModeToggle />

          {user && <UserNav />}
        </div>
      </div>
    </div>
  );
}
