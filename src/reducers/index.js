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

const allReducers = combineReducers({
  vuiState: vuiStateReducer,
});

export default allReducers;
