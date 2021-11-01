import "./styles/app.css";
import React from "react";
import Landing from "./Pages/Landing";
import VUI from "./Pages/VUI";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { TransitionGroup, Transition } from "react-transition-group";
import { playTransitionIn, playTransitionOut } from "./utility/animation";
import Matrix from "./Pages/Matrix";
import About from "./Pages/About";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
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
                    <Route exact path="/CDT-project-01" component={Landing} />
                    <Route path="/CDT-project-01/nova" component={VUI} />
                    <Route path="/CDT-project-01/matrix" component={Matrix} />
                    <Route path="/CDT-project-01/about" component={About} />
                  </Switch>
                </Transition>
              </TransitionGroup>
            );
          }}
        ></Route>
      </BrowserRouter>
    </div>
  );
}

export default App;
