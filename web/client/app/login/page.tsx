"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { TPH2 } from "@/components/typography/tp-h2";
import { TPP } from "@/components/typography/tp-p";
import { Label } from "@/components/ui/label";

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    // Perform authentication logic (e.g., using Firebase, API, etc.)
    // If successful, navigate to the dashboard
    // Replace the following line with your authentication logic

    // Example of navigating to the dashboard
    router.push("/dashboard");
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('bg-1.gif')" }}
    >
      <div className="max-w-md p-6 bg-background rounded-xl shadow-md">
        <TPH2 className="text-center">Login</TPH2>
        <Label>
          Enter your email and password below to login your account
        </Label>
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
          <Button
            type="button"
            className="w-full py-2"
            onClick={handleLogin}
          >
            Login
          </Button>
        </form>
        <TPP className="mt-4 text-gray-600">
          Don't have an account?{" "}
          <Link href="/signup" className="text-blue-500">
            Sign up here
          </Link>
        </TPP>
      </div>
    </div>
  );
}
