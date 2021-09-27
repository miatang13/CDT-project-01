import "../styles/utility.css";
import "../styles/meetVUI.css";
import Dictaphone from "../components/speechRec";
import { useDispatch } from "react-redux";
import { changeVUIState } from "./../actions";
import { useEffect } from "react";

function MeetVUI() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(changeVUIState("appear"), [dispatch]);
  }, []);

  return (
    <div className="root">
      <div className="center__container">
        <h2> Meet VUI</h2>
        <div className="speechrec__container"></div>
      </div>
    </div>
  );
}

export default MeetVUI;
//<Dictaphone />;
