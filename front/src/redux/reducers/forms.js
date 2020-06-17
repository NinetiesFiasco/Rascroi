const initialState = {
  EnterForm: false
};

function reducer(state=initialState, action){
  switch (action.type){
    case "SHOW_ENTER": return {
      ...state,
      EnterForm: action.payload
    };
    default: return state;
  }
}

export default reducer;