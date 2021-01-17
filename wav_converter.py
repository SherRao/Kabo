# import wave
# import base64

# read_file = open("audio_recording", "rb")
# read_file = base64.encodebytes(read_file.encode())

# with wave.open("sound.wav", "wb") as write_file:
#     write_file.setnchannels(2)
#     write_file.setsampwidth(2)
#     write_file.setframerate(44100)
#     write_file.writeframes(read_file)
#     write_file.close()


# wave.open("processed_file.wav", "wb")
# wave.Wave_write.setnchannels(2)
# wave.Wave_write.setsampwidth(2)
# wave.Wave_write.setframerate(44100)
# wave.Wave_write.writeframesraw(read_file)

import wave
import sys
import os
import soundfile
import wave


def convert(files):
    for file in files:
        with open(file, 'rb') as pcmfile:
            pcmdata = pcmfile.read()
        with wave.open(file+'.wav', 'wb') as wavfile:
            wavfile.setparams((2, 2, 48000, 0, 'NONE', 'NONE'))
            wavfile.writeframes(pcmdata)


def convert1(files):
    for file in files:
        data, samplerate = soundfile.read(file)
        soundfile.write(file, data, samplerate)

    with wave.open(file, "rb") as in_f:
        print(repr(in_f.getparams()))


convert(['audio_bot_recording'])
convert1(['audio_bot_recording.wav'])
