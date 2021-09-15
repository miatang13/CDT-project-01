/* This version uses functional component and hooks */

import "./App.css";
import React, { useEffect, useRef } from "react";
import WebGLApp from "./webgl-app";

function App() {
  const containerRef = useRef(null);
  const webglApp = useRef(null);

  useEffect(() => {
    if (containerRef.current === null) return;
    console.log("in use effect", containerRef.current);

    // Handler to call on window resize
    function onWindowResize() {
      webglApp.current.handleResize(window.innerWidth, window.innerHeight);
    }

    webglApp.current = new WebGLApp(containerRef.current, {
      width: window.innerWidth,
      height: window.innerHeight,
    });
    webglApp.current.setup();
    webglApp.current.createObjs();
    webglApp.current.render(true);
    window.addEventListener("resize", onWindowResize, false);

    return () => {
      webglApp.current.render(false);
      window.removeEventListener("resize", onWindowResize, false);
    };
  }, []);
  /* only want to run the function given to useEffect after the initial render,
   * so we give it an empty array as second argument. */

  return <div className="App" ref={containerRef}></div>;
}

export default App;
