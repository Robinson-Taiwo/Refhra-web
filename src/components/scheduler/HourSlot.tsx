"use client";
import React from "react";

interface HourSlotProps {
  hour: number;
  events: { title: string; time: string; color?: string }[];
  onAddEvent: (hour: number) => void;
}

const HourSlot: React.FC<HourSlotProps> = ({ hour, events, onAddEvent }) => {
  const formattedHour = hour === 0 ? "12 AM" 
    : hour < 12 ? `${hour} AM`
    : hour === 12 ? "12 PM"
    : `${hour - 12} PM`;

  return (
    <div
      onClick={() => onAddEvent(hour)}
      className="relative flex-shrink-0 flex flex-col gap-2 border rounded-lg p-2 cursor-pointer hover:bg-blue-50 transition-all duration-200"
      style={{ minWidth: "120px" }}
    >
      <div className="font-semibold text-sm text-gray-700">{formattedHour}</div>
      <div className="flex flex-col gap-1">
        {events.map((event, i) => (
          <div key={i}>
            <div
              className="p-2 rounded-lg text-white text-xs font-medium shadow-sm"
              style={{ backgroundColor: event.color || "#2563eb" }}
            >
              <div>{event.title}</div>
              <div className="opacity-80">{event.time}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HourSlot;
