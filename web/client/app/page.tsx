"use client"

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { TPH1 } from "@/components/typography/tp-h1";
import { TPP } from "@/components/typography/tp-p";
import { UserAuth } from "@/context/auth_context";
import { redirect, useRouter } from "next/navigation";


export default function Home() {
  const router = useRouter();
  
  const { user } = UserAuth()
  
  if(user){
    router.push("/dashboard")
  }
  
  
  return (
    <div className="min-h-screen flex flex-col">
      {/* Main Content with Background Image */}
      <main
        className="flex-1 flex flex-col items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: "url('bg-1.gif')" }}
      >
        <div className="text-center bg-background text-foreground p-8 rounded-2xl opacity-80">
          <TPH1 className="mb-4">
            Welcome to Telepresence Robot Control Center
          </TPH1>

          {/* </h2> */}
          <TPP className="mb-6">
            Explore the future of remote presence with our telepresence robot.
            Control your robot seamlessly from anywhere in the world.
          </TPP>
          <Link href="/login">
            <Button className="px-6 py-3 rounded-full text-lg font-semibold transition ">
              Get Started
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
}
