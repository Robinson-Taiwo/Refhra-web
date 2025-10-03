"use client";
// import { useState } from "react";
import { Bell, Calendar } from "lucide-react";

export default function Navbar() {
  //   const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex  flex-col items-center w-full">
      <nav className="bg-white flex justify-end  w-full z-50">
        <div className="max-w-7xl  px-4 sm:px-6 lg:px-20">
          <div className="flex justify-end h-16 items-center gap-4">
            {/* Deadlines Icon */}
            <button className="relative p-2 rounded-full hover:bg-gray-100 transition-colors duration-200">
              <Calendar className="w-6 h-6 text-gray-700" />
            </button>

            {/* Notification Icon */}
            <button className="relative p-2 rounded-full hover:bg-gray-100 transition-colors duration-200">
              <Bell className="w-6 h-6 text-gray-700" />
              {/* Notification badge */}
              <span className="absolute top-0 right-0 inline-flex h-2 w-2 rounded-full bg-red-500"></span>
            </button>
          </div>
        </div>
      </nav>
      <div className="border-b w-[90%] "></div>
    </div>
  );
}
