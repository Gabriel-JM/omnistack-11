import React, { useState, useEffect } from 'react'
import './styles.css'

import logoImg from '../../assets/logo.svg'
import { FiPower } from 'react-icons/fi'
import { Link, useHistory } from 'react-router-dom'

import api from '../../services/api'
import Incident from '../Incident'

function Profile() {
    const [incidents, setIncidents] = useState([])
    const { ongName, ongId } = localStorage
    const history = useHistory()

    useEffect(() => {
        api.get('profile', {
            headers: {
                Authorization: ongId
            }
        }).then(response => {
            setIncidents(response.data)
        })
    }, [ongId])

    async function handleDeleteIncident(id) {
        try {
            await api.delete(`/incidents/${id}`, {
                headers: {
                    Authorization: ongId
                }
            })

            setIncidents(incidents.filter(incident => incident.id !== id))
        } catch {
            alert('Não foi possível excluir o caso, tente novamente')
        }
    }

    function handleLogout() {
        localStorage.clear()

        history.push('/')
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be the Hero"/>
                <span>Bem vinda, {ongName}</span>
                
                <Link className="button" to="/incidents/new">
                    Cadastrar novo caso    
                </Link>

                <button onClick={handleLogout}>
                    <FiPower size={18} color="#e02041" />
                </button>
            </header>

            <h1>Casos cadastrados</h1>

            <ul>
                {incidents.map(incident => (
                    <Incident
                        key={incident.id}
                        incident={incident}
                        deleteItem={handleDeleteIncident}
                    />
                ))}
            </ul>
        </div>
    )
}

export default Profile