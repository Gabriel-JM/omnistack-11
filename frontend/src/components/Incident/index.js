import React from 'react'
import { FiTrash2 } from 'react-icons/fi'

const currency = { style: 'currency', currency: 'BRL' }

function Incident({ incident, deleteItem }) {

    function handleDelete() {
        deleteItem(incident.id)
    }

    return (
        <li>
            <strong>CASO:</strong>
            <p>{incident.title}</p>

            <strong>DESCRIÇÃO:</strong>
            <p>{incident.description}</p>

            <strong>VALOR:</strong>
            <p>{Intl.NumberFormat('pt-BR', currency).format(incident.value)}</p>

            <button onClick={handleDelete}>
                <FiTrash2 size={20} color="#a8a8b3" />
            </button>
        </li>
    )

}

export default Incident