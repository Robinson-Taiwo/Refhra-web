"use client";
import { X } from "lucide-react";
import OnboardingNavigator from "./OnboardingNavigator";

export default function OnboardingCard() {
  const closeOnboarding = () => {
    console.log("🎯 Finished onboarding flow");
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white  scrollbar-hide overflow-hidden overflow-y-hidden rounded-2xl shadow-lg w-full max-w-4xl md:h-[70vh] flex flex-col relative">
        {/* Close Button */}
        <button
          onClick={closeOnboarding}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
        >
          <X size={20} />
        </button>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto px-6 py-8">
          <OnboardingNavigator />
        </div>
      </div>
    </div>
  );
}
