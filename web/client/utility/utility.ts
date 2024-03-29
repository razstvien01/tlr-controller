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
    const userSession = sessionStorage.getItem("user");

    useEffect(() => {
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
    const userSession = sessionStorage.getItem("user");

    useEffect(() => {
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
