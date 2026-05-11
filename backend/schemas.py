from pydantic import BaseModel
from typing import List, Optional
from datetime import date

class CategoryBase(BaseModel):
    category_name: str
    category_image_url: str

class CategoryCreate(CategoryBase):
    pass

class CategoryResponse(CategoryBase):
    category_id: int
    class Config:
        from_attributes = True

class PlantBase(BaseModel):
    plant_name: str
    price: float
    plant_image_url: str
    stock_quantity: int = 0
    category_id: int

class PlantCreate(PlantBase):
    pass

class PlantResponse(PlantBase):
    plant_id: int
    category : CategoryResponse
    class Config:
        from_attributes = True  


class CareRequirementsBase(BaseModel):
    plant_id : int 
    soil_type : str
    sunlight_requirement : str 


class CareRequirementsCreate(CareRequirementsBase):
    pass 

class CareRequirementsResponse(CareRequirementsBase):
    care_id : int 
    class Config:
        from_attributes = True

class SalesBase(BaseModel) : 
    plant_id : int 
    customer_id : int 
    qty_sold : int
    sale_date : date 


class SalesCreate(SalesBase) :
    pass 

class SalesResponse(SalesBase) :
    sale_id : int 
    class Config : 
        from_attributes = True

class PurchasesBase(BaseModel) : 
    plant_id : int 
    supplier_id : int 
    qty_purchased : int 
    purchase_date : date 

class PurchasesCreate(PurchasesBase) :
    pass

class PurchasesResponse(PurchasesBase) :
    purchase_id : int 
    class Config : 
        from_attributes = True

class SupplierBase(BaseModel) : 
    supplier_name : str 
    city : str 

class SupplierCreate(SupplierBase) :
    pass 

class SupplierResponse(SupplierBase) : 
    supplier_id : int 
    class Config : 
        from_attributes = True

class CustomerBase(BaseModel) :
    customer_name : str 
    city : str 
    phone_number : str 

class CustomerCreate(CustomerBase) : 
    pass 

class CustomerResponse(CustomerBase) :
    customer_id : int 
    class Config : 
        from_attributes = True 
