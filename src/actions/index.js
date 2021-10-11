export const changeVUIState = (state, visState, playSound) => {
  return {
    type: "VUI_STATE_CHANGE",
    payload: { stateStr: state, visState: visState, playSound: playSound },
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
