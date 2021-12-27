import wifimgr
from display import draw, white, black, white_box
from machine import Pin
import time
from takePhoto import capture_post
import urequests

i = 0
white('Wifi Setup...')
wlan = wifimgr.get_connection()
if wlan is None:
    print("Could not initialize the network connection.")
    while True:
        pass  # you shall not pass :D


# Main Code goes here, wlan is a working network.WLAN(STA_IF) instance.
print("ESP OK")
black('Welcome')
time.sleep(2)

# get the delay and quality values
settings_url = 'http://allan18g.pythonanywhere.com/'
settings = urequests.get(settings_url).json()
print(settings)

armed = settings.get('armed', False)
quality = settings.get('quality', 30)
delay = settings.get('delay', 30)


pir = Pin(33, Pin.IN)
# btn is 0 when pressed
btn = Pin(34, Pin.IN)
# record seconds so that we can avoid too manys photos
last_shot = time.time()


black('Monitoring...')


while True:
    if not btn.value():
        # if btn is pressed alternate arming the camera
        armed = not armed
        if armed:
            white('--ARMED--')
        else:
            black('Disarmed')
        time.sleep(2)

    # if motion detected, edit screen
    if pir.value():
        white('Motion!')
        i = 0
        now = time.time()
        if now-last_shot > delay and armed:
            white_box('--PHOTO--')
            capture_post(quality)
            last_shot = now
    else:
        dots = '.'*(i % 4)
        if armed:
            black('** Monitoring' + dots)
        else:
            black('Monitoring' + dots)
        i += 1

    time.sleep_ms(100)
