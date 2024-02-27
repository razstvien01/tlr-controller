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
// import { UserAuth } from "@/context/auth_context";
import { useUserDataAtom } from "@/hooks/user-data-atom";
import { signIn } from "next-auth/react";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  // const { user = {}, googleSignIn } = UserAuth();

  const [currentUser, setCurrentUser] = useUserDataAtom();
  
  if(currentUser && currentUser.user_id != ""){
    console.log(currentUser.user_id + " from login")
    router.push("/dashboard")
  }

  const handleLogin = async () => {
    signIn("credentials", {
      email,
      password,
      redirect: true,
      callbackUrl: "/",
    });
  };

  const handleGoogleSignup = async () => {
    try {
      // setCurrentUser(await googleSignIn());
      signIn('google')
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('bg-1.gif')" }}
    >
      <div className="max-w-md p-6 bg-background rounded-xl shadow-md">
        <TPH2 className="text-center">Login</TPH2>
        <Label className="text-muted-foreground">
          Enter your email and password below to login your account
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
          <div className="mb-2">
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
          <TPP className="text-muted-foreground pl-2 cursor-pointer font-semibold pb-4 text-sm">
            Forgot Password?
            <Link
              href="/forgot-password"
              className="pl-2 text-indigo-400 hover:text-indigo-300 "
            >
              Click here
            </Link>
          </TPP>
          <Button
            type="button"
            className="w-full py-2"
            onClick={handleLogin}
            disabled={isLoading || !email || !password}
          >
            Login
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
