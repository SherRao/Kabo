import audio
import lyrics
import stt
import wav_converter
from pydub import AudioSegment
# AudioSegment.converter = "D:/Documents/Lazyman/streamlink/Streamlink/Dependencies/ffmpeg/ffmpeg.exe"


def main():
    # "./audio/audio_user_recording.wav"
    user_file_name = "./audio_user_recording.wav"
    # "./audio/audio_bot_recording.wav"
    # song_file_name = "./audio_bot_recording.wav"
    wav_converter.convert(
        [r"audio_user_recording", r"audio_bot_recording"])

    # AudioSegment.from_wav("./audio_user_recording.wav").export(
    #     "./audio_user_recording.mp3", format="mp3")
    # AudioSegment.from_wav("./audio_bot_recording.wav").export(
    #     "./audio_bot_recording.mp3", format="mp3")

    #lyrics.get_lyric_list(song, artist)
    user_lyrics = stt.audio_to_text("./_audio_user_recording.wav")
    # actual_lyrics = stt.audio_to_text(song_file_name)
    # lyrics_diff = lyrics.compare_lyrics(actual_lyrics, user_lyrics)

    user_pitches = audio.get_pitches(user_file_name)
    # song_pitches = audio.get_pitches(song_file_name)
    # pitches_diff = audio.compare_pitches(song_pitches, user_pitches)

    pitches_diff, lyrics_diff = None
    return pitches_diff, lyrics_diff


print(main())
