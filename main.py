import wav_converter
import stt
import lyrics
import audio
import json
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

    # Loads the saved data from main.js regarding the song name and artist for Genius lyric search.
    with open('info.json') as json_file:
        data = json.load(json_file)
        song_name = data['song']
        song_artist = data['name']

    print('A')
    user_lyrics = from_file(user_file, azure_key)
    actual_lyrics = lyrics.get_lyric_list(
        song_name, song_artist)  # from_file(user_file, azure_key)

    print('B')
    user_pitches = audio.get_pitches(user_file)
    song_pitches = audio.get_pitches(bot_file)

    print('C')
    lyrics_diff = lyrics.compare_lyrics(actual_lyrics, user_lyrics)
    pitches_diff = audio.compare_pitches(song_pitches, user_pitches)

    output = {'pitch': '{}'.format(
        pitches_diff), 'lyrics': '{}'.format(lyrics_diff)}

    with open('results.json', 'w') as json_file:
        json.dump(output, json_file)
        print("dumped data to json file")

    print(output)
    return pitches_diff, lyrics_diff


print(main())
