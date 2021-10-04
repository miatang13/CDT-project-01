import "../styles/utility.css";
import "../styles/app.css";
import "../styles/landing.css";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { changeUserName } from "../actions";
import { useState } from "react";

function Landing() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [input, setInput] = useState("Enter your name");

  const handleSubmit = () => {
    dispatch(changeUserName(input), [dispatch]);
    console.log(input);
    history.push("/nova");
  };

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  return (
    <div className="root">
      <div className="landing__container">
        <h1 className="title__text"> NOVA </h1>
        <p className="landing__blurb">
          Meet Nova, a voice user-interface designed to help users navigate
          their anxiety through guided, interactive mindfulness exercises.
        </p>
        <form onSubmit={handleSubmit}>
          <div id="name__input">
            <input type="text" onChange={handleChange} placeholder={input} />
          </div>
          <button id="enter__btn" type="submit" value="Enter">
            Enter{" "}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Landing;
