import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Employees from './pages/Employees';
import Home from './pages/Home';
import Register from './pages/Register';

function App() {
  return (
    <Routes>
      <Route exact path="/" element={ <Home /> } />
      <Route exact path="/register" element={ <Register /> } />
      <Route exact path="/employees" element={ <Employees /> } />
    </Routes>
  );
}

export default App;
