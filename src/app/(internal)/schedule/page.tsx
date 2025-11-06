"use client";

import DayView from "@/components/scheduler/DayView";
// import MonthView from "@/components/scheduler/MonthView";
// import WeekView from "@/components/scheduler/WeekView";

import React, { useState } from "react";


export default function CalendarView() {
  const [view, setView] = useState<"day" | "week" | "month">("day");

  return (
    <div className="w-full p-4">
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setView("day")}
          className={`px-3 py-1 rounded-lg border ${view === "day" ? "bg-blue-600 text-white" : "bg-white"}`}
        >
          Day
        </button>
        <button
          onClick={() => setView("week")}
          className={`px-3 py-1 rounded-lg border ${view === "week" ? "bg-blue-600 text-white" : "bg-white"}`}
        >
          Week
        </button>
        <button
          onClick={() => setView("month")}
          className={`px-3 py-1 rounded-lg border ${view === "month" ? "bg-blue-600 text-white" : "bg-white"}`}
        >
          Month
        </button>
      </div>

      {view === "day" && <DayView />}
      {/* {view === "week" && <WeekView />}
      {view === "month" && <MonthView />} */}
    </div>
  );
}
