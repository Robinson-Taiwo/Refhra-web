"use client";

import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import rocket from "@/components/icons/rocket.svg";
import logo from "@/components/icons/refhra.svg";

export default function HomePage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-blue-600 flex flex-col lg:flex-row">
        {/* Logo */}
        <div className="absolute top-4 left-4 lg:top-6 lg:left-10 bg-white rounded-xl p-2">
          <Image
            src={logo}
            alt="Refhra logo"
            className="h-12 w-12 lg:h-16 lg:w-16"
            width={64}
            height={64}
          />
        </div>

        {/* Text Content */}
        <section className="flex flex-col justify-center flex-1 px-6 pt-32 pb-16 sm:px-10 lg:px-16">
          <h1
            className="text-white font-bold leading-tight
            text-4xl sm:text-5xl lg:text-6xl xl:text-7xl max-w-3xl"
          >
            Unlocking the next level of Student Productivity
          </h1>

          <p className="text-white mt-4 text-base sm:text-lg lg:text-xl max-w-2xl">
            Experience scheduling, learning, accountability and more in the most
            innovative way
          </p>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 mt-8 w-fit">
            <Link href="/onboarding">
              <Button className="bg-blue-600 hover:bg-blue-800 border border-white border-dashed px-8 py-6 text-lg font-semibold">
                Get Started
              </Button>
            </Link>

            <Button className="bg-white text-blue-600 hover:bg-blue-50 border border-white border-dashed px-8 py-6 text-lg font-semibold">
              Demo Video
            </Button>
          </div>
        </section>

        {/* Rocket Image */}
        <section className="hidden md:flex flex-1 items-center justify-center relative">
          <Image
            src={rocket}
            alt="Rocket illustration"
            className="w-[70%] max-w-lg lg:max-w-xl"
            width={500}
            height={500}
            priority
          />
        </section>
      </main>
    </>
  );
}
