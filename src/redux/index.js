// src/redux/index.js
import { combineReducers } from 'redux';
import rootReducer from './reducers';

const rootReducerCombined = combineReducers({
  main: rootReducer,
});

export default rootReducerCombined;
