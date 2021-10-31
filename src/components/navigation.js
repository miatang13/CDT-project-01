import { Link } from "react-router-dom";
import "../styles/navigation.css";

export default function NavigationBar() {
  return (
    <div id="header__container row">
      <div id="navigation__container">
        <div id="nav__content">
          <div class="column narrow__left" id="nav__content__left">
            <span id="logo__text">Nova</span>
          </div>

          <div class="column wide__right" id="nav__content__right">
            <Link className="nav__route" to="/Nova">
              <span>Meet Nova</span>{" "}
            </Link>
            <Link className="nav__route" to="/StateMatrix">
              <span>State Matrix</span>{" "}
            </Link>
            <Link className="nav__route" to="/Process">
              {" "}
              <span>Process</span>
            </Link>
          </div>
        </div>
      </div>
      <hr></hr>
    </div>
  );
}
