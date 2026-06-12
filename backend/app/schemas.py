from pydantic import BaseModel
from datetime import datetime
from typing import Optional

# Todo Schemas
class TodoCreate(BaseModel):
    title: str
    description: Optional[str] = None
    priority: str = "medium"


class TodoUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    completed: Optional[bool] = None
    priority: Optional[str] = None


class TodoResponse(BaseModel):
    id: int
    title: str
    description: Optional[str]
    completed: bool
    priority: str
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


# Schedule Schemas
class ScheduleCreate(BaseModel):
    title: str
    description: Optional[str] = None
    start_date: datetime
    end_date: datetime
    location: Optional[str] = None
    category: Optional[str] = None
    reminder_enabled: bool = False
    reminder_minutes_before: int = 15


class ScheduleUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    start_date: Optional[datetime] = None
    end_date: Optional[datetime] = None
    location: Optional[str] = None
    category: Optional[str] = None
    reminder_enabled: Optional[bool] = None
    reminder_minutes_before: Optional[int] = None


class ScheduleResponse(BaseModel):
    id: int
    title: str
    description: Optional[str]
    start_date: datetime
    end_date: datetime
    location: Optional[str]
    category: Optional[str]
    reminder_enabled: bool
    reminder_minutes_before: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
