import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiTrash2, FiPower } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

export default function Profile() {
  const [comments, setComments] = useState([]);

  const history = useHistory();
  const userId = localStorage.getItem('userID');
  const userName = localStorage.getItem('userName');

  useEffect(() => {
    api
      .get('profile', {
        headers: {
          Authorization: userId,
        },
      })
      .then((response) => {
        setComments(response.data);
      });
  }, [userId]);

  async function handleDeleteComment(id) {
    try {
      await api.delete(`comments/${id}`, {
        headers: {
          Authorization: userId,
        },
      });

      setComments(comments.filter((comment) => comment.id !== id));
    } catch (err) {
      alert('Erro ao deletar o comentário, tente novamente.');
    }
  }

  function handleLogout() {
    localStorage.clear();

    history.push('/');
  }

  return (
    <div className="profile-container">
      <header>
        <span>Bem vindo(a), {userName}</span>

        <Link className="button" to="/comments/new">
          Create new comment
        </Link>

        <button onClick={handleLogout} type="button">
          <FiPower size={18} color="#E02041" />
        </button>
      </header>

      <h1>Registered comments</h1>

      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>
            <strong>Instagram:</strong>
            <p>{comment.instagram}</p>

            <strong>Facebook:</strong>
            <p>{comment.facebook}</p>

            <strong>About:</strong>
            <p>{comment.about}</p>

            <button
              onClick={() => handleDeleteComment(comment.id)}
              type="button"
            >
              <FiTrash2 size={20} color="#a8a8b3" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
