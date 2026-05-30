from sqlalchemy import Column, Integer, String, Float, ForeignKey, Date, Boolean
from sqlalchemy.orm import relationship
from database import Base

#basically the table equivalent in the database 
#orm thing uh code - object , database - table and orm is just translates it 


class Plant(Base):
    __tablename__ = "plants"

    plant_id = Column(Integer, primary_key=True, index=True)
    plant_name = Column(String, nullable=False)
    plant_image_url = Column(String, nullable=False)
    stock_quantity = Column(Integer, default = 0)
    price = Column(Float, nullable=False)
    category_id = Column(Integer, ForeignKey("categories.category_id"), nullable=False)
    supplier_id = Column(Integer, ForeignKey("suppliers.supplier_id"), nullable=False)

    category = relationship("Category", back_populates="plants")
    sales = relationship("Sales", back_populates="plant")
    purchases = relationship("Purchases", back_populates="plant")
    care_requirements = relationship("Care_Requirements", back_populates="plant")


class Category(Base):
    __tablename__ = "categories"

    category_id = Column(Integer, primary_key=True, index=True)
    category_name = Column(String, nullable=False)
    category_image_url = Column(String, nullable = False)

    plants = relationship("Plant", back_populates="category") #handles the relationship between category and plant tables ; basically it allows us to access the plants associated with a category through the category object and vice versa


class Care_Requirements(Base):
    __tablename__ = "care_requirements"

    care_id = Column(Integer, primary_key=True, index=True)
    plant_id = Column(Integer, ForeignKey("plants.plant_id"), nullable=False)
    sunlight_requirement = Column(String, nullable=False)
    soil_type = Column(String, nullable=False)

    plant = relationship("Plant", back_populates="care_requirements")


class Supplier(Base):
    __tablename__ = "suppliers"

    supplier_id = Column(Integer, primary_key=True, index=True)
    supplier_name = Column(String, nullable=False)
    city = Column(String, nullable=False)

    purchases = relationship("Purchases", back_populates="supplier")


class User(Base):
    __tablename__ = "users"

    user_id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, nullable=False)
    password = Column(String, nullable=False)
    is_admin = Column(Boolean, default=False)

    sales = relationship("Sales", back_populates="user")


class Purchases(Base):
    __tablename__ = "purchases"

    purchase_id = Column(Integer, primary_key=True, index=True)
    plant_id = Column(Integer, ForeignKey("plants.plant_id"), nullable=False)
    supplier_id = Column(Integer, ForeignKey("suppliers.supplier_id"), nullable=False)
    qty_purchased = Column(Integer, nullable=False)
    purchase_date = Column(Date, nullable=False)

    plant = relationship("Plant", back_populates="purchases")
    supplier = relationship("Supplier", back_populates="purchases")


class Sales(Base):
    __tablename__ = "sales"

    sale_id = Column(Integer, primary_key=True, index=True)
    plant_id = Column(Integer, ForeignKey("plants.plant_id"), nullable=False)
    user_id = Column(Integer, ForeignKey("users.user_id"), nullable=False)
    qty_sold = Column(Integer, nullable=False)
    sale_date = Column(Date, nullable=False)

    plant = relationship("Plant", back_populates="sales")
    user = relationship("User", back_populates="sales")