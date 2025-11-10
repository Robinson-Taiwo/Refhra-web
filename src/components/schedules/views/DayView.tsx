"use client";

import React, { useState } from "react";
import TaskCard from "@/components/schedules/TaskCard";
import TaskOverview from "./TaskOverview";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Task = {
  id: number;
  title: string;
  startTime: string;
  endTime: string;
  color: string;
};

type HorizontalDayViewProps = {
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
  onAddTaskAtTime: (time: string) => void; // 👈 Add this prop
};

const hours = Array.from({ length: 24 }, (_, i) => i);

const sampleTasks: Task[] = [
  { id: 1, title: "Team Sync", startTime: "09:15", endTime: "09:45", color: "#60A5FA" },
  { id: 2, title: "Code Review", startTime: "10:00", endTime: "11:30", color: "#FACC15" },
  { id: 3, title: "Lunch", startTime: "13:00", endTime: "14:00", color: "#34D399" },
  { id: 4, title: "UI Design", startTime: "10:15", endTime: "10:30", color: "#F472B6" },
  { id: 5, title: "Product Check-in", startTime: "10:30", endTime: "10:45", color: "#C084FC" },
  { id: 6, title: "Research", startTime: "10:45", endTime: "11:00", color: "#A3E635" },
  { id: 7, title: "Test", startTime: "10:00", endTime: "10:10", color: "#FB923C" },
  { id: 8, title: "Bug Fix", startTime: "10:10", endTime: "10:20", color: "#F87171" },
  { id: 9, title: "Docs", startTime: "10:20", endTime: "10:30", color: "#4ADE80" },
  { id: 10, title: "Call", startTime: "10:30", endTime: "10:40", color: "#38BDF8" },
  { id: 11, title: "Call Ashia", startTime: "00:30", endTime: "01:40", color: "#38CDF8" },
];

function timeToMinutes(time: string) {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

function getTasksForHour(hour: number, tasks: Task[]) {
  const startOfHour = hour * 60;
  const endOfHour = startOfHour + 60;

  return tasks.filter((task) => {
    const start = timeToMinutes(task.startTime);
    const end = timeToMinutes(task.endTime);
    return end > startOfHour && start < endOfHour;
  });
}

export default function HorizontalDayView({
  selectedDate,
  onSelectDate,
  onAddTaskAtTime, // 👈 used below
}: HorizontalDayViewProps) {
  const [selectedHour, setSelectedHour] = useState<number | null>(null);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  return (
    <div className="p-6 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <button
            onClick={() =>
              onSelectDate(new Date(selectedDate.setDate(selectedDate.getDate() - 1)))
            }
            className="text-sm p-3 bg-gray-200 rounded-full hover:bg-gray-300"
          >
            <ChevronLeft className="w-8 h-8 text-gray-600" />
          </button>
          <button
            onClick={() =>
              onSelectDate(new Date(selectedDate.setDate(selectedDate.getDate() + 1)))
            }
            className="text-sm p-3 rounded-full bg-gray-200 hover:bg-gray-300"
          >
            <ChevronRight className="w-8 h-8 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Hourly grid */}
      <div className="grid grid-cols-6 gap-5">
        {hours.map((hour) => {
          const tasks = getTasksForHour(hour, sampleTasks);
          const visibleTasks = tasks.slice(0, 3);
          const hiddenCount = tasks.length - visibleTasks.length;
          const timeLabel = `${hour.toString().padStart(2, "0")}:00`;

          return (
            <div
              key={hour}
              onClick={(e) => {
                if ((e.target as HTMLElement).closest(".task-card")) return;
                onAddTaskAtTime(timeLabel); // 👈 opens AddTaskModal
              }}
              className="relative w-full h-56 bg-white rounded-2xl shadow-sm border border-gray-200 flex flex-col overflow-hidden hover:shadow-md transition-all cursor-pointer"
            >
              {/* Hour Label */}
              <div className="text-center font-semibold text-sm py-2 border-b border-gray-100 bg-white rounded-t-2xl">
                {timeLabel}
              </div>

              {/* Task container */}
              <div className="flex-1 flex flex-col gap-1 p-2 overflow-hidden">
                <div className="flex flex-col overflow-auto">
                  {visibleTasks.map((task) => (
                    <button
                      key={task.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedTask(task);
                      }}
                      className="task-card bg-transparent hover:bg-transparent cursor-pointer w-full block h-full"
                    >
                      <TaskCard {...task} />
                    </button>
                  ))}
                </div>

                {hiddenCount > 0 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedHour(hour);
                    }}
                    className="text-[11px] text-blue-500 font-medium hover:underline mt-1"
                  >
                    + {hiddenCount} more
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Task Overview Modal */}
      {selectedTask && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={() => setSelectedTask(null)}
        >
          <TaskOverview {...selectedTask} setSelectedTask={setSelectedTask} />
        </div>
      )}

      {/* Hour Overview Modal */}
      {selectedHour !== null && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={() => setSelectedHour(null)}
        >
          <div
            className="bg-white rounded-2xl p-6 w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Tasks for {selectedHour.toString().padStart(2, "0")}:00</h3>
              <button
                onClick={() => setSelectedHour(null)}
                className="text-sm text-gray-500"
              >
                Close
              </button>
            </div>

            <div className="space-y-2 max-h-60 overflow-auto">
              {getTasksForHour(selectedHour, sampleTasks).map((task) => (
                <div key={task.id} className="p-2 rounded border border-gray-100">
                  <TaskCard {...task} />
                </div>
              ))}

              {getTasksForHour(selectedHour, sampleTasks).length === 0 && (
                <div className="text-sm text-gray-500">No tasks in this hour</div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
