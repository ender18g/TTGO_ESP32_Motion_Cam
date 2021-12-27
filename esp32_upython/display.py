from machine import Pin, I2C
import ssd1306

i2c = I2C(scl=Pin(22), sda=Pin(21), freq=100000)
display = ssd1306.SSD1306_I2C(128, 64, i2c)


def draw(text='Allan'):
    display.fill(0)
    display.fill_rect(0, 0, 32, 32, 1)
    display.fill_rect(2, 2, 28, 28, 0)
    display.vline(9, 8, 22, 1)
    display.vline(16, 2, 22, 1)
    display.vline(23, 8, 22, 1)
    display.fill_rect(26, 24, 2, 4, 1)
    display.text('MicroPython', 40, 0, 1)
    display.text('SSD1306', 40, 12, 1)
    display.text('OLED 128x64', 40, 24, 1)
    display.text(text, 0, 42, 1)
    display.show()


def white(text=''):
    display.fill(1)
    display.text(text, 0, 24, 0)
    display.show()


def black(text=''):
    display.fill(0)
    display.text(text, 0, 24, 1)
    display.show()


def white_box(text='', t=20):
    display.fill(0)
    display.fill_rect(t, t, 128-2*t, 64-2*t, 1)
    display.text(text, t+5, t+5, 0)
    display.show()
