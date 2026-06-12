"use client";

interface Task {
  id: string;
  title: string;
  completed: boolean;
}

interface Props {
  tasks: Task[];
  deleteTask: (id: string) => Promise<void>;
  completeTask: (id: string) => Promise<void>;
}

export default function TaskList({
  tasks,
  deleteTask,
  completeTask,
}: Props) {
  return (
    <div>
      {tasks.map((task) => (
        <div
          key={task.id}
          className="flex items-center gap-3 mb-3"
        >
          <span
            style={{
              textDecoration: task.completed
                ? "line-through"
                : "none",
            }}
          >
            {task.title}
          </span>

          {!task.completed && (
            <button
              onClick={() => completeTask(task.id)}
              className="border px-2"
            >
              Complete
            </button>
          )}

          <button
            onClick={() => deleteTask(task.id)}
            className="border px-2"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}