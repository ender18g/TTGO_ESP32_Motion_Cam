import wifimgr
from display import white, black, white_box
from machine import Pin, reset
import time
from takePhoto import capture_post
import urequests
import gc
gc.enable()
print(gc.mem_free())
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
quality = int(settings.get('quality', 30))
delay = int(settings.get('delay', 30))


pir = Pin(33, Pin.IN)
# btn is 0 when pressed
btn = Pin(34, Pin.IN)
# record seconds so that we can avoid too manys photos
last_shot = time.time()

# we will restart every x seconds
max_on_time = 60*60
on_time = time.time()


black('Monitoring...')


while True:
    if time.time()-on_time > max_on_time:
        reset()

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
            print(gc.mem_free())
            capture_post(quality)
            gc.collect()
            last_shot = now
    else:
        dots = '.'*(i % 4)
        if armed:
            black('** Monitoring' + dots)
        else:
            black('Monitoring' + dots)
        i += 1

    time.sleep_ms(100)
