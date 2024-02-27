"use client";

import React, { useState } from "react";
import { redirect, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { TPH2 } from "@/components/typography/tp-h2";
import { TPP } from "@/components/typography/tp-p";
import { Label } from "@/components/ui/label";
import { Icons } from "@/components/icons/icons";
import { useUserDataAtom } from "@/hooks/user-data-atom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { signIn, useSession } from "next-auth/react";
import { addUser } from "@/service/users.service";
import { UserDataProps } from "@/configs/types";

export default function Signup() {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [currentUser, setCurrentUser] = useUserDataAtom();

  const router = useRouter();
  const session = useSession();

  if (session.status === "authenticated") {
    router.push("/dashboard");
  }

  const handleSignup = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user; 
      const uid = user.uid;
      
      const user_data = {
        email_address: email,
        display_name: displayName,
        phone_number: "",
        photo_url: "",
        user_id: uid,
      } as UserDataProps;

      const res = await addUser(user_data);

      setCurrentUser(res.user_data);

      signIn("credentials", {
        email,
        password,
        redirect: true,
        callbackUrl: "/",
      });
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      await signIn("google");
      
    } catch (error) {
      console.log("Error signing in with Google:", error);
    }
  };
  
  
  

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('bg-1.gif')" }}
    >
      <div className="max-w-md p-6 bg-background rounded-xl shadow-md">
        <TPH2 className="text-center">Sign Up</TPH2>
        <Label className="text-muted-foreground">
          Enter your email and password below to create your account
        </Label>
        <form>
          <div className="mt-6 mb-4">
            <Label htmlFor="email" className="block mb-2">
              Display Name
            </Label>
            <Input
              type="text"
              id="display"
              placeholder="Enter your display name"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
            />
          </div>
          <div className="mt-6 mb-4">
            <Label htmlFor="email" className="block mb-2">
              Email
            </Label>
            <Input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block mb-2">
              Password
            </label>
            <Input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block mb-2">
              Re-Enter Password
            </label>
            <Input
              type="password"
              id="password"
              placeholder="Re-Enter your password"
              value={passwordAgain}
              onChange={(e) => setPasswordAgain(e.target.value)}
            />
          </div>
          <Button
            type="button"
            className="w-full py-2"
            onClick={handleSignup}
            disabled={isLoading || !email || !password}
          >
            Create Account
          </Button>
        </form>
        <div className="relative mt-6 mb-6">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>
        <Button
          variant="outline"
          type="button"
          className="w-full"
          disabled={isLoading}
          onClick={handleGoogleSignup}
        >
          {isLoading ? (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Icons.google className="mr-2 h-4 w-4" />
          )}{" "}
          Google
        </Button>
        <TPP className="text-muted-foreground">
          {"Already have an account?"}
          <Link
            href="/login"
            className="pl-2 cursor-pointer font-semibold text-indigo-400 hover:text-indigo-300 pb-4"
          >
            Log in here
          </Link>
        </TPP>
      </div>
    </div>
  );
}
