import mysql.connector
from faker import Faker
import random

connection = mysql.connector.connect(
    host="localhost",
    port=3307,
    user="root",
    password="123",
    database="bank_data"
)

cursor = connection.cursor()

fake = Faker()

georgian_names = [
    "Giorgi", "Nino", "Irakli", "Tamar", "David",
    "Ana", "Levan", "Keti", "Vano", "Salome",
    "Davit", "Maka", "Giga", "Tina", "Lika",
    "Aleksandre", "Mariam", "Tato", "Nana", "Gvantsa"
]

for _ in range(100):
    personal_no = fake.random_int(min=1000000, max=9999999)
    name = random.choice(georgian_names)
    income = round(random.uniform(1000, 10000), 2)
    savings = round(random.uniform(0, 50000), 2)
    credit_usage = round(random.uniform(0, 20000), 2)
    loan_balance = round(random.uniform(0, 50000), 2)
    monthly_spending = round(random.uniform(0, 3000), 2)

    insert_query = """
    INSERT INTO financial_data (personal_no, name, income, savings, credit_usage, loan_balance, monthly_spending)
    VALUES (%s, %s, %s, %s, %s, %s, %s)
    """
    cursor.execute(insert_query, (personal_no, name, income, savings, credit_usage, loan_balance, monthly_spending))

connection.commit()
print("100 rows of sample data inserted successfully.")

cursor.close()
connection.close()
