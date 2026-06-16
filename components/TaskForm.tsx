"use client";

import { useState } from "react";

interface Props {
  addTask: (title: string) => Promise<void>;
}

export default function TaskForm({ addTask }: Props) {
  const [title, setTitle] = useState("");

  const handleSubmit = async () => {
    if (!title.trim()) return;

    await addTask(title);
    setTitle("");
  };

  return (
    <div className="task-form flex gap-2 mb-5">
      <input
        type="text"
        placeholder="Enter Task"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="task-input border p-2 rounded"
      />

      <button
        onClick={handleSubmit}
        className="task-add-btn border px-4 py-2 rounded"
      >
        Add
      </button>
    </div>
  );
}