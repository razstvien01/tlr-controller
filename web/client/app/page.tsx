// pages/index.js
import ControllerTest from "@/components/test/controller_test";
import Link from "next/link";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/header"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <Header/>

      {/* Main Content with Background Image */}
      <main
        className="flex-1 flex flex-col items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: "url('bg-1.gif')" }}
      >
        <div className="text-center bg-background text-foreground p-8 rounded-lg opacity-80">
          <h2 className="text-3xl font-semibold mb-4">
            Welcome to Telepresence Robot Control Center
          </h2>
          <p className="text-lg mb-6">
            Explore the future of remote presence with our telepresence robot.
            Control your robot seamlessly from anywhere in the world.
          </p>
          <Link href="/login">
            <Button className="px-6 py-3 rounded-full text-lg font-semibold transition ">
              Get Started
            </Button>
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-primary p-4 text-foreground">
        <p>&copy; 2024 Telepresence Robot App</p>
        {/* Add any additional footer content */}
      </footer>
    </div>
  );
}
