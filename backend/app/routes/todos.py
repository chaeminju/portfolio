from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import Optional
from app import models, schemas
from app.database import get_db

router = APIRouter(prefix="/api/todos", tags=["todos"])


@router.get("/", response_model=list[schemas.TodoResponse])
def get_todos(
    skip: int = Query(0, ge=0),
    limit: int = Query(10, ge=1, le=100),
    completed: Optional[bool] = Query(None),
    db: Session = Depends(get_db)
):
    """모든 TODO 조회"""
    query = db.query(models.Todo)

    if completed is not None:
        query = query.filter(models.Todo.completed == completed)

    return query.order_by(models.Todo.created_at.desc()).offset(skip).limit(limit).all()


@router.get("/{todo_id}", response_model=schemas.TodoResponse)
def get_todo(todo_id: int, db: Session = Depends(get_db)):
    """특정 TODO 조회"""
    todo = db.query(models.Todo).filter(models.Todo.id == todo_id).first()
    if not todo:
        raise HTTPException(status_code=404, detail="TODO not found")
    return todo


@router.post("/", response_model=schemas.TodoResponse, status_code=201)
def create_todo(todo: schemas.TodoCreate, db: Session = Depends(get_db)):
    """새로운 TODO 생성"""
    db_todo = models.Todo(**todo.model_dump())
    db.add(db_todo)
    db.commit()
    db.refresh(db_todo)
    return db_todo


@router.put("/{todo_id}", response_model=schemas.TodoResponse)
def update_todo(
    todo_id: int,
    todo_update: schemas.TodoUpdate,
    db: Session = Depends(get_db)
):
    """TODO 업데이트"""
    db_todo = db.query(models.Todo).filter(models.Todo.id == todo_id).first()
    if not db_todo:
        raise HTTPException(status_code=404, detail="TODO not found")

    update_data = todo_update.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_todo, field, value)

    db.commit()
    db.refresh(db_todo)
    return db_todo


@router.delete("/{todo_id}")
def delete_todo(todo_id: int, db: Session = Depends(get_db)):
    """TODO 삭제"""
    db_todo = db.query(models.Todo).filter(models.Todo.id == todo_id).first()
    if not db_todo:
        raise HTTPException(status_code=404, detail="TODO not found")

    db.delete(db_todo)
    db.commit()
    return {"message": "TODO deleted successfully"}
