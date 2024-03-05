import { redirect, useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase";
import { useSessionStorage } from "./useSessionStorage";
import { useEffect } from "react";
import { twMerge } from "tailwind-merge";
import clsx, { ClassValue } from "clsx";

export const pushToDashboardIfAuthenticated = () => {
  const router = useRouter();
  const [user] = useAuthState(auth);

  if (typeof window !== "undefined") {
    // Perform localStorage action
    const userSession = sessionStorage.getItem("user");

    useEffect(() => {
      console.log(userSession);

      if (user && userSession) {
        router.push("/dashboard");
      }

      return () => {};
    }, [userSession, user]);
  }
};

export const redirectBackIfUnAuthenticated = () => {
  const [user] = useAuthState(auth);
  const router = useRouter();

  if (typeof window !== "undefined") {
    // Perform localStorage action
    const userSession = sessionStorage.getItem("user");

    useEffect(() => {
      console.log(userSession);

      if (!user && !userSession) {
        router.push("/");
      }

      return () => {};
    }, [userSession, user]);
  }
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
