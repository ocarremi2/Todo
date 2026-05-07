import { useState } from "react";

export default function TaskItem({ task, onEdit, onDelete }) {
  const [dragging, setDragging] = useState(false);

  const onDragStart = (e) => {
    e.dataTransfer.setData("text/task-id", String(task.id));
    e.dataTransfer.effectAllowed = "move";
    setDragging(true);
  };

  const onDragEnd = () => setDragging(false);

  return (
    <article
      className={`task-item ${dragging ? "dragging" : ""}`}
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    >
      <div className="task-info">
        <h3>{task.title}</h3>
        {task.description && <p>{task.description}</p>}
      </div>
      <div className="task-actions">
        <button onClick={() => onEdit(task)}>Editar</button>
        <button className="danger" onClick={() => onDelete(task.id)}>
          Eliminar
        </button>
      </div>
    </article>
  );
}
