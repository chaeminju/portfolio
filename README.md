# TODO & Schedule Management Service

## 기능

### TODO 관리
- ✅ TODO 생성, 조회, 수정, 삭제 (CRUD)
- 📊 우선순위 설정 (Low, Medium, High)
- ✓ 완료 상태 관리
- 🔍 상태별 필터링 (All, Active, Completed)

### 일정 관리
- 📅 일정 생성, 조회, 수정, 삭제 (CRUD)
- 🕐 시작 시간, 종료 시간 설정
- 📍 위치 정보 추가
- 🏷️ 카테고리 분류 (Personal, Work, Meeting, Birthday, Holiday)
- 🔔 알림 설정 (알림 시간 조정 가능)

## 프로젝트 구조

```
portfolio/
├── backend/                      # FastAPI 백엔드
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py              # FastAPI 애플리케이션 진입점
│   │   ├── database.py          # 데이터베이스 연결 설정
│   │   ├── models.py            # SQLAlchemy 모델 정의
│   │   ├── schemas.py           # Pydantic 스키마 정의
│   │   └── routes/
│   │       ├── todos.py         # TODO API 라우트
│   │       └── schedules.py     # Schedule API 라우트
│   ├── Dockerfile               # Docker 이미지 설정
│   └── requirements.txt          # Python 패키지 의존성
│
├── frontend/                     # React 프론트엔드
│   ├── src/
│   │   ├── main.jsx             # 진입점
│   │   ├── App.jsx              # 메인 애플리케이션
│   │   ├── api.js               # API 호출 유틸리티
│   │   ├── components/          # React 컴포넌트
│   │   │   ├── TodoForm.jsx
│   │   │   ├── TodoList.jsx
│   │   │   ├── TodoItem.jsx
│   │   │   ├── ScheduleForm.jsx
│   │   │   ├── ScheduleList.jsx
│   │   │   └── ScheduleItem.jsx
│   │   ├── pages/               # 페이지 컴포넌트
│   │   │   ├── TodoPage.jsx
│   │   │   └── SchedulePage.jsx
│   │   ├── styles/              # CSS 스타일
│   │   │   ├── Form.css
│   │   │   ├── List.css
│   │   │   ├── Item.css
│   │   │   └── Page.css
│   │   └── index.css
│   ├── public/
│   │   └── index.html
│   ├── Dockerfile               # Docker 이미지 설정
│   ├── package.json
│   └── vite.config.js
│
├── db/
│   └── init.sql                 # 데이터베이스 초기화 스크립트
│
├── docker-compose.yml           # Docker Compose 설정
└── README.md

```
## 3-Tier Architecture

본 프로젝트는 Presentation Tier, Application Tier, Data Tier로 구성된
3-Tier Architecture를 기반으로 설계하였다.

| Tier              | 구성                | 역할                     |
| ----------------- | ----------------- | ---------------------- |
| Presentation Tier | React (Frontend)  | 사용자 인터페이스 제공 및 API 요청  |
| Application Tier  | FastAPI (Backend) | 비즈니스 로직 처리 및 데이터 검증    |
| Data Tier         | PostgreSQL        | TODO 및 Schedule 데이터 저장 |

## 시스템 흐름도
                User
                  │
                  ▼
        ┌──────────────────┐
        │  React Frontend  │
        │ Presentation Tier│
        │    Port 3000     │
        └────────┬─────────┘
                 │ HTTP (REST API)
                 ▼
        ┌──────────────────┐
        │   FastAPI API    │
        │ Application Tier │
        │    Port 8000     │
        └────────┬─────────┘
                 │ SQLAlchemy
                 ▼
        ┌──────────────────┐
        │   PostgreSQL     │
        │    Data Tier     │
        │    Port 5432     │
        └──────────────────┘

## Container Description

### Frontend Container
- React + Vite 기반 SPA 제공
- 사용자 입력 처리
- FastAPI REST API 호출
- Port: 3000

### Backend Container
- FastAPI 서버 실행
- TODO 및 Schedule CRUD 처리
- SQLAlchemy ORM 사용
- PostgreSQL과 연결
- Port: 8000

### Database Container
- PostgreSQL 데이터 저장
- todos, schedules 테이블 관리
- Port: 5432

## 기술 스택

### Backend
- **FastAPI** - 고성능 Python 웹 프레임워크
- **SQLAlchemy** - Python ORM
- **PostgreSQL** - 관계형 데이터베이스
- **Uvicorn** - ASGI 서버
- **Pydantic** - 데이터 검증

### Frontend
- **React 18** - UI 라이브러리
- **Vite** - 빌드 도구
- **Axios** - HTTP 클라이언트
- **React Router** - 라우팅

### Deployment
- **Docker** - 컨테이너화
- **Docker Compose** - 멀티 컨테이너 오케스트레이션

## 설치 및 실행

### 전제 조건
- Docker와 Docker Compose가 설치되어 있어야 합니다
- 또는 Node.js (v18+), Python (v3.11+), PostgreSQL이 설치되어 있어야 합니다

### Docker Compose를 사용한 실행 (권장)

```bash
# 프로젝트 디렉토리로 이동
cd portfolio

# 모든 서비스 시작
docker-compose up -d

# 로그 확인
docker-compose logs -f

# 서비스 중지
docker-compose down
```

