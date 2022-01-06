from Camboard import Camboard
from machine import reset


# init camboard
url = 'http://allan18g.pythonanywhere.com'



#run camboard in try/except
try:
    camboard = Camboard(url,'SUAS','usna-suas')
    camboard.monitor()
except:
    print('Main.py Issues')