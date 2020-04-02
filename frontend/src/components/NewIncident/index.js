import React, { useState } from 'react'
import './styles.css'

import logoImg from '../../assets/logo.svg'
import { Link, useHistory } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'

import api from '../../services/api'

function NewIncident() {
    const { ongId } = localStorage
    const history = useHistory()

    const [title, setTitle] = useState()
    const [description, setDescription] = useState()
    const [value, setValue] = useState()

    async function handleSubmit(event) {
        event.preventDefault()

        const data = { title, description, value }

        try {
            await api.post('/incidents', data,  {
                headers: {
                    Authorization: ongId
                }
            })

            history.push('/profile')
        } catch {
            alert('Não foi possível realizar o cadastro, tente novamente')
        }
    }

    return (
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero"/>

                    <h1>Cadastrar novo caso</h1>
                    <p>Descreva o caso detalhadamente para encontrar um héroi para resolver isso.</p>

                    <Link to="/profile" className="link">
                        <FiArrowLeft size={16} color="#e02041" />
                        Voltar para home
                    </Link>
                </section>
                <form onSubmit={handleSubmit}>
                    <input
                        placeholder="Título do caso"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />

                    <textarea
                        placeholder="Decrição"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    ></textarea>

                    <input
                        placeholder="Valor em reais"
                        value={value}
                        onChange={e => setValue(e.target.value)}
                    />

                    <button className="button">Cadastrar</button>
                </form>
            </div>
        </div>
    )
}

export default NewIncident