import azure.cognitiveservices.speech as speechsdk


def from_file(file_path, key):
    speech_config = speechsdk.SpeechConfig(
        subscription=key, region="eastus")
    audio_input = speechsdk.AudioConfig(filename=file_path)
    speech_recognizer = speechsdk.SpeechRecognizer(
        speech_config=speech_config, audio_config=audio_input)

    result = speech_recognizer.recognize_once_async().get()
    return result.text.split(" ")
