"use client";
import React, { useRef, useState } from "react";

interface Props {
  children: React.ReactNode;
  onResize: (deltaY: number) => void;
}

export default function ResizableWrapper({ children, onResize }: Props) {
  const [isResizing, setIsResizing] = useState(false);
  const startY = useRef(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsResizing(true);
    startY.current = e.clientY;
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isResizing) return;
    const delta = e.clientY - startY.current;
    onResize(delta);
    startY.current = e.clientY;
  };

  const handleMouseUp = () => setIsResizing(false);

  React.useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, );

  return (
    <div className="relative">
      {children}
      <div
        onMouseDown={handleMouseDown}
        className="absolute bottom-0 left-0 right-0 h-2 cursor-s-resize bg-transparent"
      />
    </div>
  );
}
