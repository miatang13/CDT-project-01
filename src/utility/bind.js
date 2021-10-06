export const bindNewMethods = (bindObj, BIND_FUNCS, FUNC_NAMES) => {
  if (BIND_FUNCS.length !== FUNC_NAMES.length) {
    console.log("Wrong inputs to bind new methods");
    return;
  }
  BIND_FUNCS.forEach((func, index) => {
    bindFuncWithObj(bindObj, func, FUNC_NAMES[index]);
  });
};

/**
 * Private
 */

const bindFuncWithObj = (obj, func, methodStr) => {
  obj[methodStr] = func.bind(obj);
};
