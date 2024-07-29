const initialState = {
  body: {}
};

function globalMessageReducer (state = initialState, action) {
  switch (action.type) {
  case 'SET_GLOBAL_MESSAGE':
    return {
      ...state,
      body: action.payload,
    };
  case 'CLEAR_GLOBAL_MESSAGE':
    return {
      ...state,
      body: {},
    };
  default:
    return state;
  }
}

export default globalMessageReducer;
