from flask import Flask, jsonify
from flask_socketio import SocketIO
from flask_cors import CORS
import json
import random
import time, threading
from datetime import datetime
 
app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins="*")
CORS(app)

# Example mock robot data
robotData = json.load(open("fake_robot_data.json", "r"))
robots = [robo for robo in robotData]

@app.route('/')
def index():
    return jsonify(robots)

def update_robots():
    while True:
        for robot in robots:
            if robot["Battery Percentage"] == 0:
                robot["Battery Percentage"] = random.randint(30, 70)
            robot["Battery Percentage"] = max(0, robot["Battery Percentage"] - 1)
            robot["CPU Usage"] = random.randint(0, 100)
            robot["RAM Consumption"] = random.randint(0, 100)
            robot["Online/Offline"] = robot["Battery Percentage"] > 0
            robot["Last Updated"] = datetime.now().isoformat()
            robot["Location Coordinates"] = [random.uniform(-90, 90), random.uniform(-180, 180)]
        socketio.emit("update_robots", {"robots": robots})
        time.sleep(5)

thread = threading.Thread(target=update_robots, daemon=True)
thread.start()

if __name__ == '__main__':
    socketio.run(app)

