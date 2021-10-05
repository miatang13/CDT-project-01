import "../styles/utility.css";
import "../styles/app.css";
import "../styles/landing.css";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { changeUserName } from "../actions";
import { useState, useEffect, useRef } from "react";
import gsap from "gsap";

function Landing() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [input, setInput] = useState("Enter your name");

  const handleSubmit = () => {
    dispatch(changeUserName(input), [dispatch]);
    console.log(input);
    history.push({ pathname: "/nova", search: "?user=" + input });
  };

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const titleRef = useRef();
  const blurbRef = useRef();
  const formRef = useRef();
  const containerRef = useRef();
  const refs = [titleRef, blurbRef, formRef];

  useEffect(() => {
    let tl = gsap.timeline({ delay: 0.5 });
    const ease = "power3.out";
    refs.forEach((ref, index) => {
      tl.to(
        ref.current,
        {
          opacity: 1,
          duration: 2,
          ease: ease,
        },
        index * 1.2
      );
    });
    tl.to(
      containerRef.current,
      {
        opacity: 1,
        "margin-top": 0,
        skewY: "-10deg",
        duration: 3,
        ease: ease,
      },
      1
    );
  }, []);

  return (
    <div className="root">
      <div className="landing__container">
        <div className="content__container" ref={containerRef}>
          <h1 className="title__text" ref={titleRef}>
            {" "}
            nova{" "}
          </h1>
          <h4 className="landing__blurb" ref={blurbRef}>
            Meet Nova, a voice user-interface designed to help users navigate
            their anxiety through guided, interactive mindfulness exercises.
          </h4>
          <form onSubmit={handleSubmit} ref={formRef}>
            <div id="name__input">
              <input type="text" onChange={handleChange} placeholder={input} />
            </div>
            <button id="enter__btn" type="submit" value="Enter">
              Enter{" "}
            </button>
          </form>{" "}
        </div>
      </div>
    </div>
  );
}

export default Landing;
