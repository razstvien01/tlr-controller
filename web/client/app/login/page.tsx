"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { TPH2 } from "@/components/typography/tp-h2";
import { TPP } from "@/components/typography/tp-p";
import { Label } from "@/components/ui/label";
import { Icons } from "@/components/icons/icons";

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const handleLogin = async () => {
    // Perform authentication logic (e.g., using Firebase, API, etc.)
    // If successful, navigate to the dashboard
    // Replace the following line with your authentication logic

    // Example of navigating to the dashboard
    router.push("/dashboard");
  };

  const handleSignup = async () => {
    try {
      // await googleSignUp()
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
        <Label>Enter your email and password below to login your account</Label>
        <form>
          <div className="mt-6 mb-4">
            <Label htmlFor="email" className="block text-gray-600 mb-2">
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
            <label htmlFor="password" className="block text-gray-600 mb-2">
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
          <Button type="button" className="w-full py-2" onClick={handleLogin}>
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
          onClick={handleSignup}
        >
          {isLoading ? (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Icons.google className="mr-2 h-4 w-4" />
          )}{" "}
          Google
        </Button>
        <TPP className="text-gray-600">
          Don't have an account?{" "}
          <Link href="/signup" className="text-blue-500">
            Sign up here
          </Link>
        </TPP>
      </div>
    </div>
  );
}
