// pages/index.js
import ControllerTest from "@/components/test/controller_test";
import Link from "next/link";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/header";
import { TPH1 } from "@/components/typography/tp-h1";
import { TPP } from "@/components/typography/tp-p";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Main Content with Background Image */}
      <main
        className="flex-1 flex flex-col items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: "url('bg-1.gif')" }}
      >
        <div className="text-center bg-background text-foreground p-8 rounded-2xl opacity-80">
          {/* <h2 className="text-3xl font-semibold mb-4"> */}
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
