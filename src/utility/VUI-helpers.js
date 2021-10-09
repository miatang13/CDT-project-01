import { changeVUIState } from "../actions";

export function updateStateAysnc(vuiStateStr, delaySec) {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(changeVUIState(vuiStateStr));
    }, delaySec * 1000);
  };
}
