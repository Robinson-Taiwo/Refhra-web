"use client";
import React, { useState } from "react";
import HorizontalDayView from "@/components/schedules/views/DayView";
import WeekView from "@/components/schedules/views/WeekView";
import { Button } from "@/components/ui/button";

const Schedule = () => {
  const [view, setView] = useState<"day" | "week">("day");

  const views = [
    { name: "Day", value: "day" },
    { name: "Week", value: "week" },
  ];

  return (
    <div className="min-h-screen  p-6">
      {/* Top Control Bar */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-gray-800">
         Your Schedule
        </h1>
        <div className="flex gap-2">
          {views.map((v) => (
            <Button
              key={v.value}
              onClick={() => setView(v.value as "day" | "week")}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                view === v.value
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-100"
              }`}
            >
              {v.name} View
            </Button>
          ))}
        </div>
      </div>

      {/* View Renderer */}
      <div className="transition-all duration-300">
        {view === "day" ? <HorizontalDayView /> : <WeekView />}
      </div>
    </div>
  );
};

export default Schedule;
