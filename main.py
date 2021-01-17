import audio
import lyrics
import stt
import wav_converter


def main():
    user_file_name = "audio_user_recording.wav"
    song_file_name = "audio_bot_recording.wav"
    wav_converter.convert([r"audio_user_recording", r"audio_bot_recording"])

    user_lyrics = stt.audio_to_text(user_file_name)
    # = lyrics.get_lyric_list(song, artist)
    actual_lyrics = stt.audio_to_text(song_file_name)

    user_pitches = audio.get_pitches(user_file_name)
    song_pitches = audio.get_pitches(song_file_name)
    pitches_diff = audio.compare_pitches(song_pitches, user_pitches)

    return pitches_diff, lyrics_diff


print(main())
