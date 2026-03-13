# db.py
from typing import Optional, Generator

from sqlmodel import SQLModel, Field, create_engine, Session


sqlite_file_name = "database.db"
sqlite_url = f"sqlite:///{sqlite_file_name}"

# Necesario para que SQLite funcione bien con FastAPI (hilos)
connect_args = {"check_same_thread": False}
engine = create_engine(sqlite_url, connect_args=connect_args, echo=False)


class User(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    username: str = Field(index=True, unique=True)
    hospital_id: str = Field(index=True)
    role: str
    activo: bool = Field(default=True)
    hashed_password: str


def create_db_and_tables() -> None:
    SQLModel.metadata.create_all(engine)


def get_session() -> Generator[Session, None, None]:
    with Session(engine) as session:
        yield session