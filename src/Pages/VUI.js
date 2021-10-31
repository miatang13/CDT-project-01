import "../App.css";
import "../styles/reactTransition.css";
import "../styles/utility.css";
import "../styles/vui.css";
import React, { useEffect, useRef, useState } from "react";
import WebGLApp from "../webgl/webgl-app";
import { useSelector } from "react-redux";

// speech rec stuff
import { useDispatch } from "react-redux";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { changeVUIState } from "../actions";
import "../styles/utility.css";
import { capitalizeFirstLetter } from "../utility/string";

// animations
import gsap, { Power2 } from "gsap";
import { DEBUG_STATES } from "../utility/debug";
import { vis_vui_instructions } from "../speech/vui-instructions";
import { UserScript } from "../components/userScript";
import { monthNames } from "../utility/date";
import { Link } from "react-router-dom";
import NavigationBar from "../components/navigation";
import { user_instructions } from "../speech/user-instructions";

// debug

function VUI() {
  // state
  const vuiState = useSelector((state) => state.vuiState);
  const dispatch = useDispatch();

  // webgl
  const containerRef = useRef(null);
  const webglApp = useRef(null);
  const phoneCutoutRef = useRef(null);
  const cssContainerRef = useRef(null);

  // data
  const [userText, setUserText] = useState("");
  const d = new Date();
  const [vuiTextArr, setVuiText] = useState([
    "Welcome, it's " +
      monthNames[d.getMonth()] +
      " " +
      d.getDate() +
      ", " +
      d.getFullYear() +
      ".",
  ]);
  const convoRef = useRef();
  const [instructionTextArr, setInstructionText] = useState([]);
  // the last phase that is displayed
  const [instructionTextNum, setInstructionNum] = useState(0);
  // user's phase stage
  const [userTextNum, setUserTextNum] = useState(0);
  const [vuiTalking, setVuiTalking] = useState(false);

  useEffect(() => {
    setInstructionNum(userTextNum);
    console.log("Set instruction text to", userTextNum);
  }, [userTextNum, instructionTextNum]);

  useEffect(() => {
    let endIndex = instructionTextNum + 2;

    if (endIndex >= user_instructions.length) {
      console.log("Reached end of instruction");
      return;
    }

    let newArr = [];
    for (var i = instructionTextNum; i <= endIndex; i++) {
      newArr.push(user_instructions[i]);
    }
    setInstructionText(newArr);
    console.log("Set new instruction text arr to", newArr);
  }, [instructionTextNum]);

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
      },
      setVuiTalking
    );
    webglApp.current.setup();
    webglApp.current.render(true);
    window.addEventListener("resize", onWindowResize, false);
    document.addEventListener("keydown", handleStartListen, false);
    document.addEventListener("keyup", handleStopListen, false);

    return () => {
      webglApp.current.render(false);
      window.removeEventListener("resize", onWindowResize, false);
      document.removeEventListener("keydown", handleStartListen, false);
      document.removeEventListener("keyup", handleStopListen, false);
    };
  }, []);

  useEffect(() => {
    if (
      webglApp.current !== undefined &&
      webglApp.current !== null &&
      webglApp.current.vuiObj !== undefined &&
      webglApp.current.vuiObj !== null
    ) {
      console.log(vuiState.vuiState);
      webglApp.current.changeState(
        vuiState.vuiState.vuiStateStr,
        vuiState.vuiState.visState,
        vuiState.vuiState.playSound
      );
    }
  }, [vuiState]);

  const animateTextOut = (callbackFunc, delay = 5) => {
    const fullCallBack = () => {
      let num = userTextNum + 1;
      setUserTextNum(num);
      console.log("User text changed to", num);
      callbackFunc();
    };
    const tl = gsap.timeline({ onComplete: fullCallBack, delay: delay });
    tl.to(convoRef.current, {
      opacity: 0,
      duration: 2,
      ease: Power2.easeInOut,
    });
  };
  const animateTextIn = () => {
    const tl = gsap.timeline();
    tl.to(convoRef.current, {
      opacity: 1,
      duration: 2,
      ease: Power2.easeInOut,
    });
  };

  const needHelpOnComp = () => {
    setVuiText([
      "Hi Caitlyn, you will get through this moment. I am always here for you and to guide you. ",
      "Would you like to do a visualization or a sensory exercise? ",
    ]);
    setUserText("");
    dispatch(changeVUIState("appearing", -10, true), [dispatch]);
    animateTextIn();
  };

  const visualizationOnComp = () => {
    setVuiText(vis_vui_instructions[0].vui_texts);
    setUserText("");
    dispatch(changeVUIState("activate_visualization", 1, true), [dispatch]);
    animateTextIn();
  };

  const ripplesOnComp = () => {
    setVuiText(vis_vui_instructions[1].vui_texts);
    setUserText("");
    dispatch(changeVUIState("visualization", 3, true), [dispatch]);
    animateTextIn();
  };

  const blueWaterOnComp = () => {
    setVuiText(vis_vui_instructions[2].vui_texts);
    setUserText("");
    dispatch(changeVUIState("visualization", 9, true), [dispatch]);
    animateTextIn();
  };

  const liliesOnComp = () => {
    setVuiText(vis_vui_instructions[3].vui_texts);
    setUserText("");
    dispatch(changeVUIState("visualization", 14, true), [dispatch]);
    animateTextIn();
  };

  const calmerOnComp = () => {
    setVuiText(vis_vui_instructions[4].vui_texts);
    setUserText("");
    dispatch(changeVUIState("visualization", 14, true), [dispatch]);
    animateTextIn();
  };

  const commands = [
    {
      command: "Nova I need help",
      callback: () => {
        dispatch(changeVUIState("appearing", -10, false), [dispatch]);
        animateTextOut(needHelpOnComp, 2);
      },
    },
    // begin visualization, phase 0
    {
      command: "(a) visualization",
      callback: () => {
        animateTextOut(visualizationOnComp);
      },
    },
    // phrase 1
    {
      command: "I hear the ripples of the water",
      callback: () => {
        animateTextOut(ripplesOnComp);
      },
    },
    // phase 2
    {
      command: "* sky is becoming brighter",
      callback: () => {
        dispatch(changeVUIState("visualization", 5, false), [dispatch]);
      },
    },
    {
      command: "* light blue water *",
      callback: () => {
        animateTextOut(blueWaterOnComp);
      },
    },
    // phase 3
    {
      command: "* water lilies *",
      callback: () => {
        animateTextOut(liliesOnComp);
      },
    },
    // phase 4
    {
      command: "* feeling calmer *",
      callback: () => {
        animateTextOut(calmerOnComp);
      },
    },
    // phase 5
    {
      command: "No I'm alright",
      callback: () => {
        const onComp = () => {
          setVuiText(vis_vui_instructions[5].vui_texts);
          setUserText("");
          dispatch(changeVUIState("no_change", 14, true), [dispatch]);
          animateTextIn();
        };
        animateTextOut(onComp);
      },
    },
    // phase 6
    {
      command: "I was feeling overwhelmed *",
      callback: () => {
        const onComp = () => {
          setVuiText(vis_vui_instructions[6].vui_texts);
          setUserText("");
          dispatch(changeVUIState("finish_visualization", 20, true), [
            dispatch,
          ]);
          animateTextIn();
        };
        animateTextOut(onComp);
      },
    },
    {
      command: "I don't know",
      callback: () => {
        setVuiText([
          "Let’s focus on using an exercise to calm your anxiety right now.",
          "Which exercise would you like to do, a visualization or a sensory exercise?",
        ]);
        dispatch(changeVUIState("static", -10), [dispatch]);
      },
    },
  ];
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition({ commands, isFuzzyMatch: true });

  const handleStartListen = (event) => {
    if (event.repeat || vuiTalking) {
      return;
    }

    console.log("Start listen");
    SpeechRecognition.startListening({ continuous: true });
    resetTranscript();
    dispatch(changeVUIState("listening", -10, false), [dispatch]);
  };

  const handleStopListen = () => {
    console.log("Stop listen");
    SpeechRecognition.stopListening();
    if (transcript === "") return;
    setUserText(capitalizeFirstLetter(transcript) + ".", true);
    dispatch(changeVUIState("stop_listening", -10, false), [dispatch]);
  };

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    <div className="VUI">
      <div id="webgl" ref={containerRef}></div>
      <div id="css" ref={cssContainerRef}></div>
      <img
        src="./images/iphone_cutout_color.png"
        id="iphoneCutout"
        alt="oops"
        ref={phoneCutoutRef}
      ></img>
      <div className="root">
        <NavigationBar />
        <div className="row">
          <div className="column left" id="VUI_UI_container">
            <div className="conversation__container" ref={convoRef}>
              {vuiTextArr.map((text, i) => (
                <span className="transcript__text__vui" key={i}>
                  {text}
                </span>
              ))}

              {listening ? (
                <span className="transcript__text__user"> {transcript}</span>
              ) : (
                <span className="transcript__text__user"> {userText}</span>
              )}
            </div>
          </div>
          <div className="column right" id="info__container">
            <div id="info__content">
              <div id="about__container">
                <div>
                  {" "}
                  <h1> Visualization Exercise </h1>
                  <hr></hr>
                </div>

                <p>
                  {" "}
                  The Visualization Exercise gives you the opportunity to
                  co-create a personal landscape with Nova. Nova will guide you
                  through this sensory experience with ambient sound, calming
                  visuals, and breathing exercises.{" "}
                </p>
              </div>
              <div id="instructions__container">
                <h2>Speak the script below to engage with Nova.</h2>
                <hr></hr>
                <div id="instructions__texts">
                  {" "}
                  {instructionTextArr.map((text, i) => (
                    <span className="instruction__text" key={i}>
                      {text}
                    </span>
                  ))}
                </div>

                <hr></hr>
              </div>
              <div id="manual__helper">
                {vuiTalking ? (
                  <h2> Nova is currently talking. </h2>
                ) : (
                  <h2>
                    {" "}
                    Hold the <span id="highlight__text"> spacebar </span> to
                    speak.{" "}
                  </h2>
                )}
                <p>Microphone is currently {listening ? "on" : "off"}.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default VUI;

/**
 * 
 * 
 * 
          <div className="buttons__container">
            {DEBUG_STATES && (
              <button onClick={testLerp}> Lerp Background </button>
            )}
          </div>

        {DEBUG_STATES && (
          <div className="helpers__container">
            <StateDebugger webglApp={webglApp} />
          </div>
        )}



  const testLerp = () => {
    webglApp.current.lerpBackground();
  };
 */
