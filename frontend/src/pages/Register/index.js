import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import api from '../../services/api';

import './styles.css';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [rg, setRg] = useState('');
  const [age, setAge] = useState('');

  const history = useHistory();

  async function handleRegister(e) {
    e.preventDefault();

    const data = {
      name,
      email,
      age,
      cpf,
      rg,
    };

    try {
      const response = await api.post('profiles', data);

      alert(`Seu ID de acesso: ${response.data.id}`);

      history.push('/');
    } catch (err) {
      alert('Erro no cadastro, tente novamente.');
    }
  }

  return (
    <div id="register-container">
      <section>
        <form onSubmit={handleRegister}>
          <h1>Register</h1>

          <label for="name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Type your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label for="email">E-mail</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Type your e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label for="age">Age</label>
          <input
            type="text"
            name="age"
            id="age"
            placeholder="Enter your age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            onkeypress="return event.charCode >= 48 && event.charCode <= 57"
            maxlength="2"
          />

          <label for="cpf">CPF</label>
          <input
            type="text"
            name="cpf"
            id="cpf"
            placeholder="Enter your CPF"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
            onkeypress="return event.charCode >= 48 && event.charCode <= 57"
            maxlength="11"
          />

          <label for="rg">RG</label>
          <input
            type="text"
            name="rg"
            id="rg"
            placeholder="Type your rg"
            value={rg}
            onChange={(e) => setRg(e.target.value)}
            onkeypress="return event.charCode >= 48 && event.charCode <= 57"
            maxlength="7"
          />
          <button className="button" type="submit">
            Register
          </button>

          <Link className="back-link" to="/">
            Back
          </Link>
        </form>
      </section>
    </div>
  );
}
