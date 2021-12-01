import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../utils/axios';

function Home() {
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    axios.post('login', { email, password })
    .then((response) => {
      localStorage.setItem('token', response.data.token);
      navigate('/employees')
    })
    .catch((err) => setError(err.response.data.message))
  }
  return (
    <div className="main-container bg-radial flex-column">
      <h1 className="title">Employees<span>Book</span></h1>
      <form className="flex-column form" onSubmit={ handleSubmit }>
        <h2 className="form-title">Login</h2>
        <input type="email" className="input" placeholder="E-mail" name="email" required/>
        <input type="password" className="input" placeholder="Senha" name="password" required/>
        <span className="errors">{ error }</span>
        <button type="submit" className="button" onClick={ () => setError('') }>Entrar</button>
        <span className="form-text">Não possui uma conta? <Link to="/register" className="form-link">Cadastre-se.</Link></span>
      </form>
      <Link to="/forgot" className="medium-text">Esqueci minha senha.</Link>
    </div>
  );
}

export default Home;
