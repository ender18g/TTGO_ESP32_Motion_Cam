from datetime import datetime
import requests
from flask import request
from flask import send_file
from flask import Flask
app = Flask(__name__)


@app.route('/')
def hello_world():
    return 'Hello from Flask!'


@app.route("/image", methods=["GET", "POST"])
def image_handler():
    if request.method == "POST":
        buf = request.data
        now = datetime.now()
        time_string = now.strftime('%Y-%m-%d_%H-%M-%S')
        with open(f"{app.root_path}/images/photo.jpg", 'wb') as f:
            f.write(buf)
        post_firebase(buf, time_string)
        return 'File Received!'
    return send_file('./images/photo.jpg', mimetype='image/jpeg')


def post_firebase(buf, filename):
    URL = 'https://firebasestorage.googleapis.com/v0/b/esp32-cam-c0916.appspot.com/o/stash%2F'
    URL += f"{filename}.jpg"
    headers = {"Content-Type": "image/jpeg"}
    r = requests.post(URL, data=buf, headers=headers)
    return 1
