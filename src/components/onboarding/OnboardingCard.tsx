"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

type Section = "welcome" | "basicInfo" | "preferences" | "categories" | "tasks" | "summary";

type Category = {
  id: string;
  title: string;
  description: string;
  sampleTasks: string[];
};

const categories: Category[] = [
  {
    id: "academic",
    title: "Academic / School",
    description:
      "Stay on top of lectures, assignments, and exams without cramming. Perfect for students prioritizing academic performance.",
    sampleTasks: [
      "Attend Lecture (Course-specific)",
      "Revise Lecture Notes",
      "Group Study Session",
      "Assignment / Project Submission",
      "Midterm / Exam Revision Plan",
    ],
  },
  {
    id: "skill",
    title: "Skill Development / Career",
    description:
      "Build tech or professional skills alongside school. Great for internships, challenges, or side projects.",
    sampleTasks: [
      "Online Course Session",
      "Daily Coding Challenge",
      "Portfolio Update",
      "Internship / Job Application",
      "Side Project Development",
    ],
  },
  {
    id: "wellness",
    title: "Wellness & Mental Health",
    description:
      "Prioritize balance and calm. Prevent burnout with rest, reflection, and care.",
    sampleTasks: [
      "Morning Meditation",
      "Workout Session",
      "Nap / Rest Block",
      "Journaling",
      "Therapy / Check-in",
    ],
  },
  // add more categories here...
];

export default function OnboardingCard() {
  const [section, setSection] = useState<Section>("welcome");
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedTasks, setSelectedTasks] = useState<string[]>([]);

  const handleTaskToggle = (task: string) => {
    setSelectedTasks((prev) =>
      prev.includes(task) ? prev.filter((t) => t !== task) : [...prev, task]
    );
  };

  const closeOnboarding = () => {
    console.log("🎯 Finished onboarding with:");
    console.log("Category:", selectedCategory?.title);
    console.log("Tasks:", selectedTasks);
  };

  return (
    <div className="fixed inset-0 bg-black/50 bg-opacity-60 flex items-center justify-center z-50">
      <motion.div
        key={section}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -40 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-2xl shadow-lg w-full max-w-2xl p-6 relative"
      >
        {/* Close Button */}
        <button
          onClick={closeOnboarding}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
        >
          <X size={20} />
        </button>

        <AnimatePresence mode="wait">
          {section === "welcome" && (
            <div>
              <h2 className="text-xl font-bold mb-4">Welcome 🎉</h2>
              <p className="text-gray-600 mb-6">
                Let’s personalize your dashboard in a few steps.
              </p>
              <button
                onClick={() => setSection("basicInfo")}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg"
              >
                Get Started →
              </button>
            </div>
          )}

          {section === "basicInfo" && (
            <div>
              <h2 className="text-xl font-bold mb-4">Basic Info</h2>
              <input
                placeholder="Enter name"
                className="w-full border rounded-lg p-2 mb-3"
              />
              <button
                onClick={() => setSection("preferences")}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg"
              >
                Continue →
              </button>
            </div>
          )}

          {section === "preferences" && (
            <div>
              <h2 className="text-xl font-bold mb-4">Preferences</h2>
              <p className="text-gray-600 mb-4">
                Pick how you like to work/study.
              </p>
              {/* preference inputs */}
              <button
                onClick={() => setSection("categories")}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg"
              >
                Next →
              </button>
            </div>
          )}

          {section === "categories" && (
            <div>
              <h2 className="text-xl font-bold mb-4">Choose Your Starter Category 🧩</h2>
              <p className="text-gray-600 mb-6">
                You’ll be able to borrow tasks from other categories later.
              </p>
              <div className="grid gap-4">
                {categories.map((cat) => (
                  <div
                    key={cat.id}
                    onClick={() => {
                      setSelectedCategory(cat);
                      setSection("tasks");
                    }}
                    className="border p-4 rounded-lg hover:bg-gray-100 cursor-pointer"
                  >
                    <h3 className="font-semibold">{cat.title}</h3>
                    <p className="text-sm text-gray-600">{cat.description}</p>
                  </div>
                ))}
              </div>
              <button
                onClick={() => setSection("preferences")}
                className="mt-4 text-sm text-gray-500 hover:underline"
              >
                ← Back
              </button>
            </div>
          )}

          {section === "tasks" && selectedCategory && (
            <div>
              <h2 className="text-xl font-bold mb-2">{selectedCategory.title}</h2>
              <p className="text-gray-600 mb-4">{selectedCategory.description}</p>

              <div className="flex flex-col gap-2">
                {selectedCategory.sampleTasks.map((task) => (
                  <label
                    key={task}
                    className="flex items-center gap-2 border rounded-lg p-2"
                  >
                    <input
                      type="checkbox"
                      checked={selectedTasks.includes(task)}
                      onChange={() => handleTaskToggle(task)}
                    />
                    {task}
                  </label>
                ))}
              </div>

              <div className="mt-4 flex justify-between">
                <button onClick={() => setSection("categories")} className="text-gray-500">
                  ← Back
                </button>
                <button
                  onClick={() => setSection("summary")}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                >
                  Continue →
                </button>
              </div>
            </div>
          )}

          {section === "summary" && selectedCategory && (
            <div>
              <h2 className="text-xl font-bold mb-4">Summary ✅</h2>
              <p className="text-gray-600 mb-4">
                You chose the <span className="font-semibold">{selectedCategory.title}</span>{" "}
                category and these starter tasks:
              </p>
              <ul className="list-disc pl-5 mb-4 text-gray-700">
                {selectedTasks.length > 0 ? (
                  selectedTasks.map((task) => <li key={task}>{task}</li>)
                ) : (
                  <li className="italic text-gray-500">No tasks selected</li>
                )}
              </ul>
              <div className="flex justify-between">
                <button
                  onClick={() => setSection("tasks")}
                  className="text-gray-500"
                >
                  ← Back
                </button>
                <button
                  onClick={closeOnboarding}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg"
                >
                  Finish 🎯
                </button>
              </div>
            </div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
