import React, { useEffect, useState } from 'react';
import { FiPower, FiTrash2 } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';

import api from '../../services/api';

import './styles.css';
import logoImg from '../../assets/logo.svg';

export default function Profile() {
    const [incidents, setIncidents] = useState([]);

    const history = useHistory();
    const userId = localStorage.getItem('userId');
    const userName = localStorage.getItem('userName');

    useEffect(() => {
        api.get('profile', {
            headers: {
                Authorization: userId,
            }
        }).then(response => {
            setIncidents(response.data);
        })
    }, [userId]);

    async function handleDeleteIncident(id){
        try {
          await api.delete(`incidents/${id}`, {
            headers: {
                Authorization: userId,
            }
          });  

          setIncidents(incidents.filter(incident => incident.id !== id));
        } catch (err) {
            alert('Erro ao deletar ajuda, tente novamente!')
        }
    }

    function handleLogout(){
        localStorage.clear();
        history.push('/');
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be The Hero" />
                <span>Olá {userName}, seja bem vindo!</span>

                <Link className="button" to="/incidents/new">Cadastrar nova ajuda</Link>
                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#e02041" />
                </button>
            </header>
            <h1>Ajudas Cadastradas</h1>
            <ul>
                {incidents.map(incident => (
                    <li key={incident.id}>
                        <strong>CASO:</strong>
                        <p>{incident.title}</p>

                        <strong>DESCRIÇÂO:</strong>
                        <p>{incident.description}</p>

                        <strong>VALOR:</strong>
                        <p>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(incident.value)}</p>

                        <button onClick={ () => handleDeleteIncident(incident.id)} type="button">
                            <FiTrash2 size={20} color="#a8a8b3" />
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}