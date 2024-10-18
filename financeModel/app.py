from flask import Flask, request, jsonify
import joblib
import pandas as pd

app = Flask(__name__)

model_path = 'model/financial_model.pkl'
model = joblib.load(model_path)

@app.route('/predictModel', methods=['POST'])
def predict():

    data = request.get_json()
    input_data = pd.DataFrame([data])

    prediction = model.predict(input_data)

    return jsonify({'predicted_discretionary_income': prediction[0]})

if __name__ == '__main__':
    app.run(debug=False)
