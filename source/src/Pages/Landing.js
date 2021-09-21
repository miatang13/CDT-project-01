import "../styles/utility.css";
import "../styles/app.css";
import "../styles/landing.css";
import { Link } from "react-router-dom";

function Landing() {
  return (
    <div className="root">
      <div className="landing__container">
        <h1 className="title__text"> Title </h1>
        <p className="landing__blurb">
          {" "}
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </p>
        <Link to="/intro">
          <button> Begin Your Journey </button>
        </Link>
      </div>
    </div>
  );
}

export default Landing;
