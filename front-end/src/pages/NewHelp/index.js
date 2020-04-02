import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api';

import { FiArrowLeft } from 'react-icons/fi'
import './styles.css';
import logoImg from '../../assets/logo.svg';

export default function NewIncident() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');
  const history = useHistory();

  const userId = localStorage.getItem('userId');

  async function handleNewIncident(e) {
    e.preventDefault();

    const data = {
      title,
      description,
      value
    }

    try {
      await api.post('incidents', data, {
        headers: {
          Authorization: userId,
        }
      });
      history.push('/profile');

    } catch(err) {
      alert('Erro ao cadastrar caso. Tente novamente');
    }
  }


  return (
    <div className="new-help-container">
    <div className="content">
      <section>
        <img src={ logoImg } alt="Be The Hero Logo" />

        <h1>Cadastrar nova ajuda</h1>
        <p>Descreva o que precisa detalhadamente para encntrar um herói que possa ajuda-lo(a)!</p>

        <Link className="back-link" to="/profile">
          <FiArrowLeft size={16} color="#e02041" />
          Voltar para home
        </Link>
      </section>

      <form onSubmit={ handleNewIncident }> 
        <input
          value={title}
          onChange={ e=> setTitle(e.target.value) } 
          placeholder="Título da ajuda"
        />
        <textarea
          value={description}
          onChange={ e=> setDescription(e.target.value) } 
          placeholder="Descrição"
        />

        <input
          value={value}
          onChange={ e=> setValue(e.target.value) } 
          placeholder="Valor em Reais"
        />


        <button className="button" type="submit">Cadastrar</button>          
      </form>
    </div>
  </div>
  )
}

