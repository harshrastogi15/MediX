import React, { useEffect } from 'react';
import { createSpeechlySpeechRecognition } from '@speechly/speech-recognition-polyfill';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';

const appId = 'fbb437c0-2bdc-47b6-a1ec-b1943965785e';
const SpeechlySpeechRecognition = createSpeechlySpeechRecognition(appId);
SpeechRecognition.applyPolyfill(SpeechlySpeechRecognition);



const Dictaphone = (props) => {
    const {updateMessageMic} = props
    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
    } = useSpeechRecognition();

    useEffect(()=>{
        if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
            console.log('NOT Supported')
            return null;
        }
        updateMessageMic(transcript)
    },[SpeechRecognition, transcript])

 
    return (
        <div>
            {/* <p>Microphone: {listening ? 'on' : 'off'}</p> */}
            {
                listening ? 
                <button onClick={SpeechRecognition.stopListening}>
                    <MicIcon/>
                </button>
                : 
                <button onClick={SpeechRecognition.startListening} >
                    <MicOffIcon/>
                </button>
            } 
            {/* <button onClick={SpeechRecognition.startListening}>Start</button>
            <button onClick={SpeechRecognition.stopListening}>Stop</button> */}
            {/* <button onClick={resetTranscript}>Reset</button> */}
            {/* <p>{transcript}</p> */}
        </div>
    );
};
export default Dictaphone;