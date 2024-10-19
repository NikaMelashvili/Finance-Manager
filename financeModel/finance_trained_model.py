import joblib
import pandas as pd
from sklearn.compose import ColumnTransformer
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler, OneHotEncoder, MinMaxScaler

# Load the data
data = pd.read_csv('data/financial_data.csv')

# Features and target
X = data.drop(columns=['monthly_discretionary'])
y = data['monthly_discretionary']

# Categorical and numerical columns
categorical_cols = ['risk_appetite', 'employment_status', 'education_level', 'long_term_goals']
numerical_cols = ['income', 'savings', 'credit_usage', 'loan_balance', 'monthly_spending',
                  'investment_portfolio', 'age', 'credit_score', 'debt_to_income_ratio',
                  'monthly_essentials']

# Numerical and categorical transformers
numerical_transformer = Pipeline(steps=[
    ('scaler', StandardScaler()),  # Apply standard scaling
    ('minmax', MinMaxScaler())     # Apply MinMax scaling
])

categorical_transformer = OneHotEncoder(handle_unknown='ignore')

# Preprocessor for both numerical and categorical features
preprocessor = ColumnTransformer(
    transformers=[
        ('num', numerical_transformer, numerical_cols),
        ('cat', categorical_transformer, categorical_cols)
    ])

# Random forest model
model = RandomForestRegressor(n_estimators=100, random_state=42)

# Create the pipeline with preprocessor and model
pipeline = Pipeline(steps=[('preprocessor', preprocessor), ('model', model)])

# Split the data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train the model
pipeline.fit(X_train, y_train)

# Save the model to a file
model_path = 'model/financial_model.pkl'
joblib.dump(pipeline, model_path)
print(f"Model trained and saved to {model_path}")
