from datetime import datetime
from typing import Optional
from pydantic import BaseModel, Field
from models import TaskStatus


class TaskBase(BaseModel):
    title: str = Field(..., min_length=1, max_length=150)
    description: Optional[str] = None
    status: TaskStatus = TaskStatus.pendiente


class TaskCreate(TaskBase):
    pass


class TaskUpdate(BaseModel):
    title: Optional[str] = Field(None, min_length=1, max_length=150)
    description: Optional[str] = None
    status: Optional[TaskStatus] = None


class TaskOut(TaskBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
