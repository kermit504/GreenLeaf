import crud
import schemas

from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import models
from database import engine, SessionLocal
from sqlalchemy.orm import Session
from fastapi.staticfiles import StaticFiles

app = FastAPI(title = "GreenLeaf Plant Nursery")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# this is for serving static images - make a folder called static and put all images there
app.mount("/static", StaticFiles(directory="static"), name="static")
models.Base.metadata.create_all(bind=engine)

def get_db():
  db = SessionLocal()
  
  try:
    yield db
  finally:
    db.close()

@app.get("/")
def read_root():
  return {"message":"db tables created successfuly"}

# categories endpoints
@app.post("/categories/", response_model = schemas.CategoryResponse)
def create_category(category: schemas.CategoryCreate, db: Session = Depends(get_db)):
  return crud.create_category(db = db, category = category)

@app.get("/categories/", response_model = list[schemas.CategoryResponse])
def get_categories(db: Session = Depends(get_db)):
  return crud.get_categories(db = db)

# plants endpoints
@app.post("/plants/", response_model = schemas.PlantResponse)
def create_plant(plant: schemas.PlantCreate, db: Session = Depends(get_db)):
  return crud.create_plant(db = db, plant = plant)

@app.get("/plants/", response_model = list[schemas.PlantResponse])
def get_plants(category_id: int = None, db:Session = Depends(get_db)):
  return crud.get_plants(db = db, category_id = category_id)

# Users endpoints
@app.post("/Users/", response_model=schemas.UserResponse)
def create_User(User: schemas.UserCreate, db: Session = Depends(get_db)):
  return crud.create_user(db=db, user=User)
  
# sales endpoints
@app.post("/checkout/", response_model=list[schemas.SalesResponse])
def checkout(request: schemas.CheckoutRequest, db: Session = Depends(get_db)):
  return crud.process_checkout(db=db, checkout=request)

# purchase endpoints
@app.post("/purchases/", response_model=schemas.PurchasesResponse)
def create_purchase(purchase: schemas.PurchasesCreate, db: Session = Depends(get_db)):
  return crud.create_purchase(db=db, purchase=purchase)

# care requirements endpoints
@app.post("/care/", response_model=schemas.CareRequirementsResponse)
def create_care(care: schemas.CareRequirementsCreate, db: Session = Depends(get_db)):
  return crud.create_care_requirements(db=db, care=care)

# login
@app.post("/login/")
def login(details: dict, db: Session = Depends(get_db)):
    user = crud.authenticate_user(db, details.get("username"), details.get("password"))
    if not user:
        raise HTTPException(status_code=401, detail="Invalid username or password")
    
    return {
        "user_id": user.user_id, 
        "username": user.username, 
        "is_admin": user.is_admin
    }
    
@app.get("/suppliers/")
def get_suppliers(db: Session = Depends(get_db)):
  return crud.get_suppliers(db = db)

@app.post("/suppliers/")
def create_supplier(supplier: schemas.SupplierCreate, db: Session = Depends(get_db)):
  return crud.create_supplier(db = db, supplier = supplier)

@app.get("/checkout/", response_model=list[schemas.SalesResponse])
def get_all_sales(db: Session = Depends(get_db)):
  return db.query(models.Sales).all()

@app.put("/plants/{plant_id}", response_model=schemas.PlantResponse)
def update_plant(plant_id: int, plant: schemas.PlantCreate, db: Session = Depends(get_db)):
    return crud.update_plant(db=db, plant_id=plant_id, plant=plant)

@app.put("/care/{plant_id}", response_model=schemas.CareRequirementsResponse)
def update_care(plant_id: int, care: schemas.CareRequirementsCreate, db: Session = Depends(get_db)):
    return crud.update_care_requirements(db=db, plant_id=plant_id, care=care)
  
@app.put("/categories/{category_id}", response_model=schemas.CategoryResponse)
def update_category(category_id: int, category: schemas.CategoryCreate, db: Session = Depends(get_db)):
    return crud.update_category(db=db, category_id=category_id, category=category)