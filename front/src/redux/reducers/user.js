const initialState = {
  login: false
};

function reducer(state=initialState, action){
  switch (action.type){
    case "USER_LOGIN": return {
      ...state,
      login: action.payload
    };
    default: return state;
  }
}

export default reducer;