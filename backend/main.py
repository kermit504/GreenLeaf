
from fastapi import FastAPI
import models
from database import engine
from fastapi.staticfiles import StaticFiles

app = FastAPI(title = "GreenLeaf Plant Nursery")
app.mount("/static", StaticFiles(directory="static"), name="static")
models.Base.metadata.create_all(bind=engine)

@app.get("/")
def read_root():
  return {"message":"db tables created successfuly"}