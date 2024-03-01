"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { TPH2 } from "@/components/typography/tp-h2";
import { TPP } from "@/components/typography/tp-p";
import { Label } from "@/components/ui/label";
import { Icons } from "@/components/icons/icons";
import { useUserDataAtom } from "@/hooks/user-data-atom";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase";
import { UserAuth } from "@/context/auth_context";
import { pushToDashboardIfAuthenticated } from "@/utility/utility";

export default function Login() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [currentUser, setCurrentUser] = useUserDataAtom();
  
  const { user } = UserAuth();

  pushToDashboardIfAuthenticated();
  
  const handleReset = async () => {
    sendPasswordResetEmail(auth, email);
  };

  const handleGoogleSignup = async () => {
    try {
      // signIn('google')
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('bg-1.gif')" }}
    >
      <div className="max-w-md p-6 bg-background rounded-xl shadow-md opacity-80">
        <TPH2 className="text-center">Forgot Password</TPH2>
        <Label className="text-muted-foreground">
          Enter your email adress to reset your password
        </Label>
        <form>
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
          <Button
            type="button"
            className="w-full py-2"
            onClick={handleReset}
            disabled={isLoading || !email}
          >
            Send Forgot Password Email
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
          {"Don't have an account?"}
          <Link
            href="/signup"
            className="pl-2 cursor-pointer font-semibold text-indigo-400 hover:text-indigo-300 pb-4"
          >
            Sign up here
          </Link>
        </TPP>
      </div>
    </div>
  );
}
