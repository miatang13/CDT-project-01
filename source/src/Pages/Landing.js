import "../styles/utility.css";
import { Link } from "react-router-dom";

function Landing() {
  return (
    <div className="root">
      <p> Landing page UI</p>
      <Link to="/intro">
        <button>Intro</button>
      </Link>
    </div>
  );
}

export default Landing;
