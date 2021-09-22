import "../styles/utility.css";
import "../styles/intro.css";
import { Link } from "react-router-dom";

function Intro() {
  return (
    <div className="root">
      <div className="center__container">
        <h2> Welcome to your safe space. </h2>
        <p>
          {" "}
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </p>
        <button>
          {" "}
          <Link to="/meetVUI"> Meet your new friend, VUI NAME.</Link>
        </button>
      </div>
    </div>
  );
}

export default Intro;
