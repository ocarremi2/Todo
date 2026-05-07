import { useState } from "react";
import TaskItem from "./TaskItem.jsx";

export default function Column({
  status,
  title,
  tasks,
  onDropTask,
  onEdit,
  onDelete,
}) {
  const [over, setOver] = useState(false);

  const onDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    if (!over) setOver(true);
  };

  const onDragLeave = (e) => {
    if (e.currentTarget.contains(e.relatedTarget)) return;
    setOver(false);
  };

  const onDrop = (e) => {
    e.preventDefault();
    setOver(false);
    const id = Number(e.dataTransfer.getData("text/task-id"));
    if (id) onDropTask(id, status);
  };

  return (
    <div
      className={`column column-${status} ${over ? "drag-over" : ""}`}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
    >
      <div className="column-header">
        <h2>{title}</h2>
        <span className="count">{tasks.length}</span>
      </div>
      <div className="column-body">
        {tasks.length === 0 ? (
          <p className="empty">Suelta tareas aquí</p>
        ) : (
          tasks.map((t) => (
            <TaskItem
              key={t.id}
              task={t}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))
        )}
      </div>
    </div>
  );
}
