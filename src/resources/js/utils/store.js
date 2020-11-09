function SET_DATA(state, data) {
  state.data = data.reduce((accumulator, item) => {
    accumulator[item.id] = item;
    return accumulator;
  }, {});
}

function REMOVE_DATA(state, id) {
  const data = Object.values(state.data);

  state.data = data.reduce((accumulator, item) => {
    if (item.id !== id) {
      accumulator[item.id] = item;
    }

    return accumulator;
  }, {});
}

function SET_MODEL(state, model) {
  state.model = { ...model };
}

function RESET_MODEL(state) {
  state.model = { ...state.default };
}

export { SET_DATA, REMOVE_DATA, SET_MODEL, RESET_MODEL };
