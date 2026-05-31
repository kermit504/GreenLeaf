import models
from database import SessionLocal, engine
from datetime import date

def seed_database():
    models.Base.metadata.drop_all(bind=engine)
    models.Base.metadata.create_all(bind=engine)

    db = SessionLocal()

    try:
        admin_user = models.User(
            username="admin",
            password="123",
            is_admin=True
        )
        customer_user = models.User(
            username="john_doe",
            password="password123",
            is_admin=False
        )
        db.add_all([admin_user, customer_user])
        db.commit()

        cat_indoor = models.Category(
            category_name="Indoor Plants",
            category_image_url="https://images.unsplash.com/photo-1545241047-6083a3684587"
        )
        cat_outdoor = models.Category(
            category_name="Outdoor Shrubs",
            category_image_url="https://images.unsplash.com/photo-1585320806297-9794b3e4eeae"
        )
        cat_succulents = models.Category(
            category_name="Succulents & Cacti",
            category_image_url="https://images.unsplash.com/photo-1516481605912-d34c1411504c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGNhY3RpfGVufDB8fDB8fHww"
        )
        cat_ferns = models.Category(
            category_name="Ferns & Palms",
            category_image_url="https://images.unsplash.com/photo-1594279280978-251228f10081?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZmVybnMlMjBhbmQlMjBwYWxtc3xlbnwwfHwwfHx8MA%3D%3D"
        )
        db.add_all([cat_indoor, cat_outdoor, cat_succulents, cat_ferns])
        db.commit()

        supplier_alpha = models.Supplier(
            supplier_name="Alpha Green Wholesalers",
            city="Bengaluru"
        )
        supplier_beta = models.Supplier(
            supplier_name="Terra Flora Botanicals",
            city="Pune"
        )
        supplier_gamma = models.Supplier(
            supplier_name="Zen Garden Nurseries",
            city="Kolkata"
        )
        db.add_all([supplier_alpha, supplier_beta, supplier_gamma])
        db.commit()

        plants_data = [
            ("Monstera Deliciosa", 1250.00, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBnWzlrEC1YQJnQ4AZAWVwu3MZzUw55Xx8BQ&s", 15, cat_indoor.category_id, supplier_alpha.supplier_id),
            ("Snake Plant", 450.00, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRIrPewXdJIwUz67fvFkiym7yBs1sYC-JMiw&s", 3, cat_indoor.category_id, supplier_alpha.supplier_id),
            ("Golden Pothos", 290.00, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScbUC-o2twQt1KP1VLJTrPcGiwYa5037OQkQ&s", 24, cat_indoor.category_id, supplier_beta.supplier_id),
            ("Echeveria Elegans", 180.00, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQl6zj5h5Bh78gjP7PI1jPRhLJkoysQuzQDsA&s", 0, cat_succulents.category_id, supplier_beta.supplier_id),
            ("Fiddle Leaf Fig", 1850.00, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxzyD681Fa3_CvDTFSPRFDA8924ChBR4jgTw&s", 8, cat_indoor.category_id, supplier_gamma.supplier_id),
            ("Peace Lily", 380.00, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYnIPaq_oyp7mb-iIFbCKEOSvgGJP8WiOHcQ&s", 12, cat_indoor.category_id, supplier_alpha.supplier_id),
            ("ZZ Plant", 550.00, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFdTp9QwKCK-LtRXevkGPJHI_sf6qThXqz7Q&s", 20, cat_indoor.category_id, supplier_beta.supplier_id),
            ("Aloe Vera", 220.00, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQ2Dc403fOQq19Jo4Hekr088e-v9SkJx-Dhw&s", 35, cat_succulents.category_id, supplier_gamma.supplier_id),
            ("Boston Fern", 420.00, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWOVxiWS-uMRVCuCgfgqgHLKsXl7Z2orWN3g&s", 6, cat_ferns.category_id, supplier_alpha.supplier_id),
            ("Areca Palm", 890.00, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQU4XdwQOSimIBftiaGwifEQGEEwor6bT6A-A&s", 10, cat_ferns.category_id, supplier_beta.supplier_id),
            ("Jade Plant", 260.00, "https://hips.hearstapps.com/hmg-prod/images/succulent-houseplant-crassula-ovata-in-a-pot-on-royalty-free-image-1758144178.pjpeg?crop=0.668xw:1.00xh;0.192xw,0&resize=1120:*", 18, cat_succulents.category_id, supplier_gamma.supplier_id),
            ("Spider Plant", 280.00, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlnif6tQLIShfKNqQIJqf5shWO-NMgMEir0A&s", 14, cat_indoor.category_id, supplier_alpha.supplier_id),
            ("English Ivy", 310.00, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLKaUOyNVg3c2qdF4dMBZ1Fno5Mz4MChADJA&s", 2, cat_indoor.category_id, supplier_beta.supplier_id),
            ("Chinese Evergreen", 620.00, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThbduGrEDc7pbeTQMFPiNZZupIScW1_NdpPw&s", 9, cat_indoor.category_id, supplier_gamma.supplier_id),
            ("Red Hibiscus", 190.00, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStjfwNf3U9pYk_GvL9STiZYm8EhgnfNAY1hw&s", 25, cat_outdoor.category_id, supplier_alpha.supplier_id),
            ("Bougainvillea", 240.00, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZqHzO9sOCs1Chnm2e6858YcLBst8jznG1sA&s", 30, cat_outdoor.category_id, supplier_beta.supplier_id),
            ("Lavender Bush", 480.00, "https://m.media-amazon.com/images/I/71tWtbKXggL._AC_UF1000,1000_QL80_.jpg", 4, cat_outdoor.category_id, supplier_gamma.supplier_id),
            ("Bird of Paradise", 2100.00, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQk5LhkfXcuJrWdLRMq6YOMBRFSrNsuTkUYIw&s", 5, cat_indoor.category_id, supplier_alpha.supplier_id),
            ("Calathea Orbifolia", 750.00, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQp3DPCC84dR5mTNtJ3zRd9VhYpvxwQy8O2qw&s", 7, cat_indoor.category_id, supplier_beta.supplier_id),
            ("Zebra Cactus", 150.00, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR41xLCcQNdSiJ0cwpqjxtqV4MKz-nQNrOlRw&s", 40, cat_succulents.category_id, supplier_gamma.supplier_id),
            ("Majesty Palm", 1150.00, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStyJbtYV6g1tLkAU55eIzjOOn4G0qhr6hQpw&s", 8, cat_ferns.category_id, supplier_alpha.supplier_id),
            ("Ruby Rubber Plant", 680.00, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYt3VowJBTGGI0ZuI2s7RCnu13-M8wY1wpdg&s", 11, cat_indoor.category_id, supplier_beta.supplier_id)
        ]

        plants = []
        for name, price, img, stock, cat_id, sup_id in plants_data:
            plant = models.Plant(
                plant_name=name,
                price=price,
                plant_image_url=img,
                stock_quantity=stock,
                category_id=cat_id,
                supplier_id=sup_id
            )
            db.add(plant)
            plants.append(plant)
        
        db.commit()

        care_data = [
            ("Bright Indirect Light", "Peat-based potting mix"),
            ("Low to Partial Light", "Well-draining sandy mix"),
            ("Medium Indirect Sun", "Standard aerated mix"),
            ("Full Direct Sunlight", "Gritty cactus substrate"),
            ("Bright Consistent Light", "Rich, well-aerated soil"),
            ("Low to Medium Light", "Moist, organic potting soil"),
            ("Low to Bright Light", "Well-draining indoor mix"),
            ("Full Direct Sunlight", "Sandy cactus soil"),
            ("High Humidity, Shade", "Peat-rich moist substrate"),
            ("Bright Filtered Light", "Loamy drainage mix"),
            ("Bright Filtered Light", "Gritty succulent mix"),
            ("Bright Filtered Light", "Standard houseplant potting mix"),
            ("Medium to Shade Light", "Rich loam substrate"),
            ("Low to Filtered Light", "Well-draining organic soil"),
            ("Full Outdoor Sunlight", "Loamy fertile substrate"),
            ("Full Intense Sun", "Dry sandy substrate"),
            ("Full Sunlight", "Sharply draining sandy loam"),
            ("Bright Filtered Light", "Rich moist potting mix"),
            ("Medium Shadowed Light", "Humus-rich aerated mix"),
            ("Bright Filtered Light", "Porous gravel substrate"),
            ("Bright Indirect Light", "Rich organic well-draining soil"),
            ("Bright Indirect Light", "Well-draining standard loam")
        ]

        for i, plant in enumerate(plants):
            sun, soil = care_data[i]
            care = models.Care_Requirements(
                plant_id=plant.plant_id,
                sunlight_requirement=sun,
                soil_type=soil
            )
            db.add(care)
        
        db.commit()

        purchase1 = models.Purchases(
            plant_id=plants[0].plant_id,
            supplier_id=supplier_alpha.supplier_id,
            qty_purchased=15,
            purchase_date=date(2026, 5, 15)
        )
        purchase2 = models.Purchases(
            plant_id=plants[1].plant_id,
            supplier_id=supplier_alpha.supplier_id,
            qty_purchased=3,
            purchase_date=date(2026, 5, 18)
        )
        db.add_all([purchase1, purchase2])
        db.commit()

        sale1 = models.Sales(
            plant_id=plants[0].plant_id,
            user_id=customer_user.user_id,
            qty_sold=2,
            sale_date=date(2026, 5, 28)
        )
        sale2 = models.Sales(
            plant_id=plants[2].plant_id,
            user_id=customer_user.user_id,
            qty_sold=1,
            sale_date=date(2026, 5, 30)
        )
        db.add_all([sale1, sale2])
        db.commit()

        print("Database successfully wiped and seeded.")

    except Exception as e:
        db.rollback()
        print(f"Seed operation aborted: {e}")
    finally:
        db.close()

if __name__ == "__main__":
    seed_database()