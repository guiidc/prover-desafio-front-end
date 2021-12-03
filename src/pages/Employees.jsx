import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../utils/axios';

function Employees() {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  const handleAdd = () => {
    navigate('/add-employee');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  }

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) navigate('/');
  });

  useEffect(() => {
    axios.get('employees')
    .then((response) => setEmployees(response.data))
    .catch((error) => console.log(error));
  }, [])

  return (
    <>
    <nav className="flex-row">
      <h4>EmployeeBook</h4>
      <div className="links">
        <button onClick={ handleAdd }>+ Cadastrar</button>
        <button onClick={ handleLogout }>Logout</button>
      </div>
    </nav>
    <div>
    <h4 className="table-title">Cadastros</h4>
    <div className="table-container">
        <table>
          <tbody>
            <tr>
              <td>ID</td>
              <td>Nome</td>
              <td>Contato</td>
              <td>Nascimento</td>
              <td>Idade</td>
              <td>Sexo</td>
              <td>Ativo</td>
              <td>Cargo</td>
            </tr>
          </tbody>
          <tbody>
            { employees.map((employee) => (
              <tr  className="employee" key={ employee.id }>
                <td>{ employee.id }</td>
                <td>{ employee.name }</td>
                <td>{ employee.tel }</td>
                <td>{ employee.birthday.slice(0, 11) }</td>
                <td>{ employee.age }</td>
                <td>{ employee.sex }</td>
                <td>{ employee.status ? 'Sim' : 'Não' }</td>
                <td>{ employee.positions.position }</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </>
  )
}

export default Employees;
