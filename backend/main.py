
from fastapi import FastAPI
import models
from database import engine

app = FastAPI(title = "GreenLeaf Plant Nursery")
models.Base.metadata.create_all(bind=engine)

@app.get("/")
def read_root():
  return {"message":"db tables created successfuly"}