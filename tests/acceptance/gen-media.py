# Generates the silent-ish test media the mock site serves (kept out of git).
import math, os, wave

here = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'media')
os.makedirs(here, exist_ok=True)

def make(name, secs, freq):
    w = wave.open(os.path.join(here, name), 'wb')
    w.setnchannels(1); w.setsampwidth(1); w.setframerate(8000)
    w.writeframes(bytes(128 + int(20 * math.sin(2 * math.pi * freq * i / 8000)) for i in range(secs * 8000)))
    w.close()

make('content.wav', 900, 220)
make('ad.wav', 4, 440)
