"use client";

import React, { useState } from "react";
import HourSlot from "./HourSlot";

const hours = Array.from({ length: 24 }, (_, i) => i);

// Categorize hours of the day
const CATEGORIES = [
  { name: "Morning", range: [5, 11] },
  { name: "Afternoon", range: [12, 16] },
  { name: "Evening", range: [17, 20] },
  { name: "Night", range: [21, 23], extraRange: [0, 4] }, // wraps past midnight
];

export default function DayView() {
  const [events, setEvents] = useState<
    { hour: number; title: string; time: string; color?: string }[]
  >([
    { hour: 9, title: "Team Sync", time: "9:00 AM - 10:00 AM", color: "#3b82f6" },
    { hour: 14, title: "UI Design Review", time: "2:00 PM - 3:00 PM", color: "#10b981" },
    { hour: 20, title: "Personal Project", time: "8:00 PM - 9:00 PM", color: "#ef4444" },
  ]);

  const handleAddEvent = (hour: number) => {
    const formattedHour = formatHour(hour);
    const title = prompt(`Add event for ${formattedHour}:`);
    if (title) {
      setEvents((prev) => [
        ...prev,
        {
          hour,
          title,
          time: `${formattedHour} - ${formatHour((hour + 1) % 24)}`,
          color: "#f59e0b",
        },
      ]);
    }
  };

  const groupedEvents = hours.map((h) => ({
    hour: h,
    events: events.filter((e) => e.hour === h),
  }));

  // Helper function to filter hours within category
  const getHoursForCategory = (category: (typeof CATEGORIES)[number]) => {
    const [start, end] = category.range;
    const mainRange = groupedEvents.filter(({ hour }) => hour >= start && hour <= end);

    if (category.extraRange) {
      const [extraStart, extraEnd] = category.extraRange;
      const extraRange = groupedEvents.filter(
        ({ hour }) => hour >= extraStart && hour <= extraEnd
      );
      return [...mainRange, ...extraRange];
    }
    return mainRange;
  };

  return (
    <div className="w-full p-4 space-y-8">
      <h2 className="text-lg font-semibold mb-2">Day View (Categorized & Horizontal)</h2>

      {CATEGORIES.map((category) => {
        const categoryHours = getHoursForCategory(category);
        return (
          <div key={category.name}>
            <h3 className="text-md font-semibold text-gray-700 mb-3">
              {category.name}
            </h3>

            <div
              className="
                flex flex-wrap gap-4
                justify-start items-start
              "
            >
              {categoryHours.map(({ hour, events }) => (
                <HourSlot
                  key={hour}
                  hour={hour}
                  events={events}
                  onAddEvent={handleAddEvent}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// Helper function for time formatting
function formatHour(hour: number) {
  if (hour === 0) return "12 AM";
  if (hour < 12) return `${hour} AM`;
  if (hour === 12) return "12 PM";
  return `${hour - 12} PM`;
}
