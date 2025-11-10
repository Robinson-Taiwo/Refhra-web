"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";

type Task = {
  id: number;
  title: string;
  startTime: string;
  endTime: string;
  color: string;
  day: string;
};

interface WeekViewProps {
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
  tasks?: Task[];
}

const defaultWeekDays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

// Default sample tasks (used when no prop is passed)
const sampleTasks: Task[] = [
  { id: 1, title: "Team Sync", startTime: "09:00", endTime: "09:45", color: "#60A5FA", day: "Monday" },
  { id: 2, title: "Design Review", startTime: "09:15", endTime: "09:50", color: "#34D399", day: "Monday" },
  { id: 3, title: "Code Review", startTime: "10:00", endTime: "11:30", color: "#FACC15", day: "Tuesday" },
  { id: 4, title: "Marketing Review", startTime: "11:00", endTime: "12:00", color: "#FB923C", day: "Thursday" },
  { id: 5, title: "Client Demo", startTime: "09:30", endTime: "10:00", color: "#A78BFA", day: "Friday" },
  { id: 6, title: "Hackathon Prep", startTime: "14:00", endTime: "15:30", color: "#F472B6", day: "Saturday" },
  { id: 7, title: "Church Service", startTime: "09:00", endTime: "11:00", color: "#38BDF8", day: "Sunday" },
  { id: 8, title: "HolyGhost service", startTime: "09:50", endTime: "10:00", color: "#58BEF8", day: "Monday" },
  { id: 9, title: "HolyGhost service", startTime: "10:10", endTime: "10:30", color: "#A78BFA", day: "Monday" },
  { id: 10, title: "Marketing Review", startTime: "10:30", endTime: "10:50", color: "#FB923C", day: "Monday" },
];

function timeToMinutes(time: string) {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

function getTasksForDay(day: string, tasks: Task[]) {
  return tasks
    .filter((task) => task.day === day)
    .map((task) => {
      const start = timeToMinutes(task.startTime);
      const end = timeToMinutes(task.endTime);
      const duration = end - start;
      return {
        ...task,
        start,
        duration,
        top: (start / (24 * 60)) * 100,
        height: (duration / (24 * 60)) * 100,
      };
    })
    .sort((a, b) => a.start - b.start);
}

export default function WeekView({
  selectedDate,
  onSelectDate,
  tasks = sampleTasks,
}: WeekViewProps) {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  return (
    <div className="p-6 min-h-screen">
      {/* <h1 className="text-2xl font-semibold mb-6">
        Week View ({selectedDate.toLocaleDateString("en-US", { month: "long", day: "numeric" })})
      </h1> */}

      <div className="grid grid-cols-7 gap-4 overflow-x-hidden">
        {defaultWeekDays.map((day) => {
          const tasksForDay = getTasksForDay(day, tasks);

          return (
            <div
              key={day}
              className="relative bg-white rounded-2xl shadow-sm border border-gray-200 h-[1200px] overflow-y-auto overflow-x-hidden flex flex-col hover:shadow-md transition-all"
            >
              {/* Day Header */}
              <div
                className={`text-center font-semibold text-sm py-3 border-b border-gray-100 sticky top-0 z-10 ${
                  day === selectedDate.toLocaleDateString("en-US", { weekday: "long" })
                    ? "bg-blue-50 text-blue-600"
                    : "bg-gray-100"
                }`}
                onClick={() => onSelectDate(getDateFromWeekday(day, selectedDate))}
              >
                {day}
              </div>

              {/* Hour Grid Lines */}
              <div className="absolute inset-0 overflow-hidden top-[40px] pointer-events-none">
                {Array.from({ length: 25 }, (_, i) => (
                  <div
                    key={i}
                    className="absolute left-0 w-full border-t border-gray-100 text-[10px] text-gray-400 pl-2"
                    style={{ top: `${(i / 24) * 100}%` }}
                  >
                    {`${i.toString().padStart(2, "0")}:00`}
                  </div>
                ))}
              </div>

              {/* Task Blocks */}
              <div className="relative flex-1 mt-2">
                {tasksForDay.map((task) => {
                  const overlapping = tasksForDay.filter(
                    (t) =>
                      timeToMinutes(t.startTime) < timeToMinutes(task.endTime) &&
                      timeToMinutes(t.endTime) > timeToMinutes(task.startTime)
                  );

                  const overlapCount = overlapping.length;
                  const taskIndex = overlapping.findIndex((t) => t.id === task.id);
                  const width = 100 / overlapCount;
                  const left = taskIndex * width;

                  const actualHeight = (task.height / 100) * 1200;
                  const isCompact = actualHeight < 40;

                  return (
                    <button
                      key={task.id}
                      onClick={() => setSelectedTask(task)}
                      className={`absolute rounded-md text-xs text-white p-2 font-medium shadow-sm transition-all hover:scale-[1.03] ${
                        isCompact ? "flex items-center justify-between space-x-1" : ""
                      }`}
                      style={{
                        top: `${task.top}%`,
                        height: `${task.height}%`,
                        width: `${width}%`,
                        left: `${left}%`,
                        backgroundColor: task.color,
                        minHeight: "18px",
                      }}
                    >
                      {isCompact ? (
                        <>
                          <span className="truncate">{task.title}</span>
                          <span className="text-[10px] opacity-80">{task.startTime}</span>
                        </>
                      ) : (
                        <>
                          <div className="truncate">{task.title}</div>
                          <div className="text-[10px] opacity-80">
                            {task.startTime} - {task.endTime}
                          </div>
                        </>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Task Modal */}
      {selectedTask && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-10"
          onClick={() => setSelectedTask(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white w-[380px] rounded-2xl shadow-xl p-6 relative animate-fadeIn flex flex-col"
          >
            <div
              className="w-14 h-1.5 rounded-full mx-auto mb-3"
              style={{ backgroundColor: selectedTask.color }}
            ></div>

            <h2 className="text-xl font-semibold mb-1">{selectedTask.title}</h2>
            <p className="text-sm text-gray-500 mb-3">
              {selectedTask.startTime} - {selectedTask.endTime} | {selectedTask.day}
            </p>

            <div className="mb-4">
              <h3 className="text-sm font-semibold text-gray-800 mb-1">Description</h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                This is an overview for <b>{selectedTask.title}</b>. Include detailed notes or meeting
                info here.
              </p>
            </div>

            <Button
              className="mt-auto bg-blue-500 text-white w-full hover:bg-blue-600 transition-all"
              onClick={() => setSelectedTask(null)}
            >
              Close
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

// Helper: get Date for clicked weekday (relative to current week)
function getDateFromWeekday(weekday: string, currentDate: Date) {
  const dayIndex = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"].indexOf(weekday);
  const diff = dayIndex - currentDate.getDay();
  const newDate = new Date(currentDate);
  newDate.setDate(currentDate.getDate() + diff);
  return newDate;
}
