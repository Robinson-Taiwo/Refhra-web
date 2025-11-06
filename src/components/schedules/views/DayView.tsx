"use client";
import TaskCard from "@/components/schedules/TaskCard";
import React, { useState } from "react";
import TaskOverview from "./TaskOverview";

type Task = {
  id: number;
  title: string;
  startTime: string;
  endTime: string;
  color: string;
};

const hours = Array.from({ length: 24 }, (_, i) => i);

const sampleTasks: Task[] = [
  {
    id: 1,
    title: "Team Sync",
    startTime: "09:15",
    endTime: "09:45",
    color: "#60A5FA",
  },
  {
    id: 2,
    title: "Code Review",
    startTime: "10:00",
    endTime: "11:30",
    color: "#FACC15",
  },
  {
    id: 3,
    title: "Lunch",
    startTime: "13:00",
    endTime: "14:00",
    color: "#34D399",
  },
  {
    id: 4,
    title: "UI Design",
    startTime: "10:15",
    endTime: "10:30",
    color: "#F472B6",
  },
  {
    id: 5,
    title: "Product Check-in",
    startTime: "10:30",
    endTime: "10:45",
    color: "#C084FC",
  },
  {
    id: 6,
    title: "Research",
    startTime: "10:45",
    endTime: "11:00",
    color: "#A3E635",
  },
  {
    id: 7,
    title: "Test",
    startTime: "10:00",
    endTime: "10:10",
    color: "#FB923C",
  },
  {
    id: 8,
    title: "Bug Fix",
    startTime: "10:10",
    endTime: "10:20",
    color: "#F87171",
  },
  {
    id: 9,
    title: "Docs",
    startTime: "10:20",
    endTime: "10:30",
    color: "#4ADE80",
  },
  {
    id: 10,
    title: "Call",
    startTime: "10:30",
    endTime: "10:40",
    color: "#38BDF8",
  },
  {
    id: 11,
    title: "Call Ashia",
    startTime: "00:30",
    endTime: "01:40",
    color: "#38CDF8",
  },
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

export default function HorizontalDayView() {
  const [selectedHour, setSelectedHour] = useState<number | null>(null);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-semibold mb-6">
        Day View (Interactive Task Modal)
      </h1>

      <div className="grid grid-cols-6 gap-5">
        {hours.map((hour) => {
          const tasks = getTasksForHour(hour, sampleTasks);
          const visibleTasks = tasks.slice(0, 3);
          const hiddenCount = tasks.length - visibleTasks.length;

          return (
            <div
              key={hour}
              className="relative w-full h-56 bg-white rounded-2xl shadow-sm border border-gray-200 flex flex-col overflow-hidden hover:shadow-md transition-all"
            >
              {/* Hour Label */}
              <div className="text-center font-semibold text-sm py-2 border-b border-gray-100 bg-white rounded-t-2xl">
                {hour.toString().padStart(2, "0")}:00
              </div>

              {/* Task container */}
              <div className="flex-1 flex flex-col gap-1 p-2 overflow-hidden">
                <div className="flex flex-col overflow-auto">
                  {visibleTasks.map((task) => (
                    <button
                      key={task.id}
                      onClick={() => setSelectedTask(task)}
                      className="bg-transparent hover:bg-transparent cursor-pointer w-full block h-full"
                    >
                      <TaskCard
                        endTime={task.endTime}
                        startTime={task.startTime}
                        color={task.color}
                        id={task.id}
                        title={task.title}
                      />
                    </button>
                  ))}
                </div>

                {hiddenCount > 0 && (
                  <button
                    onClick={() => setSelectedHour(hour)}
                    className="text-[11px] text-blue-500 font-medium hover:underline mt-1"
                  >
                    + {hiddenCount} more
                  </button>
                )}
              </div>

              {/* Overflow tasks modal */}
              {selectedHour === hour && (
                <div
                  className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-10"
                  onClick={() => setSelectedHour(null)}
                >
                  <div
                    className="bg-white rounded-xl shadow-lg flex flex-col w-80 p-4 max-h-[400px] h-full overflow-auto"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="text-center font-semibold text-sm py-2 border-b border-gray-100 bg-white rounded-t-2xl">
                      {hour.toString().padStart(2, "0")}:00
                    </div>
                    <div className="flex flex-col overflow-auto">
                      {tasks.map((task) => (
                        <button
                          key={task.id}
                          onClick={() => setSelectedTask(task)}
                          className="bg-transparent hover:bg-transparent cursor-pointer w-full h-fit"
                        >
                          <TaskCard
                            endTime={task.endTime}
                            startTime={task.startTime}
                            color={task.color}
                            id={task.id}
                            title={task.title}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* 🧠 Task Overview Modal */}
      {selectedTask && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={() => setSelectedTask(null)}
        >
          <TaskOverview
            endTime={selectedTask.endTime}
            startTime={selectedTask.startTime}
            color={selectedTask.color}
            id={selectedTask.id}
                      title={selectedTask.title}
                      setSelectedTask={setSelectedTask}
          />
        </div>
      )}
    </div>
  );
}
