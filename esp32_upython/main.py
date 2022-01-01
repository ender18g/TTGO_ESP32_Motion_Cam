#import wifimgr
from display import white, black, white_box
from machine import Pin, reset
import time
from takePhoto import capture_post
import urequests
import gc
gc.enable()
print(gc.mem_free())
i = 0



# white('Wifi Setup...')
# wlan = wifimgr.get_connection()
# if wlan is None:
#     print("Could not initialize the network connection.")
#     while True:
#         pass  # you shall not pass :D

#Connect to our WIFI

def do_connect():
    import network
    k=0
    wlan = network.WLAN(network.STA_IF)
    wlan.active(True)
    if not wlan.isconnected():
        print('connecting to network...')
        wlan.connect('SUAS', 'usna-suas')
        while not wlan.isconnected():
            k+=1
            dots = '.'*(k % 4)
<<<<<<< HEAD
            black('Connecting' +  dots)
=======
            black('  Connecting' +  dots)
>>>>>>> 50bc0a380ba744376999b7030e4fc0b3e9cb56f2
            pass
    print('network config:', wlan.ifconfig())

do_connect()



# Main Code goes here, wlan is a working network.WLAN(STA_IF) instance.
print("ESP OK")
black('  Connected')
time.sleep(2)

# get the delay and quality values
settings_url = 'http://allan18g.pythonanywhere.com/'
settings = urequests.get(settings_url).json()
print(settings)

armed = settings.get('armed', True)
quality = int(settings.get('quality', 30))
delay = int(settings.get('delay', 5))
pre_delay = int(settings.get('pre_delay', 0))
min_move = int(settings.get('min_move', 4))


pir = Pin(33, Pin.IN)
# btn is 0 when pressed
btn = Pin(34, Pin.IN)
# record seconds so that we can avoid too manys photos
last_shot = time.time()

# we will restart every x seconds
max_on_time = 60*60
on_time = time.time()

#keep track of persistent movement
move_count=0

# num of dots to show
dots=0

black(' Monitoring...')


while True:
    if time.time()-on_time > max_on_time:
        reset()

    if not btn.value():
        # if btn is pressed alternate arming the camera
        armed = not armed
        if armed:
            white('  --ARMED--')
        else:
            black('  Disarmed')
        time.sleep(2)

    # if motion detected, edit screen
    if pir.value():
        white('  Motion: ' + str(move_count))
        #increment our move counter
        move_count +=1
        #record the time so that we can check on the delay
        now = time.time()
        #if it's beyond the delay, armed, and meets # movements take photo
        if now-last_shot > delay and (armed and move_count>=min_move):
            #sleep for pre-delay
            time.sleep_ms(pre_delay)
            #show a white box on the screen
            white_box()
            print(gc.mem_free())
            #take photo
            capture_post(quality)
            #clear unused memory!
            gc.collect()
            #record the last shot time
            last_shot = now
    else:
        #no motion was detected
        move_count=0
        #now implement the monitoring... routine
        if armed:
            black(' *Monitoring*' + dots*'.')
        else:
            black(' Monitoring' + dots*'.')
        dots=0 if dots>2 else dots+1

    time.sleep_ms(100)
