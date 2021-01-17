from pydub import AudioSegment
from pydub.utils import make_chunks

import speech_recognition
import numpy
import os


"""
Takes an audio file on disk, and turns it into multiple files
Unused
"""


def split_file(audioFile: str):
    song = AudioSegment.from_mp3(audioFile)
    splitSong = make_chunks(song, 100)
    for i, splice in enumerate(splitSong):
        name = "{1}{2}.wav".format(audioFile, audioFile, i)
        splice.export(name, format="wav")

    return


"""
Takes an audio file name and returns a list of pitches for timestamps throughout the audio file
"""


def get_pitches(audioFile: str):
    pitches = []
    stream = os.popen('aubio pitch {}'.format(audioFile))
    outputs = stream.readlines()

    for line in outputs:
        pitches.append(float(line.rstrip().split("\t")[1]))

    return pitches


"""
Takes two lists of integers and returns a score value
 A: Actual pitches
 B: User pitches
"""


def compare_pitches(a: list, b: list):
    sum = 0
    for i in range(len(a)):
        # Prevents dividing by zero
        if(a[i] == 0):
            continue

        if(i >= len(b)):
            break

        # Percentage difference between the i'th element in a and b
        actual_pitch = a[i]
        user_pitch = b[i]
        if(abs(actual_pitch - user_pitch) <= 50):
            sum += 1

    sum /= len(a)
    sum *= 100
    return sum
