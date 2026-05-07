import { useEffect, useState } from "react";
import TaskForm from "./components/TaskForm.jsx";
import TaskItem from "./components/TaskItem.jsx";
import { listTasks, createTask, updateTask, deleteTask } from "./api.js";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [editing, setEditing] = useState(null);
  const [error, setError] = useState("");

  const load = async () => {
    try {
      setError("");
      setTasks(await listTasks());
    } catch (e) {
      setError("No se pudo conectar con el backend");
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleCreate = async ({ title, description }) => {
    await createTask({ title, description, status: "pendiente" });
    await load();
  };

  const handleUpdate = async (id, data) => {
    await updateTask(id, data);
    setEditing(null);
    await load();
  };

  const handleDelete = async (id) => {
    if (!confirm("¿Eliminar esta tarea?")) return;
    await deleteTask(id);
    await load();
  };

  const handleStatusChange = async (id, status) => {
    const task = tasks.find((t) => t.id === id);
    if (!task || task.status === status) return;
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status } : t))
    );
    try {
      await updateTask(id, { status });
    } catch (e) {
      await load();
    }
  };

  return (
    <div className="container">
      <h1>Lista de Tareas</h1>

      <TaskForm
        onSubmit={
          editing
            ? (data) => handleUpdate(editing.id, data)
            : handleCreate
        }
        initial={editing}
        onCancel={() => setEditing(null)}
      />

      {error && <div className="error">{error}</div>}

      <div className="task-list">
        {tasks.length === 0 ? (
          <p className="empty">No hay tareas todavía</p>
        ) : (
          tasks.map((t) => (
            <TaskItem
              key={t.id}
              task={t}
              onEdit={setEditing}
              onDelete={handleDelete}
              onStatusChange={handleStatusChange}
            />
          ))
        )}
      </div>
    </div>
  );
}
