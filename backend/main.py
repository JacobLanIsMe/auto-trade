from fastapi import FastAPI
from sqlalchemy import create_engine, text
import os
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware


load_dotenv()

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # React dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# Example: 'mssql+pyodbc://username:password@server/database?driver=ODBC+Driver+17+for+SQL+Server'
DATABASE_URL = os.getenv('DATABASE_URL')
engine = create_engine(DATABASE_URL)

@app.get("/data")
def read_data():
    with engine.connect() as conn:
        result = conn.execute(text("SELECT * FROM Candidate WHERE IsDeleted = 0"))
        return [dict(row._mapping) for row in result]
