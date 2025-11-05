"use client";
import React from "react";

interface EventCardProps {
  title: string;
  time: string;
  color?: string;
}

const EventCard: React.FC<EventCardProps> = ({ title, time, color }) => {
  return (
    <div
      className={`p-2 rounded-lg text-white text-xs font-medium shadow-md`}
      style={{ backgroundColor: color || "#2563eb" }}
    >
      <div>{title}</div>
      <div className="opacity-80">{time}</div>
    </div>
  );
};

export default EventCard;
