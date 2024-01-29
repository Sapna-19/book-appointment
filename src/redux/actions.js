// src/redux/actions.js
export const setTimeslots = (timeslots) => {
    return {
      type: 'SET_TIMESLOTS',
      payload: timeslots,
    };
  };
  