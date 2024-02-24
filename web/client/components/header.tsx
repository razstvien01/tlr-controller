import React from "react";
import { ModeToggle } from "../components/mode-toggle";

export function Header() {
  return (
    <div className="border-b-2">
      <div className="flex h-16 items-center px-4">
        <h1 className="text-2xl font-bold">Telepresence Robot App</h1>

        <div className="ml-auto flex items-center space-x-4">
          {/* <Search /> */}
          {/* <OrgSwitcher
            org_refs={org_refs}
            showNewOrgDialog={showNewOrgDialog}
            setShowNewOrgDialog={setShowNewOrgDialog}
          /> */}
          <ModeToggle />
          {/* <Notifications />
          <UserNav
            userData={userData}
            logOut={logOut}
            isUpdate={isUpdate}
            setIsUpdate={setIsUpdate}
            setIsLoading={setIsLoading}
          /> */}
        </div>
      </div>
    </div>
  );
}
