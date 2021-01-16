import numpy
import os

from pydub import AudioSegment
from pydub.utils import make_chunks

"""
Takes a file on disk, and turns it into multiple files
"""
def split_file(audioFile):
    song = AudioSegment.from_mp3(audioFile)
    splitSong = make_chunks(song, 100)
    for i, splice in enumerate(splitSong):
        name = "{0}{1}.wav".format(audioFile, i)
        splice.export(name, format="wav")

    return 

"""
Takes list of files and returns list of integers
"""
def get_pitches(audioFiles):
    pitches = []
    for file in audioFiles:
    
    
    return pitches

"""
Takes two lists of integers and returns a score value 

"""
def compare_pitches(a, b):
    return

split_file("440.wav")