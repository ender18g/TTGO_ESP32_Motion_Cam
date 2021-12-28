from flask import Flask
from flask import send_file, jsonify, request
import requests
from datetime import datetime
import json
app = Flask(__name__)


@app.route('/')
def hello_world():
    delay = 5
    quality = 15
    settings = {'delay': delay, 'quality': quality, 'armed': False}
    r = requests.get(
        "https://esp32-cam-c0916-default-rtdb.firebaseio.com/settings.json")
    if r.ok:
        settings = json.loads(r.content)
    return jsonify(settings)


@app.route("/image", methods=["GET", "POST"])
def image_handler():
    if request.method == "POST":
        buf = request.data
        now = datetime.now()
        time_string = now.strftime('%Y-%m-%d_%H-%M-%S')
        with open(f"{app.root_path}/images/photo.jpg", 'wb') as f:
            f.write(buf)
        if post_firebase(buf, time_string):
            post_database(time_string, str(now))
        return 'File Received!'
    return send_file('./images/photo.jpg', mimetype='image/jpeg')


def post_firebase(buf, filename):
    URL = 'https://firebasestorage.googleapis.com/v0/b/esp32-cam-c0916.appspot.com/o/stash%2F'
    URL += f"{filename}.jpg"
    headers = {"Content-Type": "image/jpeg"}
    r = requests.post(URL, data=buf, headers=headers)
    return r.ok


def post_database(filename, timestamp):
    URL = "https://esp32-cam-c0916-default-rtdb.firebaseio.com/images.json"
    info_dict = {'filename': filename, 'timestamp': timestamp}
    r = requests.post(URL, data=json.dumps(info_dict))
    return r.ok
