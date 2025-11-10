"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import HorizontalDayView from "@/components/schedules/views/DayView";
import WeekView from "@/components/schedules/views/WeekView";
import MonthView from "@/components/schedules/views/MonthView";
import AddTaskModal from "@/components/schedules/AddTaskModal";

const Schedule = () => {
  const [view, setView] = useState<"day" | "week" | "month">("day");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showModal, setShowModal] = useState(false);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    priority: "medium",
    timeline: "",
    color: "#60A5FA",
  });

  const formattedDate = selectedDate.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const views = [
    { name: "Day", value: "day" },
    { name: "Week", value: "week" },
    { name: "Month", value: "month" },
  ];

  const handleAddTask = () => setShowModal(true);

  const handleSaveTask = () => {
    console.log("✅ New Task Saved:", newTask);
    setShowModal(false);
    // Add your Firestore/Supabase save logic here
  };

  return (
    <div className="min-h-screen p-6">
      {/* Top Control Bar */}
      <div className="flex items-center justify-between mb-6">
        {/* Left: Title + Date */}
        <p className="text-2xl font-bold tracking-tight text-gray-800 mt-1">
          {formattedDate}
        </p>

        {/* Right: Controls */}
        <div className="flex items-center gap-3">
          {views.map((v) => (
            <Button
              key={v.value}
              onClick={() => setView(v.value as "day" | "week" | "month")}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                view === v.value
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-100"
              }`}
            >
              {v.name}
            </Button>
          ))}

          {/* Add New Task Button */}
          <Button
            onClick={handleAddTask}
            className="bg-blue-600 text-white rounded-full p-2 hover:bg-blue-700 transition-all"
          >
            <Plus className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Calendar View */}
      <div className="transition-all duration-300">
        {view === "day" && (
          <HorizontalDayView
            selectedDate={selectedDate}
            onSelectDate={setSelectedDate}
            onAddTaskAtTime={(time) => {
              setNewTask((prev) => ({ ...prev, timeline: time }));
              setShowModal(true);
            }}
          />
        )}
        {view === "week" && (
          <WeekView
            selectedDate={selectedDate}
            onSelectDate={setSelectedDate}
          />
        )}
        {view === "month" && (
          <MonthView
            selectedDate={selectedDate}
            onSelectDate={setSelectedDate}
          />
        )}
      </div>

      {/* Add Task Modal */}
      <AddTaskModal
        showModal={showModal}
        setShowModal={setShowModal}
        title={newTask.title}
        description={newTask.description}
        priority={newTask.priority}
        timeline={newTask.timeline}
        color={newTask.color}
        handleSaveTask={handleSaveTask}
        setNewTask={setNewTask}
        setSelectedTask={() => {}} // you can wire this up later if needed
      />
    </div>
  );
};

export default Schedule;
