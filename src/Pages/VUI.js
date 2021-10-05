import "../App.css";
import "../styles/reactTransition.css";
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
import { capitalizeFirstLetter } from "../utility/string";

// animations
import gsap from "gsap";
import { TransitionGroup } from "react-transition-group"; // ES6
import { DEBUG_STATES } from "../utility/debug";

// debug

function VUI() {
  // state
  const vuiState = useSelector((state) => state.vuiState);
  const soundState = useSelector((state) => state.soundState);
  const dispatch = useDispatch();

  // webgl
  const containerRef = useRef(null);
  const webglApp = useRef(null);

  // data
  const [jsxConvoArr, setJsxConvoArr] = useState([]);
  const convoRef = useRef();
  const [vuiActivity, setVuiAct] = useState("intro");

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
      webglApp.current.vuiChangeState(vuiState.vuiStateStr);
    }
  }, [vuiState]);

  useEffect(() => {
    if (vuiActivity === "visualization") {
      let tl = gsap.timeline();

      tl.to(convoRef.current, {
        opacity: 0,
        duration: 3,
      });
    }
  }, [vuiActivity]);

  const jsxRef = useRef();

  const updateStateArr = (text, isUserText = false) => {
    console.log("Update transcripts");
    let cls = "transcript__text";
    let clsEnd = isUserText ? "__user" : "__vui";
    cls = cls + clsEnd;
    let keyVal = jsxConvoArr.length;
    let jsx = (
      <span className={cls} ref={jsxRef} key={keyVal}>
        {" "}
        {text}{" "}
      </span>
    );

    let newArr = jsxConvoArr;
    newArr.push(jsx);
    setJsxConvoArr(newArr);
  };

  useEffect(() => {
    console.log("jsx changed");
  }, [jsxConvoArr]);

  const commands = [
    {
      command: "Nova I need help",
      callback: () => {
        updateStateArr(
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
          "Ok. " +
            vuiState.userName +
            ", let’s go to a different place together, a more peaceful place. "
        );
        dispatch(changeVUIState("visualization"), [dispatch]);
        setVuiAct("visualization");
      },
    },
    {
      /*TO-DO: error case */
      command: "I don't know",
      callback: () => {
        updateStateArr(
          "Let’s focus on using an exercise to calm your anxiety right now. Which exercise would you like to do, a visualization or a sensory exercise? ."
        );
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
    if (transcript === "") return;
    updateStateArr(capitalizeFirstLetter(transcript) + ".", true);
  };

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }
  return (
    <div className="App">
      <div id="webgl" ref={containerRef}></div>
      <div className="root">
        <div className="VUI_UI_container">
          <div className="conversation__container" ref={convoRef}>
            <TransitionGroup
              transitionName="convoJsx"
              transitionEnterTimeout={500}
              transitionLeaveTimeout={300}
            >
              {jsxConvoArr}
            </TransitionGroup>
          </div>
        </div>
        <div className="microphone__container">
          <div className="center__container">
            <div className="buttons__container">
              <button
                onTouchStart={handleStartListen}
                onMouseDown={handleStartListen}
                onTouchEnd={handleStopListen}
                onMouseUp={handleStopListen}
                id="microphone__btn"
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
