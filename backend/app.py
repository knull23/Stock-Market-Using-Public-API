import os
from flask import Flask, jsonify, request
import requests
from flask_cors import CORS
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Enable Cross-Origin Resource Sharing (CORS)

# Get the API key from environment variables
API_KEY = os.getenv("MARKETSTACK_API_KEY")  # Ensure you set this in your .env file
BASE_URL = "http://api.marketstack.com/v1"

@app.route('/api/stock', methods=['GET'])
def get_stock_data():
    # Get stock symbol from query parameters
    symbol = request.args.get('symbol')

    if not symbol:
        return jsonify({"error": "No symbol provided"}), 400

    # Prepare API request to MarketStack
    url = f"{BASE_URL}/eod"
    params = {
        'access_key': API_KEY,
        'symbols': symbol
    }

    try:
        # Send the request to MarketStack API
        response = requests.get(url, params=params)
        response.raise_for_status()  # Raise an error for bad responses (4xx, 5xx)

        # Parse the JSON response
        data = response.json()
        if "data" not in data or not data["data"]:
            return jsonify({"error": "Invalid stock symbol or no data available"}), 400

        # Return the stock data
        return jsonify(data["data"])

    except requests.exceptions.RequestException as e:
        return jsonify({"error": f"Error fetching data from MarketStack: {str(e)}"}), 500

if __name__ == '__main__':
    app.run(debug=True)



