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
import StateDebugger from "./components/stateDebugger";

const DEBUG = true;

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

  return (
    <div className="App">
      <div id="webgl" ref={containerRef}></div>
      <StateDebugger webglApp={webglApp} />
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
