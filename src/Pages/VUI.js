import "../App.css";
import React, { useEffect, useRef } from "react";
import WebGLApp from "../webgl/webgl-app";
import { useSelector } from "react-redux";
import StateDebugger from "../components/stateDebugger";

// speech rec stuff
import { useDispatch } from "react-redux";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { changeSoundState, changeVUIState } from "../actions";
import "../styles/utility.css";

function VUI() {
  // state
  const vuiState = useSelector((state) => state.vuiState);
  const soundState = useSelector((state) => state.soundState);

  // webgl
  const containerRef = useRef(null);
  const webglApp = useRef(null);

  useEffect(() => {
    if (containerRef.current === null) return;
    console.log("Initializing GL with: ", containerRef.current);

    // Handler to call on window resize
    function onWindowResize() {
      webglApp.current.handleResize(window.innerWidth, window.innerHeight);
    }

    webglApp.current = new WebGLApp(containerRef.current, {
      width: window.innerWidth,
      height: window.innerHeight,
    });
    webglApp.current.setup();
    webglApp.current.render(true);
    window.addEventListener("resize", onWindowResize, false);

    return () => {
      webglApp.current.render(false);
      window.removeEventListener("resize", onWindowResize, false);
    };
  }, []);

  useEffect(() => {
    if (
      webglApp.current !== undefined &&
      webglApp.current !== null &&
      webglApp.current.vuiObj !== undefined &&
      webglApp.current.vuiObj !== null
    ) {
      console.log("change state to:", vuiState.vuiStateStr);
      webglApp.current.vuiChangeState(vuiState.vuiStateStr);
    }
  }, [vuiState]);

  const dispatch = useDispatch();
  const commands = [
    {
      command: "*",
      callback: () => dispatch(changeSoundState(true), [dispatch]),
    },
    {
      command: "Nova I need help",
      callback: () => dispatch(changeVUIState("appearing"), [dispatch]),
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

  const handleStartListen = () => {
    SpeechRecognition.startListening({ continuous: true });
    dispatch(changeSoundState(true), [dispatch]);
    dispatch(changeVUIState("listening"), [dispatch]);
  };

  const handleStopListen = () => {
    SpeechRecognition.stopListening();
    dispatch(changeVUIState("stop_listening"), [dispatch]);
    dispatch(changeSoundState(false), [dispatch]);
  };

  return (
    <div className="App">
      <div id="webgl" ref={containerRef}></div>
      <div className="root">
        <div className="center__container">
          <div className="VUI_UI_container">
            <div className="conversation__container">
              <span id="transcript__text">{transcript}</span>
            </div>
          </div>
        </div>

        <div className="microphone__container">
          <span> Toggle microphone </span>
          <div className="center__container">
            <div className="buttons__container">
              <button
                onTouchStart={handleStartListen}
                onMouseDown={handleStartListen}
                onTouchEnd={handleStopListen}
                onMouseUp={handleStopListen}
              >
                Hold to talk
              </button>
            </div>
            <p>Microphone: {listening ? "on" : "off"}</p>
          </div>
        </div>
        <div className="helpers__container">
          <StateDebugger webglApp={webglApp} />
        </div>
      </div>
    </div>
  );
}

export default VUI;
