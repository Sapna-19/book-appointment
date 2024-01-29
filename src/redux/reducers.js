// src/redux/reducers.js
const initialState = {
    timeslots: [],
    // Add other state properties as needed
  };
  
  const rootReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_TIMESLOTS':
        return {
          ...state,
          timeslots: action.payload,
        };
      // Add other cases for different actions if needed
      default:
        return state;
    }
  };
  
  export default rootReducer;
  