import speech_recognition

"""
Takes an audio file name and returns a list of words spoken in that file
"""


def audio_to_text(audioFile):
    sr = speech_recognition.Recognizer()
    with speech_recognition.AudioFile(audioFile) as source:
        data = sr.record(source)
        lyrics = sr.recognize_google(data)
        print(lyrics)

    return lyrics.lower().split(" ")
