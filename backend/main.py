from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from db import get_db_connection

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class Order(BaseModel):
    customer_name: str
    food_name: str
    quantity: int
    total_price: float

@app.get("/")
def home():
    return {"message": "Food Order API Running"}

# Add Order
@app.post("/orders")
def add_order(order: Order):
    connection = get_db_connection()
    cursor = connection.cursor()

    sql = """
    INSERT INTO orders (customer_name, food_name, quantity, total_price)
    VALUES (%s, %s, %s, %s)
    """

    values = (
        order.customer_name,
        order.food_name,
        order.quantity,
        order.total_price
    )

    cursor.execute(sql, values)
    connection.commit()

    cursor.close()
    connection.close()

    return {"message": "Order added successfully"}

# View Orders
@app.get("/orders")
def view_orders():
    connection = get_db_connection()
    cursor = connection.cursor()

    cursor.execute("SELECT * FROM orders ORDER BY id DESC")
    orders = cursor.fetchall()

    cursor.close()
    connection.close()

    return orders