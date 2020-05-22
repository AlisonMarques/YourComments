import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import api from '../../services/api';

import './styles.css';

export default function Login() {
  const [id, setId] = useState('');
  const history = useHistory();

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const response = await api.post('sessions', { id });

      localStorage.setItem('userID', id);
      localStorage.setItem('userName', response.data.name);

      history.push('/profile');
    } catch (err) {
      alert('Falha no login, tente novamente.');
    }
  }

  return (
    <div id="login-container">
      <section>
        <form onSubmit={handleLogin}>
          <h1>Log-In</h1>
          <label for="id">ID</label>
          <input
            type="text"
            name="id"
            id="id"
            placeholder="Type your id"
            value={id}
            onChange={(e) => setId(e.target.value)}
            autocomplete="off"
          />
          <input type="submit" value="Login" />

          <Link className="back-link" to="/register">
            Register
          </Link>
        </form>
      </section>
    </div>
  );
}
