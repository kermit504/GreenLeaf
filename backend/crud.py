import models, schemas 
from sqlalchemy.orm import Session 
from fastapi import HTTPException
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import joinedload

def create_category(db: Session, category: schemas.CategoryCreate):
    try:
        db_category = models.Category(**category.model_dump())
        db.add(db_category)
        db.commit()
        db.refresh(db_category)
        return db_category
    except IntegrityError:
        db.rollback()
        raise HTTPException(status_code=400, detail="Category name already exists or invalid data.")

def get_categories(db: Session):
    return db.query(models.Category).all() 

def create_plant(db: Session, plant: schemas.PlantCreate): 
    try:
        db_plant = models.Plant(**plant.model_dump())
        db.add(db_plant)
        db.commit()
        db.refresh(db_plant)
        return db_plant
    except IntegrityError:
        db.rollback()
        raise HTTPException(status_code=400, detail="Plant creation failed. Check if Category ID exists.")

def get_plants(db: Session, category_id: int = None):
    query = db.query(models.Plant).options(joinedload(models.Plant.care_requirements))
    if category_id:
        query = query.filter(models.Plant.category_id == category_id)
    return query.all()

def create_care_requirements(db: Session, care: schemas.CareRequirementsCreate):
    try:
        db_care = models.Care_Requirements(**care.model_dump())
        db.add(db_care)
        db.commit()
        db.refresh(db_care)
        return db_care
    except IntegrityError:
        db.rollback()
        raise HTTPException(status_code=400, detail="Care requirements error.")

def get_care_requirements(db: Session):
    return db.query(models.Care_Requirements).all()

def create_user(db: Session, user: schemas.UserCreate): 
    try:
        db_user = models.User(**user.model_dump()) 
        db.add(db_user)
        db.commit()
        db.refresh(db_user)
        return db_user
    except IntegrityError:
        db.rollback()
        raise HTTPException(status_code=400, detail="Username already exists.")

def get_users(db: Session):
    return db.query(models.User).all()

def process_checkout(db: Session, checkout: schemas.CheckoutRequest):
    created_sales = []
    try:
        for item in checkout.items:
            plant = db.query(models.Plant).filter(models.Plant.plant_id == item.plant_id).first()
            
            if not plant:
                raise HTTPException(status_code=404, detail=f"Plant ID {item.plant_id} not found!")
            if plant.stock_quantity < item.qty_sold:
                raise HTTPException(status_code=400, detail=f"Not enough stock for {plant.plant_name}")
            
            plant.stock_quantity -= item.qty_sold
            
            db_sale = models.Sales(
                plant_id=item.plant_id,
                user_id=checkout.user_id,
                qty_sold=item.qty_sold,
                sale_date=checkout.sale_date
            )
            db.add(db_sale)
            created_sales.append(db_sale)
            
        db.commit()
        for s in created_sales:
            db.refresh(s)
        return created_sales
    except HTTPException as e:
        db.rollback()
        raise e
    except IntegrityError:
        db.rollback()
        raise HTTPException(status_code=400, detail="Database integrity error during checkout.")
    except Exception as e:
        db.rollback()
        print(e)
        raise HTTPException(status_code=500, detail="Internal server error.")

def authenticate_user(db: Session, username: str, password: str):
    user = db.query(models.User).filter(models.User.username == username).first()
    if user and user.password == password:
        return user
    return None

def create_supplier(db: Session, supplier: schemas.SupplierCreate):
    try:
        db_supplier = models.Supplier(**supplier.model_dump())
        db.add(db_supplier)
        db.commit()
        db.refresh(db_supplier)
        return db_supplier
    except IntegrityError:
        db.rollback()
        raise HTTPException(status_code=400, detail="Supplier creation failed.")

def get_suppliers(db: Session): 
    return db.query(models.Supplier).all() 

def create_purchase(db: Session, purchase: schemas.PurchasesCreate):
    try:
        db_purchase = models.Purchases(**purchase.model_dump())
        plant = db.query(models.Plant).filter(models.Plant.plant_id == purchase.plant_id).first()
        if plant:
            plant.stock_quantity += purchase.qty_purchased
            
        db.add(db_purchase)
        db.commit()
        db.refresh(db_purchase)
        return db_purchase
    except IntegrityError:
        db.rollback()
        raise HTTPException(status_code=400, detail="Purchase record failed. Check Plant/Supplier IDs.")
    
    # for put endpont:
def update_plant(db: Session, plant_id: int, plant: schemas.PlantCreate):
    db_plant = db.query(models.Plant).filter(models.Plant.plant_id == plant_id).first()
    if not db_plant:
        raise HTTPException(status_code=404, detail="Plant specimen not found")
        
    for key, value in plant.model_dump().items():
        setattr(db_plant, key, value)
        
    try:
        db.commit()
        db.refresh(db_plant)
        return db_plant
    except IntegrityError:
        db.rollback()
        raise HTTPException(status_code=400, detail="Update failed. Check related IDs.")

def update_care_requirements(db: Session, plant_id: int, care: schemas.CareRequirementsCreate):
    db_care = db.query(models.Care_Requirements).filter(models.Care_Requirements.plant_id == plant_id).first()
    
    if not db_care:
        db_care = models.Care_Requirements(**care.model_dump(), plant_id=plant_id)
        db.add(db_care)
    else:
        for key, value in care.model_dump().items():
            setattr(db_care, key, value)
            
    try:
        db.commit()
        db.refresh(db_care)
        return db_care
    except IntegrityError:
        db.rollback()
        raise HTTPException(status_code=400, detail="Care requirement update details invalid.")
    
def update_category(db: Session, category_id: int, category: schemas.CategoryCreate):
    db_category = db.query(models.Category).filter(models.Category.category_id == category_id).first()
    if not db_category:
        raise HTTPException(status_code=404, detail="Category not found")
        
    for key, value in category.model_dump().items():
        setattr(db_category, key, value)
        
    try:
        db.commit()
        db.refresh(db_category)
        return db_category
    except IntegrityError:
        db.rollback()
        raise HTTPException(status_code=400, detail="Category update failed. Data naming collision or integrity block.")