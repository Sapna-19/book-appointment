// src/App.js
import React from 'react';
import Calendar from './Components/calendar';
import HeaderComponent from './Components/header';

const App = () => {
  return (
    <div className="App">
    <HeaderComponent/>
      <Calendar />
    </div>
  );
};

export default App;
