const STATUS_OPTIONS = [
  { value: "pendiente", label: "Por hacer" },
  { value: "en_progreso", label: "Haciendo" },
  { value: "hecha", label: "Realizada" },
];

export default function TaskItem({ task, onEdit, onDelete, onStatusChange }) {
  return (
    <article className={`task-item status-${task.status}`}>
      <div className="task-info">
        <div className="task-title-row">
          <h3>{task.title}</h3>
          <span className={`badge badge-${task.status}`}>
            {STATUS_OPTIONS.find((s) => s.value === task.status)?.label}
          </span>
        </div>
        {task.description && <p>{task.description}</p>}
      </div>
      <div className="task-actions">
        <select
          value={task.status}
          onChange={(e) => onStatusChange(task.id, e.target.value)}
        >
          {STATUS_OPTIONS.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
        <button onClick={() => onEdit(task)}>Editar</button>
        <button className="danger" onClick={() => onDelete(task.id)}>
          Eliminar
        </button>
      </div>
    </article>
  );
}