서비스가 시작되면:
- **프론트엔드**: http://localhost:3000
- **백엔드 API**: http://localhost:8000
- **API 문서**: http://localhost:8000/docs
- **데이터베이스**: localhost:5432 (postgres)

### 로컬 환경에서의 실행

#### 백엔드 설정

```bash
# backend 디렉토리로 이동
cd backend

# 가상 환경 생성
python -m venv venv

# 가상 환경 활성화
# Windows
venv\Scripts\activate
# Linux/Mac
source venv/bin/activate

# 의존성 설치
pip install -r requirements.txt

# 데이터베이스 마이그레이션 (필요시)
# alembic upgrade head

# 백엔드 서버 시작
uvicorn app.main:app --reload
```

#### 프론트엔드 설정

```bash
# frontend 디렉토리로 이동
cd frontend

# 의존성 설치
npm install

# 개발 서버 시작
npm run dev
```

#### 데이터베이스 설정

```bash
# PostgreSQL 서버 시작
# Docker를 사용하는 경우:
docker run --name portfolio_db \
  -e POSTGRES_USER=portfolio \
  -e POSTGRES_PASSWORD=portfolio123 \
  -e POSTGRES_DB=portfolio_db \
  -p 5432:5432 \
  postgres:15-alpine

# 또는 이미 설치된 PostgreSQL 서버에서:
# init.sql 파일로 데이터베이스 초기화
psql -U portfolio -d portfolio_db -f db/init.sql
```

## API 문서

### FastAPI 자동 문서
서버 실행 후 다음 URL에서 Swagger UI를 통해 API를 확인할 수 있습니다:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

### TODO API 엔드포인트

#### 모든 TODO 조회
```
GET /api/todos/?skip=0&limit=10&completed=false
```

#### 특정 TODO 조회
```
GET /api/todos/{todo_id}
```

#### TODO 생성
```
POST /api/todos/
Content-Type: application/json

{
  "title": "Buy groceries",
  "description": "Milk, eggs, bread",
  "priority": "medium"
}
```

#### TODO 수정
```
PUT /api/todos/{todo_id}
Content-Type: application/json

{
  "title": "Buy groceries",
  "completed": true,
  "priority": "high"
}
```

#### TODO 삭제
```
DELETE /api/todos/{todo_id}
```

### Schedule API 엔드포인트

#### 모든 일정 조회
```
GET /api/schedules/?skip=0&limit=10&category=work
```

#### 특정 일정 조회
```
GET /api/schedules/{schedule_id}
```

#### 일정 생성
```
POST /api/schedules/
Content-Type: application/json

{
  "title": "Team Meeting",
  "description": "Quarterly review",
  "start_date": "2024-01-15T14:00:00",
  "end_date": "2024-01-15T15:00:00",
  "location": "Conference Room A",
  "category": "work",
  "reminder_enabled": true,
  "reminder_minutes_before": 15
}
```

#### 일정 수정
```
PUT /api/schedules/{schedule_id}
Content-Type: application/json

{
  "title": "Team Meeting",
  "location": "Virtual Meeting"
}
```

#### 일정 삭제
```
DELETE /api/schedules/{schedule_id}
```

## 데이터베이스 스키마

### todos 테이블
```sql
CREATE TABLE todos (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    completed BOOLEAN DEFAULT FALSE,
    priority VARCHAR(20) DEFAULT 'medium',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### schedules 테이블
```sql
CREATE TABLE schedules (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    start_date TIMESTAMP NOT NULL,
    end_date TIMESTAMP NOT NULL,
    location VARCHAR(255),
    category VARCHAR(50),
    reminder_enabled BOOLEAN DEFAULT FALSE,
    reminder_minutes_before INTEGER DEFAULT 15,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 환경 변수

`.env` 파일 (선택사항):

```
DATABASE_URL=postgresql://portfolio:portfolio123@db:5432/portfolio_db
REACT_APP_API_URL=http://localhost:8000
```

## 개발 가이드

### 백엔드 추가 기능 개발

1. **모델 추가**: `app/models.py`에 SQLAlchemy 모델 정의
2. **스키마 추가**: `app/schemas.py`에 Pydantic 스키마 정의
3. **라우트 추가**: `app/routes/` 디렉토리에 새로운 라우트 파일 생성
4. **라우터 등록**: `app/main.py`에 라우터 추가

### 프론트엔드 추가 기능 개발

1. **컴포넌트 생성**: `src/components/` 또는 `src/pages/`에 새로운 컴포넌트 작성
2. **API 호출**: `src/api.js`에 API 함수 추가
3. **스타일 추가**: `src/styles/` 디렉토리에 CSS 파일 추가

## 문제 해결

### 데이터베이스 연결 실패
- PostgreSQL 서버가 실행 중인지 확인
- 데이터베이스 자격증명 확인
- Docker의 경우 컨테이너 로그 확인: `docker-compose logs db`

### 프론트엔드가 백엔드에 연결되지 않음
- 백엔드 서버가 실행 중인지 확인 (http://localhost:8000)
- CORS 설정 확인
- 브라우저 개발자 도구의 네트워크 탭에서 요청 확인

### Docker 빌드 실패
- `docker-compose up --build`를 사용하여 이미지 재빌드
- Docker 디스크 공간 확인
- 네트워크 연결 확인

## 라이선스

MIT License
