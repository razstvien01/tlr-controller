import { redirect, useRouter } from "next/navigation";
import { UserAuth } from "../context/auth_context";

import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export const pushToDashboardIfAuthenticated = () => {
  const router = useRouter();
  const { user } = UserAuth() || {};

  if (user) {
    router.push("/dashboard");
  }
};

export const redirectBackIfUnAuthenticated = () => {
  const router = useRouter();
  const { user } = UserAuth() || {};

  if (!user) {
    redirect("/");
  }
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
