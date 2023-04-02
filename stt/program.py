import requests
import time

#AssemblyAI Api Key 
authKey = '3b6daf0efbd24027b07bbd56588e7ecd'

headers = {
    'authorization' : authKey,
    'content-type'  : 'application/json'
}

uploadUrl      = 'https://api.assemblyai.com/v2/upload'
transcriptUrl  = 'https://api.assemblyai.com/v2/transcript'

# --------------------------------

def uploadMyFile(fileName):

    def _readMyFile(fn):

        chunkSize = 10#5242880

        with open(fn, 'rb') as fileStream:

            while True:
                data = fileStream.read(chunkSize)

                if not data:
                    break

                yield data
    # END def _readMyFile

    response = requests.post(
        uploadUrl,
        headers= headers,
        data= _readMyFile(fileName)
    )

    json = response.json()

    return json['upload_url']
# END def uploadMyFile

def startTranscription(aurl):

    response = requests.post(
        transcriptUrl,
        headers= headers,
        json= { 'audio_url' : aurl }
    )
    
    json = response.json()

    return json['id']
# END def startTranscription

def getTranscription(tid):

    maxAttempts = 10
    timedout    = False

    while True:
        response = requests.get(
            f'{transcriptUrl}/{tid}', #transcriptUrl + '/' + tid,
            headers= headers
        )

        json = response.json()

        if json['status'] == 'completed':
            break

        maxAttempts -= 1
        timedout = maxAttempts <= 0

        if timedout:
            break

        # Wait for 3 seconds before make the next try!
        # Why? Because we don't want to set AssemblyAI on Fire!!!
        # Search at youtube for: IT Crowd Fire at a Sea Parks
        time.sleep(3)

    return 'Timeout...' if timedout else json['text']
# END def getTranscription

# --------------------------------

import pyaudio
import wave

CHUNK = 1024
FORMAT = pyaudio.paInt16
CHANNELS = 2
RATE = 44100
RECORD_SECONDS = 6
WAVE_OUTPUT_FILENAME = "output.wav"

p = pyaudio.PyAudio()

stream = p.open(format=FORMAT,
                channels=CHANNELS,
                rate=RATE,
                input=True,
                frames_per_buffer=CHUNK)

print("* recording")

frames = []

for i in range(0, int(RATE / CHUNK * RECORD_SECONDS)):
    data = stream.read(CHUNK)
    frames.append(data)

print("* done recording")

stream.stop_stream()
stream.close()
p.terminate()

wf = wave.open(WAVE_OUTPUT_FILENAME, 'wb')
wf.setnchannels(CHANNELS)
wf.setsampwidth(p.get_sample_size(FORMAT))
wf.setframerate(RATE)
wf.writeframes(b''.join(frames))
wf.close()
audioUrl = uploadMyFile(WAVE_OUTPUT_FILENAME)
print("Uploading")
# step 2) Start Transcription
transcriptionID = startTranscription(audioUrl)

# step 3) Get Transcription Text
text = getTranscription(transcriptionID)
file = open('read.txt', 'w')
file.write(text)
file.close()
print(f'Result: {text}')