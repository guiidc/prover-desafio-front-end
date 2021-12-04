import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from '../utils/axios';

function Home() {
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) navigate('/employees')
  }, [navigate]);

  const { id, email, token } = params;

  const handleSubmit = (e) => {
    e.preventDefault();
    const password = e.target.password.value;
    const repassword = e.target.repassword.value;
    if (password.length < 6) {
      setError('sua senha deve possuir no mínimo 6 caracteres');
      return;
    }
    if (password !== repassword) {
      setError('Senhas não conferem');
      return;
    }
    axios.post('reset-password', { id, email, token, password })
    .then((response) => {
      localStorage.setItem('token', response.data.token);
      navigate('/employees');
    })
    .catch((err) => setError(err.response.data.message))
  }
  return (
    <div className="main-container bg-radial flex-column">
      <h1 className="title">Employees<span>Book</span></h1>
      <form className="flex-column form" onSubmit={ handleSubmit }>
        <h2 className="form-title">Insira a nova senha</h2>
        <input type="password" className="input" placeholder="Senha" name="password" required/>
        <input type="password" className="input" placeholder="Repita sua senha" name="repassword" required/>
        <span className="errors">{ error }</span>
        <button type="submit" className="button" onClick={ () => setError('') }>Entrar</button>
        <span className="form-text">Não possui uma conta? <Link to="/register" className="form-link">Cadastre-se.</Link></span>
      </form>
      <Link to="/" className="medium-text">Voltar para Home.</Link>
    </div>
  );
}

export default Home;
