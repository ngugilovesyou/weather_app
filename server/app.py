from flask import Flask, request, jsonify
import requests
from flask_cors import CORS
from dotenv import load_dotenv
import os

app = Flask(__name__)
CORS(app)
load_dotenv()
OPENWEATHERMAP_API_KEY = os.getenv('OPENWEATHERMAP_API_KEY')

@app.route('/api/weather', methods=['GET'])
def get_weather():
    city = request.args.get('city')
    if not city:
        return jsonify({"error": "City parameter is required"}), 400
    
    url = f'http://api.openweathermap.org/data/2.5/weather?q={city}&appid={OPENWEATHERMAP_API_KEY}&units=metric'
    response = requests.get(url)
    data = response.json()

    if response.status_code != 200:
        return jsonify({"error": data.get("message", "Error fetching weather data")}), 400
    
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)
