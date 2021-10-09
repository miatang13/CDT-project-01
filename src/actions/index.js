export const changeVUIState = (stateStr) => {
  return {
    type: "VUI_STATE_CHANGE",
    payload: stateStr,
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

export const changeVisPhase = (phaseInt) => {
  return {
    type: "VIS_PHASE_CHANGE",
    payload: phaseInt,
  };
};
