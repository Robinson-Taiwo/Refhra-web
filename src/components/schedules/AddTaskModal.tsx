import React from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface Task {
  showModal: boolean;
  setShowModal: (open: boolean) => void;
  color: string;
  timeline: string;
  description: string;
  title: string;
  priority: string;
  handleSaveTask: () => void;
  setNewTask: React.Dispatch<
    React.SetStateAction<{
      title: string;
      description: string;
      priority: string;
      timeline: string;
      color: string;
    }>
  >;
  setSelectedTask: (arg: Task | null) => void;
}

const AddTaskModal = ({
  showModal,
  setShowModal,
  title,
  setNewTask,
  handleSaveTask,
  timeline,
  color,
  description,
  priority,
}: Task) => {
  return (
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
              value={title}
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
              value={description}
              onChange={(e) =>
                setNewTask((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
            />
          </div>

          {/* Priority */}
          <div className="space-y-1">
            <Label>Priority</Label>
            <Select
              value={priority}
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
              value={timeline}
              onChange={(e) =>
                setNewTask((prev) => ({ ...prev, timeline: e.target.value }))
              }
            />
          </div>

          {/* Tag Color */}
          <div className="space-y-1">
            <Label>Tag Color</Label>
            <div className="flex rounded-full items-center gap-2">
              <input
                type="color"
                value={color}
                onChange={(e) =>
                  setNewTask((prev) => ({ ...prev, color: e.target.value }))
                }
                className="w-10 h-10 rounded-full cursor-pointer border border-gray-300"
              />
              <span className="text-sm text-gray-500">
                Pick a color to tag this event
              </span>
            </div>
          </div>

          {/* Actions */}
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
  );
};

export default AddTaskModal;
