import urequests
from machine import reset, Pin, WDT
import time
from display import white, black, white_box
from takePhoto import capture_post
import gc
import network

class Camboard:
  #must provide a url with the settings object
  def __init__(self,url,ssid,password):
    #these are not actual settings
    self.last_set = time.time()
    self.on_time = time.time()
    self.url = url
    self.last_shot = time.time()
    self.move_count = 0
    self.dots =0
    # connect to wifi
    self.do_connect(ssid,password)
    self.init_pins()
    self.pull_settings()
    #enable the garbage collector
    gc.enable()
    #enable Watchdog Timer w/ 5sec timer
    self.wdt=WDT(timeout=5000)

  def pull_settings(self):
    print('pulling settings')
    data = {}
    #reset the pull settings time
    self.last_set=time.time()
    #now try to pull all of our settings and save them
    black('Updating')
    try:
      data = urequests.get(self.url).json()
    except:
      reset()
    print(data)
    self.armed = bool(data.get('armed',True))
    self.quality = int(data.get('quality',40))
    self.delay = int(data.get('delay',2))
    self.pre_delay = int(data.get('pre_delay',0))
    self.min_move = int(data.get('min_move',0))
    self.update_period = int(data.get('update_period',60*1))
    self.max_on_time = int(data.get('max_on_time',60*60*1))
    self.instant_photo = bool(data.get('instant_photo',False))
    if self.instant_photo: 
      self.try_post()
      self.instant_photo=False

  def check_update(self):
    if time.time()-self.last_set>self.update_period:
      self.last_set = time.time()
      self.pull_settings()
  
  def check_reset(self):
    if time.time()-self.on_time>self.max_on_time:
      black(' RESTARTING')
      print('Scheduled restart')
      reset()
  
  def check_arm_btn(self):
    #if our button is pressed
    if not self.btn.value():
      #toggle the armed value
      self.armed= not self.armed
      if self.armed:
        white('  --ARMED--')
      else:
        black('  Disarmed')
      time.sleep(1)

  def check_all(self):
    self.check_reset()
    self.check_update()
    self.check_arm_btn()

  def do_connect(self,ssid,password):
    k=0
    wlan = network.WLAN(network.STA_IF)
    wlan.active(True)
    if not wlan.isconnected():
        print('connecting to network...')
        wlan.connect(ssid,password)
        while not wlan.isconnected():
            k+=1
            dots = '.'*(k % 4)
            black('  Connecting' +  dots)
            pass
    print('network config:', wlan.ifconfig())
    #sleep for 2 seconds after connecting
    time.sleep(2)

  def init_pins(self):
    #init the PIR pin
    self.pir = Pin(33, Pin.IN)
    # btn is 0 when pressed
    self.btn = Pin(34, Pin.IN)

  def show_monitor(self):
    #reset move count
    self.move_count=0
    if self.armed:
      black(' *Monitoring*' + self.dots*'.')
    else:
      black(' Monitoring' + self.dots*'.')
    self.dots=0 if self.dots>2 else self.dots+1

  def check_motion(self):
    # if motion detected
    if self.pir.value():
      white('  Motion: ' + str(self.move_count))
      #incr move count
      self.move_count+=1
      if self.armed:
        now = time.time()
        if now-self.last_shot>self.delay and self.move_count>self.min_move:
          #sleep for pre-delay
          time.sleep_ms(self.pre_delay)
          #show a white box on the screen
          white_box()
          print(gc.mem_free())
          #take photo
          print('Taking Photo')
          self.try_post()
          #clear unused memory!
          gc.collect()
          #record the last shot time
          self.last_shot = now
    else:
      self.show_monitor()

  def try_post(self):
    try:
      capture_post(self.quality)
    except:
      print('Photo issue')

  def monitor(self):
    while True:
      #check all update conditions
      self.check_all()
      self.check_motion()
      #time.sleep_ms(50)
      gc.collect()
      self.wdt.feed()

