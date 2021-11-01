import { NavLink } from "react-router-dom";
import "../styles/navigation.css";

export default function NavigationBar() {
  return (
    <div id="header__container row">
      <div id="navigation__container">
        <div id="nav__content">
          <div class="column narrow__left" id="nav__content__left">
            <NavLink className="nav__route" to="/CDT-project-01">
              <span id="logo__text">Nova</span>
            </NavLink>
          </div>

          <div class="column wide__right" id="nav__content__right">
            <NavLink className="nav__route" to="/CDT-project-01/nova">
              Meet Nova
            </NavLink>
            <NavLink className="nav__route" to="/CDT-project-01/matrix">
              State Matrix
            </NavLink>
            <NavLink className="nav__route" to="/CDT-project-01/about">
              About
            </NavLink>
          </div>
        </div>
      </div>
      <hr></hr>
    </div>
  );
}
