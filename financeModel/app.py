from flask import Flask, request, jsonify
import joblib
import os

app = Flask(__name__)

model_path = 'model/bank_income_model.pkl'
model = joblib.load(model_path)

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    # Extract features from the request data
    features = [[data['savings'], data['credit_usage'], data['loan_balance'], data['monthly_spending']]]
    prediction = model.predict(features)
    return jsonify({'predicted_income': prediction[0]})

if __name__ == '__main__':
    app.run(debug=True)
