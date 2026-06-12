from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import Optional
from app import models, schemas
from app.database import get_db

router = APIRouter(prefix="/api/schedules", tags=["schedules"])


@router.get("/", response_model=list[schemas.ScheduleResponse])
def get_schedules(
    skip: int = Query(0, ge=0),
    limit: int = Query(10, ge=1, le=100),
    category: Optional[str] = Query(None),
    db: Session = Depends(get_db)
):
    """모든 일정 조회"""
    query = db.query(models.Schedule)

    if category:
        query = query.filter(models.Schedule.category == category)

    return query.order_by(models.Schedule.start_date).offset(skip).limit(limit).all()


@router.get("/{schedule_id}", response_model=schemas.ScheduleResponse)
def get_schedule(schedule_id: int, db: Session = Depends(get_db)):
    """특정 일정 조회"""
    schedule = db.query(models.Schedule).filter(models.Schedule.id == schedule_id).first()
    if not schedule:
        raise HTTPException(status_code=404, detail="Schedule not found")
    return schedule


@router.post("/", response_model=schemas.ScheduleResponse, status_code=201)
def create_schedule(schedule: schemas.ScheduleCreate, db: Session = Depends(get_db)):
    """새로운 일정 생성"""
    if schedule.start_date >= schedule.end_date:
        raise HTTPException(status_code=400, detail="Start date must be before end date")

    db_schedule = models.Schedule(**schedule.model_dump())
    db.add(db_schedule)
    db.commit()
    db.refresh(db_schedule)
    return db_schedule


@router.put("/{schedule_id}", response_model=schemas.ScheduleResponse)
def update_schedule(
    schedule_id: int,
    schedule_update: schemas.ScheduleUpdate,
    db: Session = Depends(get_db)
):
    """일정 업데이트"""
    db_schedule = db.query(models.Schedule).filter(models.Schedule.id == schedule_id).first()
    if not db_schedule:
        raise HTTPException(status_code=404, detail="Schedule not found")

    update_data = schedule_update.model_dump(exclude_unset=True)

    # 날짜 검증
    if "start_date" in update_data or "end_date" in update_data:
        start_date = update_data.get("start_date", db_schedule.start_date)
        end_date = update_data.get("end_date", db_schedule.end_date)
        if start_date >= end_date:
            raise HTTPException(status_code=400, detail="Start date must be before end date")

    for field, value in update_data.items():
        setattr(db_schedule, field, value)

    db.commit()
    db.refresh(db_schedule)
    return db_schedule


@router.delete("/{schedule_id}")
def delete_schedule(schedule_id: int, db: Session = Depends(get_db)):
    """일정 삭제"""
    db_schedule = db.query(models.Schedule).filter(models.Schedule.id == schedule_id).first()
    if not db_schedule:
        raise HTTPException(status_code=404, detail="Schedule not found")

    db.delete(db_schedule)
    db.commit()
    return {"message": "Schedule deleted successfully"}
