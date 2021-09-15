import "../styles/utility.css";
import { Link } from "react-router-dom";

function Intro() {
  return (
    <div className="root">
      <p> Intro page UI</p>
      <Link to="/breathe">
        <button>Breathe</button>
      </Link>
    </div>
  );
}

export default Intro;
