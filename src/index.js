// src/index.js
import React from 'react';
import { createRoot } from 'react-dom/client';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import rootReducerCombined from './redux';

import App from './App';

const store = configureStore({
  reducer: rootReducerCombined,
});

const root = createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
