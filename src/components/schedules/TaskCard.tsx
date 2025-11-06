import React from "react";

interface props {
  id: number;
  color: string;
  startTime: string;
  endTime: string;
  title: string;
}

const TaskCard = ({ id, color, startTime, endTime, title }: props) => {
  return (
    <div
      key={id}
      className="p-2 rounded-lg mb-2 text-xs font-medium text-white w-full shadow-sm"
      style={{ backgroundColor: color }}
    >
      <div>{title}</div>
      <div className="text-[10px] opacity-80">
        {startTime} - {endTime}
      </div>
    </div>
  );
};

export default TaskCard;
