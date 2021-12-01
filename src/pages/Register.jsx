import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../utils/axios';
import validator from 'validator';

function Register() {
  const [errors, setErrors] = useState([]);
  let acumulativeErrors = [];
  const navigate = useNavigate();

  const validateEmail = (email) => {
    if (!validator.isEmail(email)) {
      acumulativeErrors.push('E-mail inválido');
    }
  }

  const validateName = (name) => {
    if (name.length < 3) {
      acumulativeErrors.push('Seu nome deve possuir no mínimo 3 caracteres');
    }
  }

  const validatePassword = (password, repassword) => {
    if (password.length < 6) {
      acumulativeErrors.push('Sua senha deve possuir no mínimo 6 caracteres');
    }
    if (repassword !== password ) {
      acumulativeErrors.push('Senhas não conferem');
    }
  }
  const validateData = (data) => {
    validateEmail(data.email.value);
    validateName(data.name.value);
    validatePassword(data.password.value, data.repassword.value);
  }
  
  const handleSubmit =  async (e) => {
    acumulativeErrors = [];
    e.preventDefault();
    validateData(e.target);

    if (acumulativeErrors.length) {
      return setErrors(acumulativeErrors);
    }

    axios.post('register', {
      name: e.target.name.value,
      email: e.target.email.value,
      password: e.target.password.value,
    })
    .then((response) => {
      localStorage.setItem('token', response.data.token);
      navigate('/employees')
    })
    .catch((err) => {
      const { message } = err.response.data;
      setErrors([message])
    });
  };


  return (
    <div className="main-container bg-radial flex-column">
      <h1 className="title">Employees<span>Book</span></h1>
      <form className="flex-column form" onSubmit={ handleSubmit }>
        <h2 className="form-title">Cadastrar</h2>
        <input
          type="email"
          className="input"
          placeholder="E-mail"
          name="email"
          required
        />
        <input
          type="text"
          className="input"
          placeholder="Nome"
          name="name"
          required
        />
        <input
          type="password"
          className="input"
          placeholder="Senha"
          name="password"
          required
        />
        <input
          type="password"
          className="input"
          placeholder="Repetir senha"
          name="repassword"
          required
        />
        <ul className="errors">
          { errors.map((error) => (
            <li key={ error }>{ error }</li>
          ))}
        </ul>
        <button type="submit" className="button">Entrar</button>
      </form>
      <Link to="/" className="medium-text">Voltar para Home</Link>
    </div>
  );
}

export default Register;
