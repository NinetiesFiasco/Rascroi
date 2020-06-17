/*
import example from './example.js';
*/
const initialState = {
  element: null,
};

function reducer(state=initialState, action){
  switch (action.type){
    case "SET_ELEMENT": return {
      ...state,
      element: action.payload
    };
    default: return state;
  }
}

export default reducer;