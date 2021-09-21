import "../styles/utility.css";
import "../styles/intro.css";
import { Link } from "react-router-dom";

function Intro() {
  return (
    <div className="root">
      <div className="intro__container">
        <p> Intro page UI</p>
        <div className="buttons">
          <button>
            {" "}
            <Link to="/visualization"> Visualization </Link>{" "}
          </button>
          <button>
            {" "}
            <Link to="/counting-technique"> 5-4-3-2-1 </Link>{" "}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Intro;
