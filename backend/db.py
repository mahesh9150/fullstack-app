import pymysql
from pymysql.cursors import DictCursor

def get_db_connection():
    connection = pymysql.connect(
        host="localhost",
        user="root",
        password="1234",
        database="food_order_db",
        cursorclass=DictCursor
    )
    return connection