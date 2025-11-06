import { Button } from "@/components/ui/button";
import React from "react";

interface Task {
  id: number;
  color: string;
  startTime: string;
  endTime: string;
  title: string;
  description?: string;
  priority?: "Low" | "Medium" | "High";
}

interface Props extends Task {
  setSelectedTask: (arg: Task | null) => void;
}

const TaskOverview = ({
  color,
  startTime,
  endTime,
  title,
  setSelectedTask,
}: Props) => {
  // Dummy placeholders
  const description =
    "This task involves reviewing key deliverables and ensuring alignment with design and engineering goals.";
  const priority: "Low" | "Medium" | "High" = "High";

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="bg-white w-[380px] rounded-2xl shadow-xl p-6 relative animate-fadeIn flex flex-col"
    >
      {/* Accent Bar */}
      <div
        className="w-14 h-1.5 rounded-full mx-auto mb-3"
        style={{ backgroundColor: color }}
      ></div>

      {/* Header */}
      <h2 className="text-xl font-semibold mb-1">{title}</h2>
      <p className="text-sm text-gray-500 mb-3">
        {startTime} - {endTime}
      </p>

      {/* Description */}
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-gray-800 mb-1">
          Description
        </h3>
        <p className="text-sm text-gray-700 leading-relaxed">{description}</p>
      </div>

      {/* Priority */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-gray-800 mb-1">Priority</h3>
        <span
          className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${
            priority === "High"
              ? "bg-red-100 text-red-700"
              : priority === "Medium"
              ? "bg-yellow-100 text-yellow-700"
              : "bg-green-100 text-green-700"
          }`}
        >
          {priority}
        </span>
      </div>

      {/* Close Button */}
      <Button
        className="mt-auto bg-blue-500 text-white w-full hover:bg-blue-600 transition-all"
        onClick={() => setSelectedTask(null)}
      >
        Close
      </Button>
    </div>
  );
};

export default TaskOverview;
