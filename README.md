# To-Do App (FastAPI + MySQL + React)

Aplicación de lista de tareas con backend en **FastAPI**, base de datos **MySQL** y frontend en **React (Vite)**.

## Funcionalidades

- Crear, editar y eliminar tareas
- Estados: `pendiente` (por hacer), `en_progreso` (haciendo), `hecha`
- Filtrar por estado
- Cambio rápido de estado desde la lista

## Estructura

```
To_Do/
├── backend/    FastAPI + SQLAlchemy
└── frontend/   React + Vite + Axios
```

---

## 1) Configurar la base de datos MySQL

Conéctate a MySQL y crea la base de datos:

```sql
CREATE DATABASE todo_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

Las tablas se crean automáticamente al iniciar el backend.

## 2) Backend (FastAPI)

```powershell
cd backend
python -m venv venv
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

Copia `.env.example` a `.env` y ajusta tus credenciales:

```powershell
Copy-Item .env.example .env
```

Edita `.env`:
```
DB_USER=root
DB_PASSWORD=tu_password
DB_HOST=localhost
DB_PORT=3306
DB_NAME=todo_db
```

Inicia el servidor:

```powershell
uvicorn main:app --reload
```

API disponible en `http://localhost:8000` y documentación interactiva en `http://localhost:8000/docs`.

## 3) Frontend (React)

En otra terminal:

```powershell
cd frontend
npm install
npm run dev
```

App disponible en `http://localhost:5173`.

---

## Endpoints principales

| Método | Ruta              | Descripción                  |
|--------|-------------------|------------------------------|
| GET    | `/tasks`          | Listar (filtro `?status=`)   |
| GET    | `/tasks/{id}`     | Obtener una tarea            |
| POST   | `/tasks`          | Crear tarea                  |
| PUT    | `/tasks/{id}`     | Actualizar tarea             |
| DELETE | `/tasks/{id}`     | Eliminar tarea               |

Ejemplo de body para crear:
```json
{
  "title": "Comprar pan",
  "description": "En la panadería de la esquina",
  "status": "pendiente"
}
```
