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
import VUI from "./Pages/VUI";

function App() {
  return (
    <div className="App">
      <VUI />
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
