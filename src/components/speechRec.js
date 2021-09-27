import React from "react";
import { useDispatch } from "react-redux";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { changeSoundState } from "../actions";
import "../styles/utility.css";

const Dictaphone = () => {
  const dispatch = useDispatch();
  const commands = [
    {
      command: "*",
      callback: () => dispatch(changeSoundState(true), [dispatch]),
    },
  ];
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition({ commands });

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    <div className="">
      <div className="center__container">
        <p>Microphone: {listening ? "on" : "off"}</p>
        <span> Your input: </span>
        <p> {transcript}</p>
        <div className="buttons__container">
          <button onClick={SpeechRecognition.startListening}>Start</button>
          <button onClick={SpeechRecognition.stopListening}>Stop</button>
          <button onClick={resetTranscript}>Reset</button>
        </div>
      </div>
    </div>
  );
};
export default Dictaphone;

//{ continuous: true }
