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
    <div className="task-list">
      {tasks.map((task) => (
        <div
          key={task.id}
          className="task-row flex items-center gap-3 mb-3"
        >
          <span
            className="task-title"
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
              className="task-complete-btn border px-2"
            >
              Complete
            </button>
          )}

          <button
            onClick={() => deleteTask(task.id)}
            className="task-delete-btn border px-2"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}