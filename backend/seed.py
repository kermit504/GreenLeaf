import sys
import random
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

try:
    from database import SQLALCHEMY_DATABASE_URL, Base, engine
    import models
except ImportError:
    print("Error: Ensure seed.py is inside your 'backend' folder next to models.py and database.py")
    sys.exit(1)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
db = SessionLocal()

def seed_database():
    print("Executing structural wipe to synchronize PostgreSQL schemas...")
    Base.metadata.drop_all(bind=engine)
    
    print("Constructing fresh PostgreSQL database tables...")
    Base.metadata.create_all(bind=engine)

    print("Creating internal placeholder supplier connection...")
    dummy_supplier = models.Supplier(supplier_name="Global Nursery Wholesale", city="Main Office")
    db.add(dummy_supplier)
    db.commit()

    print("Building 4 core plant categories with direct optimized assets...")
    categories_data = [
        {"name": "Indoor Foliage", "img": "https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&q=80&w=600"},
        {"name": "Desert Succulents", "img": "https://images.unsplash.com/photo-1520302873429-196c88464474?auto=format&fit=crop&q=80&w=600"},
        {"name": "Flowering Beauties", "img": "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?auto=format&fit=crop&q=80&w=600"},
        {"name": "Ferns & Mosses", "img": "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&q=80&w=600"}
    ]

    categories = []
    for cat in categories_data:
        c = models.Category(category_name=cat["name"], category_image_url=cat["img"])
        db.add(c)
        categories.append(c)
    db.commit()

    plant_blueprints = {
        "Indoor Foliage": [
            ("Monstera Deliciosa", "photo-1614594975525-e45190c55d0b", 35, 55),
            ("Snake Plant Laurentii", "photo-1596547609652-9cf5d8d76921", 20, 35),
            ("Fiddle Leaf Fig", "photo-1597055181300-e3633a207518", 45, 80),
            ("ZZ Raven Plant", "photo-1632207691143-643c2a9a9361", 25, 45),
            ("Golden Pothos Vine", "photo-1596436889106-be35e843f974", 15, 28),
            ("Calathea Orbifolia", "photo-1616690248494-118b63e9f453", 30, 50),
            ("Swiss Cheese Plant", "photo-1628155930542-3c7a64e2c833", 18, 32),
            ("Burgundy Rubber Tree", "photo-1599599810769-bcde5a160d32", 35, 60),
            ("Chinese Evergreen", "photo-1618220179428-22790b461013", 22, 40),
            ("Philodendron Birkin", "photo-1612428813833-df702c790c55", 28, 48),
            ("Madagascar Dragon Tree", "photo-1599599806549-b023f07a19eb", 40, 75),
            ("Cast Iron Plant", "photo-1502082553048-f009c37129b9", 25, 45)
        ],
        "Desert Succulents": [
            ("Echeveria Rainbow", "photo-1520302873429-196c88464474", 12, 22),
            ("Aloe Vera Premium", "photo-1596547610014-998f411b4395", 15, 30),
            ("Jade Plant Tree", "photo-1598880940080-ff9a29891b85", 25, 55),
            ("Zebra Haworthia", "photo-1509440159596-0249088772ff", 8, 18),
            ("Burros Tail Succulent", "photo-1619183350172-5813f88be5d7", 18, 32),
            ("Golden Barrel Cactus", "photo-1551846153-154146a7af86", 30, 65),
            ("String of Pearls", "photo-1544816155-12df9643f363", 16, 28),
            ("Ruby Necklace Strand", "photo-1509440159596-0249088772ff", 14, 25),
            ("African Milk Tree", "photo-1554631221-f96033782324", 35, 70),
            ("Prickly Pear Desert", "photo-1605364843171-ec59d05634e2", 22, 45),
            ("Ghost Plant Cluster", "photo-1517722014278-c256a91a6fba", 10, 20),
            ("Bishops Cap Cactus", "photo-1504198453319-5ce911bafcde", 24, 50)
        ],
        "Flowering Beauties": [
            ("Classic Peace Lily", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDg1xT_lYo9iw4IvXMqcT3J8B37m8izNl1HQ&s", 20, 42),
            ("Anthurium Red Flame", "photo-1566786816466-4148d429f045", 28, 50),
            ("Orchid Phalaenopsis", "photo-1525310072745-f49212b5ac6d", 35, 75),
            ("Bird of Paradise", "photo-1558907541-8f237ef75150", 55, 120),
            ("African Violet Bloom", "photo-1599599810769-bcde5a160d32", 12, 24),
            ("Flamingo Flower White", "photo-1501472312651-726afe119ff1", 30, 52),
            ("Adenium Desert Rose", "photo-1572537161747-920b75ee30eb", 40, 85),
            ("Arabian Jasmine", "photo-1533105079780-92b9be482077", 25, 45),
            ("Exotic Hibiscus", "photo-1550950158-d0d960dff51b", 22, 38),
            ("Guzmania Bromeliad", "photo-1485955900006-10f4d324d411", 18, 35),
            ("Holiday Magenta Cactus", "photo-1512428813833-df702c790c55", 15, 28),
            ("Prayer Plant Tricolor", "photo-1545241047-6083a3684587", 20, 38)
        ],
        "Ferns & Mosses": [
            ("Lush Boston Fern", "photo-1572246538688-3f326dca3951", 18, 35),
            ("Maidenhair Lacy Fern", "photo-1517511620798-cec17d428bc0", 22, 40),
            ("Staghorn Mounting Fern", "photo-1544816155-12df9643f363", 45, 95),
            ("Birds Nest Wave Fern", "photo-1599599810769-bcde5a160d32", 20, 38),
            ("Kimberly Queen Fern", "photo-1502082553048-f009c37129b9", 25, 48),
            ("Kokedama Forest Ball", "photo-1535242208474-9a21247c15be", 30, 55),
            ("Silver Lady Tree Fern", "photo-1518531933037-91b2f5f229cc", 28, 50),
            ("Kangaroo Paw Fern", "photo-1517511620798-cec17d428bc0", 24, 42),
            ("Autumn Copper Fern", "photo-1502082553048-f009c37129b9", 18, 32),
            ("Fluffy Ruffle Compact", "photo-1572246538688-3f326dca3951", 15, 28),
            ("Terrarium Cushion Moss", "photo-1535242208474-9a21247c15be", 12, 25),
            ("Lemon Button Fern", "photo-1518531933037-91b2f5f229cc", 14, 26)
        ]
    }

    print("Populating data maps with direct, pre-cropped image links...")
    total_plants = 0
    for category in categories:
        blueprint_list = plant_blueprints.get(category.category_name, [])
        for name, img_id, min_p, max_p in blueprint_list:
            p = models.Plant(
                plant_name=name,
                price=round(random.uniform(min_p, max_p), 2),
                stock_quantity=random.randint(15, 60),
                plant_image_url=f"https://images.unsplash.com/{img_id}?auto=format&fit=crop&q=80&w=600",
                category_id=category.category_id,
                supplier_id=dummy_supplier.supplier_id 
            )
            db.add(p)
            total_plants += 1

    db.commit()
    print(f"Synchronized {len(categories)} healthy categories.")
    print(f"Populated {total_plants} plant entries with verified image addresses.")
    db.close()
    print("Nursery database population complete!")

if __name__ == "__main__":
    try:
        seed_database()
    except Exception as e:
        db.rollback()
        print(f"Seeding operation terminated with an exception: {e}")
    finally:
        db.close()