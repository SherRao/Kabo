from pydub import AudioSegment

import wav_converter
import stt
import lyrics
import audio
from azure_test import from_file


def main():
    with open('azure.txt') as f:
        azure_key = f.readline()

    user_file = "./audio/audio_user_recording.wav"
    bot_file = "./audio/audio_bot_recording.wav"

    # Converts PCM to WAV
    wav_converter.convert("./audio/audio_user_recording")
    wav_converter.convert("./audio/audio_bot_recording")

    # Converts WAV to WAV64
    wav_converter.reconvert(user_file)
    wav_converter.reconvert(bot_file)

    song_name = ""
    song_artist = ""

    # user_lyrics =  lyrics.get_lyric_list(song, artist)
    user_lyrics = from_file(user_file, azure_key)
    actual_lyrics = from_file(user_file, azure_key)
    lyrics_diff = lyrics.compare_lyrics(actual_lyrics, user_lyrics)

    user_pitches = audio.get_pitches(user_file)
    song_pitches = audio.get_pitches(bot_file)
    pitches_diff = audio.compare_pitches(song_pitches, user_pitches)

    return pitches_diff, lyrics_diff


print(main())
