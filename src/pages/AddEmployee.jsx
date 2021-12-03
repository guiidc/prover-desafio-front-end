import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../utils/axios'

function AddEmployee() {
  const [positions, setPositions] = useState([])
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  }

  const handleList = () => {
    navigate('/employees')
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, tel, birthday, sex, status, positionId } = e.target;
    axios.post('add-employee', {
      name: name.value,
      tel: tel.value,
      birthday: birthday.value,
      sex: sex.value,
      status: status.value,
      positionId: positionId.value
    },
    {
      headers: {
        authorization: localStorage.getItem('token'),
      }
    })
    .then(() => navigate('/employees'))
    .catch((err) => console.log(err.response))

  }

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) navigate('/');
  }, [navigate]);

  useEffect(() => {
    axios.get('/positions')
    .then((response) => setPositions(response.data))
    .catch((err) => console.log(err.response))
  }, [])

  return (
    <>
    <nav className="flex-row">
      <h4>EmployeeBook</h4>
      <div className="links">
        <button onClick={ handleList }>Lista</button>
        <button onClick={ handleLogout }>Logout</button>
      </div>
    </nav>
    <div className="flex-column">
      <img src="./icons/employee.svg" alt="employee icon"></img>
      <form className="employee-form flex-column" onSubmit={ handleSubmit }>
        <input type="text" placeholder="nome" name="name" required/>
        <input type="tel" placeholder="tel" name="tel" required/>
        <input type="date" placeholder="birthday" name="birthday" required/>
        <select name="sex" required>
          <option value="" defaultValue>Escolha o sexo</option>
          <option value="M">Masculino</option>
          <option value="F">Feminino</option>
        </select>
        <select name="status" required>
          <option value="" defaultValue>Funcionário ativo?</option>
          <option value="true">Sim</option>
          <option value="false">Não</option>
        </select>
       <select name="positionId" required>
         { positions.map(({ id, position}) => (
           <option key={ id } value={ id }>{position}</option>
         ))}
       </select>
        <button type="submit" className="button" required>Cadastrar</button>
      </form>
    </div>
    </>
  )
}

export default AddEmployee;