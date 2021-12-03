import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AddEmployee from './pages/AddEmployee';
import Employees from './pages/Employees';
import Home from './pages/Home';
import RecoverPassword from './pages/RecoverPassword';
import Register from './pages/Register';
import ResetPassword from './pages/ResetPassword';

function App() {
  return (
    <Routes>
      <Route exact path="/" element={ <Home /> } />
      <Route exact path="/register" element={ <Register /> } />
      <Route exact path="/employees" element={ <Employees /> } />
      <Route exact path="/add-employee" element={ <AddEmployee /> } />
      <Route exact path="/recover-password" element={ <RecoverPassword /> } />
      <Route exact path="/reset-pwd/:id/:email/:token" element={  <ResetPassword/> } />
    </Routes>
  );
}

export default App;
