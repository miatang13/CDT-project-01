import "../App.css";
import "../styles/reactTransition.css";
import "../styles/vui.css";
import React, { useEffect, useRef, useState } from "react";
import WebGLApp from "../webgl/webgl-app";
import { useSelector } from "react-redux";
import StateDebugger from "../components/stateDebugger";
import ReduxThunk from "redux-thunk";

// speech rec stuff
import { useDispatch } from "react-redux";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { changeSoundState, changeVisPhase, changeVUIState } from "../actions";
import "../styles/utility.css";
import { capitalizeFirstLetter } from "../utility/string";

// animations
import gsap from "gsap";
import { DEBUG_STATES } from "../utility/debug";
import { vis_vui_instructions } from "../speech/vui-instructions";

// debug

function VUI() {
  // state
  const vuiState = useSelector((state) => state.vuiState);
  const visPhase = useSelector((state) => state.visPhase);
  const dispatch = useDispatch();

  // webgl
  const containerRef = useRef(null);
  const webglApp = useRef(null);
  const phoneCutoutRef = useRef(null);
  const cssContainerRef = useRef(null);

  // data
  const [userText, setUserText] = useState("");
  const [vuiText, setVuiText] = useState("Time date placeholder.");
  const convoRef = useRef();

  useEffect(() => {
    if (containerRef.current === null) return;
    if (webglApp.current !== null) return;
    console.log("Initializing GL with: ", containerRef.current);

    function onWindowResize() {
      webglApp.current.handleResize(window.innerWidth, window.innerHeight);
    }

    webglApp.current = new WebGLApp(
      containerRef.current,
      cssContainerRef.current,
      phoneCutoutRef.current,
      {
        width: window.innerWidth,
        height: window.innerHeight,
      }
    );
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

  useEffect(() => {}, [visPhase]);

  const commands = [
    {
      command: "Nova I need help",
      callback: () => {
        setVuiText(
          "Good afternoon, " +
            vuiState.userName +
            ", you will get through this moment. I am here to guide you. " +
            " Would you like to do a visualization or a sensory exercise? "
        );
        dispatch(changeVUIState("appearing"), [dispatch]);
      },
    },
    // begin visualization, phase 0
    {
      command: "(a) visualization",
      callback: () => {
        console.log("just heard visualization");
        setVuiText(
          "Ok. " +
            vuiState.userName +
            ", let’s go to a different place together, a more peaceful place. "
        );
        setUserText("");
        dispatch(changeVUIState("activate_visualization"), [dispatch]);
        setVuiText(vis_vui_instructions[0].vui_text);
      },
    },
    // phase 1
    {
      command: "* ripples *",
      callback: () => {
        console.log("just heard ripples");
        setVuiText(vis_vui_instructions[1].vui_text);
      },
    },
    // phase 2
    {
      command: "* green hills *",
      callBack: () => {
        dispatch(changeVUIState("speaking"), [dispatch]);
        setVuiText(vis_vui_instructions[2].vui_text);
        setInterval(function () {
          dispatch(changeVUIState("stop_speaking"), [dispatch]);
          //dispatch(changeVisPhase(2), [dispatch]);
        }, 2000);
      },
    },
    // phase 3
    {
      command: "* flowers *",
      callBack: () => {
        dispatch(changeVUIState("speaking"), [dispatch]);
        setVuiText(vis_vui_instructions[3].vui_text);
        setInterval(function () {
          dispatch(changeVUIState("stop_speaking"), [dispatch]);
          //dispatch(changeVisPhase(3), [dispatch]);
        }, 2000);
      },
    },
    {
      command: "I don't know",
      callback: () => {
        setVuiText(
          "Let’s focus on using an exercise to calm your anxiety right now. Which exercise would you like to do, a visualization or a sensory exercise?"
        );
        dispatch(changeVUIState("static"), [dispatch]);
      },
    },
  ];
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition({ commands, isFuzzyMatch: true });

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
    setUserText(capitalizeFirstLetter(transcript) + ".", true);
  };

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  const testLerp = () => {
    webglApp.current.lerpBackground();
  };

  return (
    <div className="VUI">
      <div id="webgl" ref={containerRef}></div>
      <div id="css" ref={cssContainerRef}></div>
      <div id="iphoneCutout" ref={phoneCutoutRef}></div>
      <div className="root" id="vui__root">
        <div className="VUI_UI_container">
          <div className="conversation__container" ref={convoRef}>
            <span className="transcript__text__vui">{vuiText}</span>
            {listening ? (
              <span className="transcript__text__user"> {transcript}</span>
            ) : (
              <span className="transcript__text__user"> {userText}</span>
            )}
          </div>
        </div>
        <div className="info__container">
          <div className="buttons__container">
            {DEBUG_STATES && (
              <button onClick={testLerp}> Lerp Background </button>
            )}
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
        <div className="script__container">
          <div className="center__container">
            <span>
              {" "}
              To experience our prototype, please follow the routine below:{" "}
            </span>
            <ol>
              <li>Nova, I need help.</li>
              <li>Visualization. </li>
              <li>I hear the ripples of the water. </li>
              <li>
                I can see the light blue water, some white clouds, and some
                green hills and trees.
              </li>
              <li> I see some pink and purple flowers.</li>
            </ol>
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
