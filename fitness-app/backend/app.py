from flask import Flask, jsonify
from flask_cors import CORS
from pymongo import MongoClient

app = Flask(__name__)
CORS(app)

# Direct MongoDB connection string (Replace <password> with your actual password)
MONGO_URI = "mongodb+srv://jash:jash@cluster0.a6mky.mongodb.net/fitnessApp?retryWrites=true&w=majority"
client = MongoClient(MONGO_URI)
db = client['fitnessApp']
leaderboard_collection = db['leaderboard']

# Insert dummy data only if the collection is empty
if leaderboard_collection.count_documents({}) == 0:
    leaderboard_data = [
        {"username": "john_doe", "score": 100},
        {"username": "jane_smith", "score": 90},
        {"username": "alice_williams", "score": 80},
        {"username": "bob_brown", "score": 70},
        {"username": "charlie_jones", "score": 60},
    ]
    leaderboard_collection.insert_many(leaderboard_data)

@app.route('/leaderboard', methods=['GET'])
def get_leaderboard():
    leaderboard = list(leaderboard_collection.find({}, {"_id": 0}).sort("score", -1))  # Sort in descending order
    return jsonify(leaderboard)

if __name__ == '__main__':
    app.run(debug=True)
