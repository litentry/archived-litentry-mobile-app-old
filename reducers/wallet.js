const INITIAL_STATE = {
  nes: 0,
  eth: 0,
  swtc: 0,
};

const reducer = (state = , action) => {
  switch (action.type) {
    case 'UPDATE_STATE':
      return { ...state, ...action.state };
  }
};

export default reducer