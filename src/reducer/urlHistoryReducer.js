const initialState = {
  currentUrl: '/',
  previousUrl: '/',
};

function urlHistoryReducer(state = initialState, action) {
  switch (action.type) {
  case 'SET_CURRENT_URL':
    return {
      ...state,
      previousUrl: state.currentUrl,
      currentUrl: action.payload.currentUrl
    };
  default:
    return state;
  }
}

export default urlHistoryReducer;
