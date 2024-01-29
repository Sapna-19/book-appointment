// src/store.js
import { createStore } from 'redux';
import rootReducerCombined from './redux';

const store = createStore(rootReducerCombined);

export default store;
