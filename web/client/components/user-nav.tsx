"use client";

import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Button } from "../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
// import { UserAuth } from "@/context/auth_context";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
// import ProfileSheet from "./profile_detail.sheet";
// import { UserDataProps } from "../types/types";

// interface UserNavProps {
//   userData: UserDataProps;
//   logOut: () => void;
//   isUpdate: boolean
//   setIsUpdate: Dispatch<SetStateAction<boolean>>
//   setIsLoading: Dispatch<SetStateAction<boolean>>
// }

// const UserNav: React.FC<UserNavProps> = ({ userData, logOut, isUpdate, setIsUpdate, setIsLoading }) => {
export const UserNav: React.FC = () => {
  const router = useRouter();
  // const [isSheetVisible, setIsSheetVisible] = useState(false);
  // const { full_name = '', email_address = '', photo_url = '' } = userData || {}
  // const { user = {}, logOut } = UserAuth();
  // const {
  //   displayName = "",
  //   email = "",
  //   uid = "",
  //   phoneNumber = "",
  //   photoURL = "",
  // } = user || {};

  const handleSignOut = async () => {
    try {
      await signOut()
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  // const handleOpenSheet = () => {
  //   setIsSheetVisible(!isSheetVisible);
  // };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-8 w-8">
              {/* <AvatarImage src={photoURL} alt="@shadcn" /> */}
              <AvatarFallback>ZZ</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">asdasd</p>
              <p className="text-xs leading-none text-muted-foreground">
                asfasfsa
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => {}}>
              Profile
              <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              Settings
              <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>New Team</DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleSignOut}>
            Log out
            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* <ProfileSheet isSheetVisible={isSheetVisible} setIsSheetVisible={setIsSheetVisible} handleOpenSheet={handleOpenSheet} user={userData} isUpdate={isUpdate} setIsUpdate={setIsUpdate}/> */}
    </>
  );
};
