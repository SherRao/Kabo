import audio
import lyrics
import stt


def main():
    user_file_name = "user_recording.wav"
    song_file_name = "song_recording.wav"

    user_lyrics = stt.audio_to_text(file)
    actual_lyrics = lyrics.get_lyric_list(song, artist)
    lyrics_diff = lyrics.compare_lyrics(actual_lyrics, user_lyrics)

    user_pitches = audio.get_pitches(user_file_name)
    song_pitches = audio.get_pitches(song_file_name)
    pitches_diff = audio.compare_pitches(song_pitches, user_pitches)

    return pitches_diff, lyrics_diff
