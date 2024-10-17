import pandas as pd
from faker import Faker
import random

# Initialize Faker
fake = Faker()

# Define the number of records you want to generate
num_records = 10000

# Create an empty list to hold the data
data = []

for _ in range(num_records):
    age = random.randint(18, 70)

    # Age-based logic for education level
    if age < 22:
        education_level = random.choice(['high school', 'in school'])
        employment_status = random.choice(['part-time', 'unemployed'])
        income = random.randint(0, 2000)  # Lower income for young individuals
        savings = random.randint(0, 5000)
    elif 22 <= age <= 35:
        education_level = random.choice(['bachelor\'s', 'master\'s'])
        employment_status = random.choice(['full-time', 'self-employed'])
        income = random.randint(2000, 5000)
        savings = random.randint(5000, 20000)
    else:
        education_level = random.choice(['master\'s', 'PhD'])
        employment_status = random.choice(['full-time', 'self-employed', 'retired'])
        income = random.randint(5000, 10000)
        savings = random.randint(10000, 50000)

    # Income should correlate with higher spending and savings
    monthly_spending = random.randint(int(income * 0.3), int(income * 0.7))

    # Older people tend to have more debt (mortgages, loans)
    loan_balance = random.randint(0, age * 1000)

    credit_usage = random.randint(0, 10000)

    # Debt-to-income ratio
    debt_to_income_ratio = round((loan_balance + credit_usage) / (income + 1), 2)

    # Ensure valid range for monthly_essentials
    monthly_essentials_upper_bound = max(500, int(monthly_spending * 0.7))
    monthly_essentials = random.randint(500, monthly_essentials_upper_bound)

    # Ensure valid range for monthly_discretionary
    monthly_discretionary_upper_bound = max(200, int(monthly_spending * 0.3))
    monthly_discretionary = random.randint(200, monthly_discretionary_upper_bound)

    record = {
        'income': income,
        'savings': savings,
        'credit_usage': credit_usage,
        'loan_balance': loan_balance,
        'monthly_spending': monthly_spending,
        'investment_portfolio': random.randint(1000, 20000),
        'risk_appetite': random.choice(['low', 'medium', 'high']),
        'age': age,
        'employment_status': employment_status,
        'education_level': education_level,
        'credit_score': random.randint(300, 850),
        'debt_to_income_ratio': debt_to_income_ratio,
        'monthly_essentials': monthly_essentials,
        'monthly_discretionary': monthly_discretionary,
        'long_term_goals': random.choice(['buy house', 'retirement', 'travel', 'invest more'])
    }

    data.append(record)

# Convert the list of dictionaries into a pandas DataFrame
df = pd.DataFrame(data)

# Save the DataFrame to a CSV file
df.to_csv('data/financial_data.csv', index=False)

print(f"CSV file with {num_records} records created successfully!")