import { redirect, useRouter } from "next/navigation";

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase";

export const pushToDashboardIfAuthenticated = () => {
  const router = useRouter();
  const [user] = useAuthState(auth);

  if (user) {
    router.push("/dashboard");
  }
};

export const redirectBackIfUnAuthenticated = () => {
  const [user] = useAuthState(auth);

  if (!user) {
    redirect("/");
  }
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
