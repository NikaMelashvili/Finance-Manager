import numpy as np
from flask import Flask, request, jsonify
import joblib

app = Flask(__name__)

# Load the trained model
model_path = 'model/financial_model.pkl'
model = joblib.load(model_path)

@app.route('/predictModel', methods=['POST'])
def predict():
    data = request.get_json()

    # Extract features from the request data
    features = np.array([[
        data['income'],
        data['savings'],
        data['credit_usage'],
        data['loan_balance'],
        data['monthly_spending'],
        data['investment_portfolio'],
        data['age'],
        data['credit_score'],
        data['debt_to_income_ratio'],
        data['monthly_essentials'],
        # Include categorical features here
        data['employment_status'],  # Assuming you have these in your model
        data['education_level'],
        data['risk_appetite'],
        data['long_term_goals']
    ]])

    # Make prediction using the trained model
    prediction = model.predict(features)

    return jsonify({'predicted_discretionary_income': prediction[0]})

if __name__ == '__main__':
    app.run(debug=True)
