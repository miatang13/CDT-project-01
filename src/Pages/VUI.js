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
import { DEBUG_STATES } from "../utility/debug";

// debug

function VUI() {
  // state
  const vuiState = useSelector((state) => state.vuiState);
  const dispatch = useDispatch();

  // webgl
  const containerRef = useRef(null);
  const webglApp = useRef(null);

  // data
  const [jsxConvoArr, setJsxConvoArr] = useState([]);
  const convoRef = useRef();

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

      if (vuiState.vuiStateStr === "visualization") {
        updateStateArr(
          "Imagine that you are at a lake, the waters are calm, and the current is mild. You can feel a light breeze blowing by you. In this place, what do you hear?",
          false,
          true
        );
        dispatch(changeVUIState("thinking"), [dispatch]);
      }
    }
  }, [vuiState]);

  const jsxRef = useRef();

  const clearConvo = () => {
    setJsxConvoArr([]);
  };

  const updateStateArr = (text, isUserText = false, emptyOut = false) => {
    console.log("Update transcripts with: ", text);
    let cls = "transcript__text";
    let clsEnd = isUserText ? "__user" : "__vui";
    cls = cls + clsEnd;

    let setFunc = setJsxConvoArr;
    let Arr = jsxConvoArr;

    if (emptyOut) {
      let jsx = (
        <span className={cls} ref={jsxRef} key={0}>
          {" "}
          {text}{" "}
        </span>
      );
      setFunc([jsx]);
      console.log("after reset", Arr);
      return;
    }

    let keyVal = Arr.length;
    let jsx = (
      <span className={cls} ref={jsxRef} key={keyVal}>
        {" "}
        {text}{" "}
      </span>
    );

    let newArr = Arr;
    newArr.push(jsx);
    setFunc(newArr);
    console.log(newArr);
  };

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
      command: "* visualization",
      callback: () => {
        updateStateArr(
          "Ok. " +
            vuiState.userName +
            ", let’s go to a different place together, a more peaceful place. "
        );
        gsap.to(convoRef.current, {
          opacity: 0,
          duration: 1,
          delay: 1,
          ease: "sine.out",
        });
        setTimeout(function () {
          gsap.to(convoRef.current, {
            opacity: 1,
            duration: 1,
            ease: "sine.out",
          });
          dispatch(changeVUIState("visualization"), [dispatch]);
        }, 3000);
      },
    },
    {
      command: "visualization",
      callback: () => {
        updateStateArr(
          "Ok. " +
            vuiState.userName +
            ", let’s go to a different place together, a more peaceful place. "
        );
        setTimeout(function () {
          dispatch(changeVUIState("visualization"), [dispatch]);
        }, 2000);
      },
    },
    {
      /*TO-DO: error case */
      command: "I don't know",
      callback: () => {
        updateStateArr(
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
            {jsxConvoArr}
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

/**
 *  <button
          onClick={() =>
            dispatch(changeVUIState("visualization"), [dispatch])
          }
        >
          {" "}
          Visualization{" "}
        </button>
        <button onClick={() => clearConvo()}> Reset </button>)
 */
