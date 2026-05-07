import enum
from datetime import datetime
from sqlalchemy import Column, Integer, String, Text, Enum, DateTime
from database import Base


class TaskStatus(str, enum.Enum):
    pendiente = "pendiente"
    en_progreso = "en_progreso"
    hecha = "hecha"


class Task(Base):
    __tablename__ = "tasks"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(150), nullable=False)
    description = Column(Text, nullable=True)
    status = Column(
        Enum(TaskStatus), nullable=False, default=TaskStatus.pendiente
    )
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(
        DateTime, default=datetime.utcnow, onupdate=datetime.utcnow
    )
