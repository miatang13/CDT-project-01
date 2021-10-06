import "../App.css";

function StateDebugger(props) {
  var webglApp = props.webglApp;
  const changeState = (stateStr) => {
    console.log("handler", webglApp.current);
    if (
      webglApp.current !== undefined &&
      webglApp.current !== null &&
      webglApp.current.vuiObj !== undefined &&
      webglApp.current.vuiObj !== null
    ) {
      console.log("change state to:", stateStr);
      webglApp.current.vuiChangeState(stateStr);
    }
  };

  return (
    <div id="buttonStatesContainer">
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
      <button onClick={() => changeState("reassuring")}> Reassuring </button>
      <button onClick={() => changeState("thinking")}> Thinking </button>
      <button onClick={() => changeState("stop_thinking")}>
        {" "}
        Thinking Off{" "}
      </button>
      <button onClick={() => changeState("disappearing")}>
        {" "}
        Disappearing{" "}
      </button>
      <button onClick={() => changeState("visualization")}>
        {" "}
        Visualization{" "}
      </button>
    </div>
  );
}

export default StateDebugger;
