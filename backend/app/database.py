from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
import os
import time

DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://portfolio:portfolio123@localhost:5432/portfolio_db")

# DB 연결 재시도 로직 포함
def create_engine_with_retry(url, retries=5, delay=3):
    for attempt in range(retries):
        try:
            eng = create_engine(url, pool_pre_ping=True)
            # 연결 테스트
            with eng.connect() as conn:
                conn.execute(eng.dialect.do_ping(conn) if hasattr(eng.dialect, 'do_ping') else conn.connection)
            return eng
        except Exception as e:
            if attempt < retries - 1:
                print(f"DB connection attempt {attempt + 1} failed: {e}. Retrying in {delay}s...")
                time.sleep(delay)
            else:
                # 마지막 시도에서는 그냥 엔진을 반환 (lazy connect)
                print(f"DB connection failed after {retries} attempts. Using lazy connection.")
                return create_engine(url, pool_pre_ping=True)

engine = create_engine(DATABASE_URL, pool_pre_ping=True)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
