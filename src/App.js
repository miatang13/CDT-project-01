import "./App.css";
import React, { useEffect, useRef, useState } from "react";
import WebGLApp from "./webgl/webgl-app";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import { Transition, TransitionGroup } from "react-transition-group";
import { playTransitionIn, playTransitionOut } from "./utility/animation.js";
import Landing from "./Pages/Landing";
import Visualization from "./Pages/Visualization";
import Count from "./Pages/Count";
import Intro from "./Pages/Intro";
import MeetVUI from "./Pages/Meet";
import { useSelector } from "react-redux";

function App() {
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
  /* only want to run the function given to useEffect after the initial render,
   * so we give it an empty array as second argument. */

  /*
  useEffect(() => {
    if (vuiState.vuiStateStr === "appear") {
      webglApp.current.vuiChangeState("appearing");
    }
  }, [vuiState])

  useEffect(() => {
    if (
      webglApp.current !== undefined &&
      webglApp.current.sphere !== undefined
    ) {
      if (!webglApp.current.isAnimatingSound) {
        webglApp.current.animateSound();
      }
    }
  }, [soundState]);;*/

  const changeState = (stateStr) => {
    console.log("handler", webglApp.current);
    if (
      webglApp.current !== undefined &&
      webglApp.current !== null &&
      webglApp.current.vuiObj !== undefined &&
      webglApp.current.vuiObj !== null
    ) {
      console.log("change state");
      webglApp.current.vuiChangeState(stateStr);
    }
  };

  return (
    <div className="App">
      <div id="webgl" ref={containerRef}></div>
      <div className="root">
        <div className="center__container" id="buttonStatesContainer">
          <button onClick={() => changeState("appearing")}> Appearing </button>
          <button onClick={() => changeState("listening")}> Listening </button>
          <button onClick={() => changeState("stop_listening")}>
            {" "}
            Stop Listening{" "}
          </button>
          <button onClick={() => changeState("speaking")}> Speaking </button>
          <button onClick={() => changeState("stop_speaking")}>
            {" "}
            Stop Speaking{" "}
          </button>
          <button onClick={() => changeState("reassuring")}>
            {" "}
            Reassuring{" "}
          </button>
          <button onClick={() => changeState("thinking")}> Thinking </button>
          <button onClick={() => changeState("disappearing")}>
            {" "}
            Disappearing{" "}
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;

/**
 * <BrowserRouter>
        <Route
          render={({ location }) => {
            const { pathname, key } = location;

            return (
              <TransitionGroup component={null}>
                <Transition
                  native
                  key={key}
                  appear={true}
                  onEnter={(node) => playTransitionIn(pathname, node)}
                  onExiting={(node) => playTransitionOut(pathname, node)}
                  timeout={{ enter: 300, exit: 350 }}
                >
                  <Switch location={location}>
                    <Route exact path="/" component={Landing} />
                    <Route path="/intro" component={Intro} />
                    <Route path="/meetVUI" component={MeetVUI} />
                    <Route path="/visualization" component={Visualization} />
                    <Route path="/counting-technique" component={Count} />
                  </Switch>
                </Transition>
              </TransitionGroup>
            );
          }}
        ></Route>
      </BrowserRouter>
 */
