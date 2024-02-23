'use client'

import Image from "next/image";
// import {ControllerTest} from "../components/test/controller_test1";
import ControllerTest from "@/components/test/controller_test"

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center h-screen">
      
      <ControllerTest/>
    </main>
  );
}
