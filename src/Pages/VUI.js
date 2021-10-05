import "../App.css";
import "../styles/vui.css";
import React, { useEffect, useRef, useState } from "react";
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

// debug
const DEBUG_STATES = false;

function VUI() {
  // state
  const vuiState = useSelector((state) => state.vuiState);
  const soundState = useSelector((state) => state.soundState);
  const dispatch = useDispatch();

  // webgl
  const containerRef = useRef(null);
  const webglApp = useRef(null);

  // data
  const [userTextArr, setUserTextArr] = useState([]);
  const [vuiTextArr, setVuiTextArr] = useState([]);
  const [jsxConvoArr, setJsxConvoArr] = useState([]);

  useEffect(() => {
    if (containerRef.current === null) return;
    if (webglApp.current !== null) return;
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

  const updateStateArr = (
    updateFunc,
    stateVar,
    item,
    needPeriodConcat = false
  ) => {
    let orig = stateVar;
    if (needPeriodConcat) {
      item = item + ".";
    }
    orig.push(item);
    updateFunc(orig);
  };

  const commands = [
    {
      command: "Nova I need help",
      callback: () => {
        updateStateArr(
          setVuiTextArr,
          vuiTextArr,
          "Good afternoon, " +
            vuiState.userName +
            ", you will get through this moment. I am here to guide you. " +
            " Would you like to do a visualization or a sensory exercise? "
        );
        dispatch(changeVUIState("appearing"), [dispatch]);
      },
    },
    {
      command: "A visualization",
      callback: () => {
        updateStateArr(
          setVuiTextArr,
          vuiTextArr,
          "Ok. " +
            vuiState.userName +
            ", let’s go to a different place together, a more peaceful place. "
        );
        dispatch(changeVUIState("visualization"), [dispatch]);
      },
    },
    {
      /*TO-DO: error case */
      command: "asfjasgjl",
      callback: () => {
        updateStateArr(setVuiTextArr, vuiTextArr, "Sorry, I didn't get that.");
      },
    },
  ];
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition({ commands });

  const handleStartListen = () => {
    SpeechRecognition.startListening({ continuous: true });
    resetTranscript();
    dispatch(changeSoundState(true), [dispatch]);
    dispatch(changeVUIState("listening"), [dispatch]);
  };

  const handleStopListen = () => {
    SpeechRecognition.stopListening();
    dispatch(changeVUIState("stop_listening"), [dispatch]);
    dispatch(changeSoundState(false), [dispatch]);
    updateStateArr(setUserTextArr, userTextArr, transcript, true);
  };

  const getConversationText = () => {
    let displayArr = userTextArr.reduce(function (arr, v, i) {
      return arr.concat(v, vuiTextArr[i]);
    }, []);
    let jsxElems = [];
    for (let i = 0; i < displayArr.length; i++) {
      let cls = "transcript__text";
      if (i % 2 === 0) {
        cls = cls + "__user";
      } else {
        cls = cls + "__vui";
      }
      jsxElems.push(<span className={cls}> {displayArr[i]} </span>);
    }
    return jsxElems;
  };

  return (
    <div className="App">
      <div id="webgl" ref={containerRef}></div>
      <div className="root">
        <div className="VUI_UI_container">
          <div className="conversation__container">{getConversationText()}</div>
        </div>
        <div className="microphone__container">
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
        {DEBUG_STATES && (
          <div className="helpers__container">
            <StateDebugger webglApp={webglApp} />
          </div>
        )}
      </div>
    </div>
  );
}

export default VUI;
