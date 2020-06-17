const initialState = {
  allCarts: null,
  redactor: false,
  redactedId: -1,
  error: "",
  data: null
};

function reducer(state=initialState, action){
  switch (action.type){
    case "SHOW_REDACTOR": return {
      ...state,
      redactor: action.payload
    };
    case "SET_DATA": return {
      ...state,
      allCarts: action.payload
    };
    case "REDACTED_ID": return {
      ...state,
      redactedId: action.payload
    }
    case "LOAD_CARTS": return loadCarts();
    default: return state;
  }

}

export default reducer;