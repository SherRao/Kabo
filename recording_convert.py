import wave

read_file = wave.open("audio_recording", "rb")

wave.open("processed_file.wav", "wb")
wave.Wave_write.setnchannels(2)
wave.Wave_write.setsampwidth(2)
wave.Wave_write.setframerate(44100)
wave.Wave_write.writeframesraw(read_file)
