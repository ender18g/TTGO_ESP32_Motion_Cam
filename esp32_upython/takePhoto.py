import camera
import urequests as requests
from time import localtime
import ujson

camera.init(0, d0=5, d1=14, d2=4, d3=15, d4=18, d5=23, d6=36, d7=39, href=25,
            vsync=27, sioc=12, siod=13, xclk=32, pclk=19, format=camera.JPEG, pwdn=26)

camera.quality(30)

#BASE_URL = 'https://esp32-cam-c0916-default-rtdb.firebaseio.com/'
BASE_URL = 'http://allan18g.pythonanywhere.com/image'


def capture_buf():
    buf = camera.capture()
    return buf


def post_buf(buf):
    r = requests.post(BASE_URL, data=buf)
    print(r)
    return r


def capture_post():
    r = post_buf(capture_buf())
    return(r)
