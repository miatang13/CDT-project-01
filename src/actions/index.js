export const changeVUIState = (stateStr) => {
  return {
    type: "VUI_STATE_CHANGE",
    payload: stateStr,
  };
};
