// pages/index.js
import ControllerTest from "@/components/test/controller_test";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-blue-500 p-4 text-white">
        <h1 className="text-2xl font-bold">Telepresence Robot App</h1>
        {/* Add any additional header content */}
      </header>

      {/* Main Content with Background Image */}
      <main
        className="flex-1 flex flex-col items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: "url('bg-1.gif')" }}
      >
        <div className="text-center bg-white p-8 rounded-lg opacity-80">
          <h2 className="text-3xl font-semibold mb-4">
            Welcome to Telepresence Robot Control Center
          </h2>
          <p className="text-lg mb-6">
            Explore the future of remote presence with our telepresence robot.
            Control your robot seamlessly from anywhere in the world.
          </p>
          <Link href="/login">
            <div className="bg-blue-500 text-white px-6 py-3 rounded-full text-lg font-semibold transition hover:bg-blue-600">
              Get Started
            </div>
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-blue-500 p-4 text-white">
        <p>&copy; 2024 Telepresence Robot App</p>
        {/* Add any additional footer content */}
      </footer>
    </div>
  );
}
