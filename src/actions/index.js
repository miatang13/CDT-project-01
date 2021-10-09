export const changeVUIState = (state, visState) => {
  return {
    type: "VUI_STATE_CHANGE",
    payload: { stateStr: state, visState: visState },
  };
};

export const changeSoundState = (stateBool) => {
  return {
    type: "SOUND_STATE_CHANGE",
    payload: stateBool,
  };
};

export const changeUserName = (nameStr) => {
  return {
    type: "USER_NAME_CHANGE",
    payload: nameStr,
  };
};
