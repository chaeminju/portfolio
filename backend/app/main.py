import time
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import Base, engine
from app.routes import todos, schedules


def init_db(retries=5, delay=3):
    """DB 테이블 생성 (재시도 로직 포함)"""
    for attempt in range(retries):
        try:
            Base.metadata.create_all(bind=engine)
            print("✅ Database tables created successfully.")
            return
        except Exception as e:
            if attempt < retries - 1:
                print(f"⚠️ DB connection attempt {attempt + 1}/{retries} failed: {e}")
                print(f"   Retrying in {delay}s...")
                time.sleep(delay)
            else:
                print(f"❌ Failed to connect to DB after {retries} attempts: {e}")
                raise


@asynccontextmanager
async def lifespan(app: FastAPI):
    # 서버 시작 시 테이블 생성
    init_db()
    yield
    # 서버 종료 시 정리


app = FastAPI(
    title="TODO & Schedule Management API",
    description="TODO 및 일정 관리 서비스 API",
    version="1.0.0",
    lifespan=lifespan,
)

# CORS 설정
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 라우터 등록
app.include_router(todos.router)
app.include_router(schedules.router)


@app.get("/")
def read_root():
    return {"message": "TODO & Schedule Management API"}


@app.get("/health")
def health_check():
    return {"status": "healthy"}
