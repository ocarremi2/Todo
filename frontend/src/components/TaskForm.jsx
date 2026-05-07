import { useEffect, useState } from "react";

export default function TaskForm({ onSubmit, initial, onCancel }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (initial) {
      setTitle(initial.title);
      setDescription(initial.description || "");
    } else {
      setTitle("");
      setDescription("");
    }
  }, [initial]);

  const submit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onSubmit({ title: title.trim(), description: description.trim() });
    if (!initial) {
      setTitle("");
      setDescription("");
    }
  };

  return (
    <form className="task-form" onSubmit={submit}>
      <input
        type="text"
        placeholder="Título de la tarea"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Descripción (opcional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows={2}
      />
      <div className="form-actions">
        <button type="submit">{initial ? "Actualizar" : "Agregar"}</button>
        {initial && (
          <button type="button" onClick={onCancel}>
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}
