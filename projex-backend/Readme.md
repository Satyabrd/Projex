### Description
app : Here projects are deployed as microservices
app is created again inside projex-backend, because in future we may create another parts as part of microservices

### Structure
projex-backend/
├── main.py
├── core/
│   └── config.py                 # DB settings from env
├── db/
│   ├── base.py                  # Base class for models
│   ├── session.py               # DB session handling
│   └── init_db.py               # Initial data if needed
├── models/
│   └── project.py               # SQLAlchemy model
├── schemas/
│   └── project.py               # Pydantic schemas
├── repositories/
│   └── project_repo.py          # Query logic
├── services/
│   └── project_service.py       # Business logic
├── routers/
│   └── project.py               # API routes
└── utils/
    └── exceptions.py            # Custom exceptions


### Database structure logic (sqlAlchemy + repository ) pattern
### ✅ 1. `models/` — **Database Layer (ORM Models)**

**What's inside:** SQLAlchemy or SQLModel classes
**Purpose:** Defines how your data is stored in the **actual database**

```python
class ProjectStage(Base):
    __tablename__ = 'project_stages'
    id = Column(Integer, primary_key=True)
    name = Column(String)
```

* Tied directly to **PostgreSQL or other DB**
* Knows about **foreign keys**, **constraints**
* You typically don't expose this directly to users or APIs

---

### ✅ 2. `schemas/` — **Data Validation & Serialization (Pydantic)**

**What's inside:** Pydantic models
**Purpose:** Defines what data comes in and goes out of your API

```python
class StageCreate(BaseModel):
    name: str
    project_id: int
```

* Used to **validate incoming API requests**
* Used to **format outgoing API responses**
* Decoupled from database (e.g., no need to return foreign keys directly)
* Enforces strict types, ranges, required/optional fields

> Think of this as your **API contract layer**

---

### ✅ 3. `repositories/` — **Data Access Layer (Business Logic to DB)**

**What's inside:** Classes/functions that wrap DB access
**Purpose:** Central place for querying and updating the database

```python
class StageRepository:
    def get_all_by_project(self, project_id):
        return self.db.query(ProjectStage).filter(...).all()
```

* Encapsulates SQL logic
* Makes unit testing easier (mock repository)
* Keeps routes & services clean (no raw SQL in your route handlers)
