"use client";

import { useEffect, useState } from "react";
import TaskForm from "@/components/TaskForm";
import TaskList from "@/components/TaskList";

import { db } from "@/lib/firebase";

import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";

interface Task {
  id: string;
  title: string;
  completed: boolean;
}

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const fetchTasks = async () => {
    const snapshot = await getDocs(
      collection(db, "tasks")
    );

    const taskData = snapshot.docs.map((docItem) => ({
      id: docItem.id,
      ...(docItem.data() as Omit<Task, "id">),
    }));

    setTasks(taskData);
  };

  const addTask = async (title: string) => {
    await addDoc(collection(db, "tasks"), {
      title,
      completed: false,
    });

    fetchTasks();
  };

  const deleteTask = async (id: string) => {
    await deleteDoc(doc(db, "tasks", id));
    fetchTasks();
  };

  const completeTask = async (id: string) => {
    await updateDoc(
      doc(db, "tasks", id),
      {
        completed: true,
      }
    );

    fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <main className="p-10">
      <h1 className="text-3xl font-bold mb-5">
        Firebase CRUD App
      </h1>
      <TaskForm addTask={addTask} />
      <TaskList
        tasks={tasks}
        deleteTask={deleteTask}
        completeTask={completeTask}
      />
    </main>
  );
}