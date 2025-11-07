"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus } from "lucide-react";
import HorizontalDayView from "@/components/schedules/views/DayView";
import WeekView from "@/components/schedules/views/WeekView";
import MonthView from "@/components/schedules/views/MonthView";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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

  const handleAddTask = () => {
    setShowModal(true);
  };

  const handleSaveTask = () => {
    console.log("Saving new task:", newTask);
    setShowModal(false);
    // Here, you can trigger Firestore/Supabase task creation or update UI
  };

  return (
    <div className="min-h-screen p-6">
      {/* Top Control Bar */}
      <div className="flex items-center justify-between mb-6">
        {/* Left: Title + Date */}
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-800">
            Your Schedule
          </h1>
          <p className="text-sm text-gray-500 mt-1">{formattedDate}</p>
        </div>

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

          <Button
            onClick={handleAddTask}
            className="bg-blue-600 text-white rounded-full p-2 hover:bg-blue-700 transition-all"
          >
            <Plus className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* View Renderer */}
      <div className="transition-all duration-300">
        {view === "day" && (
          <HorizontalDayView
            selectedDate={selectedDate}
            onSelectDate={setSelectedDate}
          />
        )}
        {view === "week" && (
          <WeekView selectedDate={selectedDate} onSelectDate={setSelectedDate} />
        )}
        {view === "month" && (
          <MonthView selectedDate={selectedDate} onSelectDate={setSelectedDate} />
        )}
      </div>

      {/* Add Task Modal */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="sm:max-w-md rounded-2xl border border-gray-200 shadow-lg">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-gray-800">
              Add New Task / Event
            </DialogTitle>
            <DialogDescription className="text-sm text-gray-500">
              Fill in the details below to add it to your schedule.
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-4 mt-3">
            {/* Title */}
            <div className="space-y-1">
              <Label>Title</Label>
              <Input
                placeholder="e.g. Design meeting"
                value={newTask.title}
                onChange={(e) =>
                  setNewTask((prev) => ({ ...prev, title: e.target.value }))
                }
              />
            </div>

            {/* Description */}
            <div className="space-y-1">
              <Label>Description</Label>
              <Textarea
                placeholder="Brief summary or notes..."
                value={newTask.description}
                onChange={(e) =>
                  setNewTask((prev) => ({ ...prev, description: e.target.value }))
                }
              />
            </div>

            {/* Priority */}
            <div className="space-y-1">
              <Label>Priority</Label>
              <Select
                value={newTask.priority}
                onValueChange={(value) =>
                  setNewTask((prev) => ({ ...prev, priority: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Timeline */}
            <div className="space-y-1">
              <Label>Timeline</Label>
              <Input
                type="datetime-local"
                value={newTask.timeline}
                onChange={(e) =>
                  setNewTask((prev) => ({ ...prev, timeline: e.target.value }))
                }
              />
            </div>

            {/* Tag Color */}
            <div className="space-y-1">
              <Label>Tag Color</Label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={newTask.color}
                  onChange={(e) =>
                    setNewTask((prev) => ({ ...prev, color: e.target.value }))
                  }
                  className="w-10 h-10 rounded-md cursor-pointer border border-gray-300"
                />
                <span className="text-sm text-gray-500">
                  Pick a color to tag this event
                </span>
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-4">
              <Button
                variant="outline"
                onClick={() => setShowModal(false)}
                className="rounded-xl"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSaveTask}
                className="bg-blue-600 text-white rounded-xl hover:bg-blue-700"
              >
                Save Task
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Schedule;
