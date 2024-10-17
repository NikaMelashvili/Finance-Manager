import pandas as pd
from sqlalchemy import create_engine
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
import joblib

# Step 1: Connect to the MySQL database using SQLAlchemy
engine = create_engine('mysql+mysqlconnector://root:123@localhost:3307/bank_data')

# Step 2: Query the financial data
query = "SELECT * FROM financial_data;"
df = pd.read_sql(query, engine)

# Step 3: Prepare the data for the model
X = df[['savings', 'credit_usage', 'loan_balance', 'monthly_spending']]
y = df['income']

# Step 4: Split the data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Step 5: Train a Linear Regression model
model = LinearRegression()
model.fit(X_train, y_train)

# Step 6: Save the trained model to a file
joblib.dump(model, 'model/bank_income_model.pkl')
print("Model saved to 'model/bank_income_model.pkl'")
