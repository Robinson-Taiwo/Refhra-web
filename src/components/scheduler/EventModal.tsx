"use client";
import React, { useEffect, useState } from "react";
import type { DayEvent } from "./types";

interface Props {
  initialHour: number | null;
  initialEvent?: DayEvent | null;
  onClose: () => void;
  onSave: (ev: Omit<DayEvent, "id"> & { id?: string }) => void;
  onDelete?: (id: string) => void;
}

export default function EventModal({ initialHour, initialEvent, onClose, onSave, onDelete }: Props) {
  const [title, setTitle] = useState(initialEvent?.title ?? "");
  const [duration, setDuration] = useState<number>(initialEvent?.duration ?? 1);
  const [startHour, setStartHour] = useState<number>(initialEvent?.startHour ?? (initialHour ?? 9));
  const [color, setColor] = useState(initialEvent?.color ?? "#3b82f6");
  const [description, setDescription] = useState(initialEvent?.description ?? "");

  useEffect(() => {
    if (initialEvent) {
      setTitle(initialEvent.title);
      setDuration(initialEvent.duration);
      setStartHour(initialEvent.startHour);
      setColor(initialEvent.color ?? "#3b82f6");
      setDescription(initialEvent.description ?? "");
    } else if (initialHour !== null) {
      setStartHour(initialHour);
      setDuration(1);
    }
  }, [initialHour, initialEvent]);

  if (initialHour === null && !initialEvent) return null;

  const save = () => {
    if (!title.trim()) {
      alert("Please provide a title.");
      return;
    }
    onSave({
      id: initialEvent?.id,
      title: title.trim(),
      startHour,
      duration: Math.max(1, Math.min(24 - startHour, Math.round(duration))),
      color,
      description,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-[360px] bg-white rounded-xl shadow-lg p-4">
        <h3 className="text-lg font-semibold mb-3">{initialEvent ? "Event details" : "Create event"}</h3>

        <label className="block text-xs text-gray-600">Title</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border rounded-md px-2 py-2 mb-3"
          placeholder="Add title"
        />

        <div className="grid grid-cols-2 gap-2 mb-3">
          <div>
            <label className="block text-xs text-gray-600">Start hour</label>
            <select
              value={startHour}
              onChange={(e) => setStartHour(Number(e.target.value))}
              className="w-full border rounded-md px-2 py-2"
            >
              {Array.from({ length: 24 }, (_, i) => i).map((h) => (
                <option key={h} value={h}>
                  {h === 0 ? "12 AM" : h < 12 ? `${h} AM` : h === 12 ? "12 PM" : `${h - 12} PM`}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs text-gray-600">Duration (hrs)</label>
            <input
              type="number"
              min={1}
              max={24 - startHour}
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              className="w-full border rounded-md px-2 py-2"
            />
          </div>
        </div>

        <label className="block text-xs text-gray-600">Color</label>
        <input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="mb-3" />

        <label className="block text-xs text-gray-600">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          className="w-full border rounded-md px-2 py-2 mb-3"
        />

        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            {initialEvent && onDelete && (
              <button
                onClick={() => {
                  if (initialEvent?.id && confirm("Delete this event?")) {
                    onDelete(initialEvent.id);
                    onClose();
                  }
                }}
                className="px-3 py-1 text-sm text-red-600"
              >
                Delete
              </button>
            )}
          </div>

          <div className="flex gap-2">
            <button onClick={onClose} className="px-3 py-1 border rounded-md text-sm">
              Cancel
            </button>
            <button onClick={save} className="px-3 py-1 bg-blue-600 text-white rounded-md text-sm">
              {initialEvent ? "Update" : "Create"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
