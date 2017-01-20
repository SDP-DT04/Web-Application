import serial
import data
import struct

accel = getattr(data, 'data')

ser = serial.Serial('/dev/ttyACM0')

ser.write(bytearray(b'START'))
for value in accel:
    b = bytearray(struct.pack("f", value))
    ser.write(b)
    ser.write(bytearray(b'\n'))
ser.write(bytearray(b'STOP'))

ser.flush()
ser.close()
