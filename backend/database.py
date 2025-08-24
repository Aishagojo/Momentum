from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
import os
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./app.db")
connect_args = {"check_same_thread": False} if DATABASE_URL.startswith("sqlite") else {}
engine = create_engine(DATABASE_URL, future=True, echo=False, connect_args=connect_args)
SessionLocal = sessionmaker(bind=engine, autocommit=False, autoflush=False, future=True)
Base = declarative_base()
def get_db():
    db = SessionLocal()
    try: yield db
    finally: db.close()
