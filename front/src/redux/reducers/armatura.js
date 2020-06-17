const initialState = {
  allArmatura: null,
  redactor: false,
  redactedId: -1,
  error: "",
  data: null
};

function reducer(state=initialState, action){
  switch (action.type){
    case "SHOW_ARMATURA_REDACTOR": return {
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
    };
    case "SET_CART_ID": return {
      ...state,
      cartId: action.payload
    };
    case "SET_ARMATURA": return {
      ...state,
      allArmatura: action.payload
    };

    default: return state;
  }

}

export default reducer;