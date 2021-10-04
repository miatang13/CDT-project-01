import { DEFAULT_STATE } from "./defaultState";
import { combineReducers } from "redux";

const vuiStateReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case "VUI_STATE_CHANGE":
      return {
        ...state,
        vuiStateStr: action.payload,
      };
    default:
      return state;
  }
};

const soundStateReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case "SOUND_STATE_CHANGE":
      console.log("sound change");
      return {
        ...state,
        stateState: action.payload,
      };
    default:
      return state;
  }
};

const userNameReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case "USER_NAME_CHANGE":
      console.log("user name change");
      return {
        ...state,
        stateState: action.payload,
      };
    default:
      return state;
  }
};

const allReducers = combineReducers({
  vuiState: vuiStateReducer,
  soundState: soundStateReducer,
  username: userNameReducer,
});

export default allReducers;
