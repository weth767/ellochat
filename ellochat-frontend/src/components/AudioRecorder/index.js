import React, { useState, useEffect } from 'react';
import { MdPlayArrow, MdStop, MdSend } from 'react-icons/md';
import './styles.css';

export default function AudioRecorder(props) {
    const [audioURL, setAudioURL] = useState("");
    const [isRecording, setIsRecording] = useState(false);
    const [recorder, setRecorder] = useState(null);

    useEffect(() => {
        if (recorder === null) {
            if (isRecording) {
                requestRecorder().then(setRecorder, console.error);
            }
            return;
        }

        if (isRecording) {
            recorder.start();
        } 

        const handleData = e => {
            const reader = new FileReader();
            reader.onloadend = () => {
                setAudioURL(reader.result);
            }
            reader.readAsDataURL(e.data);
        };

        recorder.addEventListener("dataavailable", handleData);
        return () => recorder.removeEventListener("dataavailable", handleData);
    }, [recorder, isRecording, props]);


    const startRecording = () => {
        setIsRecording(true);
    };

    const stopRecording = () => {
        setIsRecording(false);
        recorder.stop();
    };

    async function sendAudio() {
        props.audioRecorderCallback(audioURL);
    }

    async function requestRecorder() {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        return new MediaRecorder(stream);
    }

    return (
        <div className="modal" id="audioRecovery" tabIndex="-1" role="dialog"
            aria-labelledby="audioRecoveryTitle" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h3 className="h3 mb-3 font-weight-bold text-blue"> Gravador de Áudio </h3>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="row">
                            <audio src={audioURL} controls />
                        </div>
                        <div className="modal-footer mt-3 ">
                            <button onClick={() => sendAudio()} 
                            disabled={audioURL === "" || isRecording} 
                                className="btn btn-primary" data-dismiss="modal">
                                <MdSend color="white"/>
                            </button>
                            <button onClick={startRecording} disabled={isRecording} 
                                className="btn btn-success">
                                <MdPlayArrow color="white"/>
                            </button>
                            <button onClick={stopRecording} disabled={!isRecording} 
                                className="btn btn-danger">
                                <MdStop color="white"/>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}