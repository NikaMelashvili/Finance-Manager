import joblib
import pandas as pd
from sklearn.compose import ColumnTransformer
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_squared_error, mean_absolute_error
from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler, OneHotEncoder

# Load the data
data = pd.read_csv('data/financial_data.csv')

# Show data summary and sample
print(data.info())
print(data.head())

# Features and target extraction
X = data.drop(columns=['monthly_discretionary'])  # Features
y = data['monthly_discretionary']  # Target variable

# Define categorical and numerical columns
categorical_cols = ['risk_appetite', 'employment_status', 'education_level', 'long_term_goals']
numerical_cols = ['income', 'savings', 'credit_usage', 'loan_balance', 'monthly_spending',
                  'investment_portfolio', 'age', 'credit_score', 'debt_to_income_ratio',
                  'monthly_essentials']

# Preprocessing steps
numerical_transformer = StandardScaler()
categorical_transformer = OneHotEncoder(handle_unknown='ignore')

# Preprocessing pipeline
preprocessor = ColumnTransformer(
    transformers=[
        ('num', numerical_transformer, numerical_cols),
        ('cat', categorical_transformer, categorical_cols)
    ])

# RandomForest Regressor
model = RandomForestRegressor(n_estimators=100, random_state=42)

# Create a complete pipeline
pipeline = Pipeline(steps=[('preprocessor', preprocessor),
                           ('model', model)])

# Split data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train the pipeline
pipeline.fit(X_train, y_train)

# Predictions on the test set
y_pred = pipeline.predict(X_test)

# Model evaluation
mse = mean_squared_error(y_test, y_pred)
mae = mean_absolute_error(y_test, y_pred)
print(f"Mean Squared Error: {mse}")
print(f"Mean Absolute Error: {mae}")

# Feature Importance
rf_model = pipeline.named_steps['model']
feature_names = numerical_cols + list(pipeline.named_steps['preprocessor'].transformers_[1][1].get_feature_names_out())
importances = rf_model.feature_importances_
feature_importance_df = pd.DataFrame({'Feature': feature_names, 'Importance': importances})
feature_importance_df = feature_importance_df.sort_values(by='Importance', ascending=False)
print(feature_importance_df)

# Save the trained model
model_path = 'model/financial_model.pkl'
joblib.dump(pipeline, model_path)
print(f"Model saved to {model_path}")

# Function to predict new data
def predict_new_data(new_data):
    pipeline = joblib.load(model_path)  # Load the saved model
    predicted_discretionary = pipeline.predict(new_data)
    return predicted_discretionary[0]

# Predict on new data
new_data = pd.DataFrame({
    'income': [5000],
    'savings': [10000],
    'credit_usage': [700],
    'loan_balance': [15000],
    'monthly_spending': [1200],
    'investment_portfolio': [3000],
    'age': [35],
    'employment_status': ['full-time'],
    'education_level': ['bachelor\'s'],
    'credit_score': [600],
    'debt_to_income_ratio': [5],
    'monthly_essentials': [500],
    'risk_appetite': ['medium'],
    'long_term_goals': ['invest more']
})

# Get prediction
predicted_discretionary = predict_new_data(new_data)
print(f"Predicted Monthly Discretionary Income: {predicted_discretionary}")
