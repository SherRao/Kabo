#from pydub.utils import make_chunks
#from pydub import AudioSegment

import os
import numpy


# Takes a file on disk, and turns it into multiple files
# Unused
def split_file(audioFile):
    song = AudioSegment.from_mp3(audioFile)
    splitSong = make_chunks(song, 100)
    for i, splice in enumerate(splitSong):
        name = "{1}{2}.wav".format(audioFile, audioFile, i)
        splice.export(name, format="wav")

    return


# Takes list of files and returns list of integers
def get_pitches(audioFile):
    pitches = []
    stream = os.popen('aubio pitch {}'.format(audioFile))
    outputs = stream.readlines()

    for line in outputs:
        pitches.append(float(line.rstrip().split("\t")[1]))

    for pitch in pitches:
        print(pitch)

    return pitches


# Takes two lists of integers and returns a score value
# A: Actual pitches
# B: User pitches
def compare_pitches(a, b):
    sum = 0
    for i in range(len(a)):
        d = ((b[i] - a[i]) / a[i]) * 100
        sum += d

    sum /= len(a)
    return sum


get_pitches("440.wav")
