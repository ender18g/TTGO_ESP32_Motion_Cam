from Camboard import Camboard
from machine import reset


# init camboard
url = 'http://allan18g.pythonanywhere.com'
camboard = Camboard(url,'SUAS','usna-suas')



#run camboard in try/except
try:
    camboard.monitor()
except:
    reset()