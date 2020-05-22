import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

export default function NewComment() {
  const [instagram, setInstagram] = useState('');
  const [facebook, setFacebook] = useState('');
  const [about, setAbout] = useState('');

  const history = useHistory();

  const userID = localStorage.getItem('userID');

  async function handleNewComment(e) {
    e.preventDefault();

    const data = {
      instagram,
      facebook,
      about,
    };

    try {
      await api.post('comments', data, {
        headers: {
          Authorization: userID,
        },
      });

      history.push('/profile');
    } catch (err) {
      alert('Erro ao cadastrar comentário, tente novamente');
    }
  }

  return (
    <div id="new-comment-container">
      <section>
        <form onSubmit={handleNewComment}>
          <h1>Register new comment</h1>

          <Link className="back-link" to="/profile">
            <FiArrowLeft size={16} color="#E02041" />
            Come back home
          </Link>
          <label for="insta">Instagram</label>
          <input
            type="text"
            name="insta"
            id="insta"
            placeholder="Enter your instagram"
            value={instagram}
            onChange={(e) => setInstagram(e.target.value)}
            autocomplete="off"
          />
          <label for="facebook">Facebook</label>
          <input
            type="text"
            name="facebook"
            id="facebook"
            placeholder="Enter your Facebook"
            value={facebook}
            onChange={(e) => setFacebook(e.target.value)}
            autocomplete="off"
          />

          <label for="about">About</label>
          <textarea
            type="text"
            name="about"
            id="about"
            placeholder="
Write something about this profile"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            autoComplete="off"
          />

          <button className="button" type="submit">
            Register
          </button>
        </form>
      </section>
    </div>
  );
}
