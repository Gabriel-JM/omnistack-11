import React, { useEffect, useState } from 'react'
import { View, FlatList, Image, Text, TouchableOpacity } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

import logoImg from '../../assets/logo.png'

import styles from './styles'
import api from '../../services/api'

const { container, header, headerText, headerTextBold } = styles
const { title, description, incidentList } = styles
const { incidentProperty, incidentValue } = styles
const { detailsButton, detailsButtonText } = styles

export default function Incidents() {
    const navigation = useNavigation()
    const [incidents, setIncidents] = useState([])
    const [total, setTotal] = useState(0)
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false)

    function navigateToDetail(incident) {
        navigation.navigate('Detail', { incident })
    }

    async function loadIncidents() {
        if(loading) return
        if(total > 0 && incidents.length === total) return

        setLoading(true)

        const response = await api.get('incidents', {
            params: { page }
        })

        setIncidents([...incidents, ...response.data ])
        setTotal(response.headers['x-total-count'])
        setPage(page + 1)
        setLoading(false)
    }

    useEffect(() => {
        loadIncidents()
    }, [])

    return (
        <View style={container}>
            <View style={header}>
                <Image source={logoImg} />
                <Text style={headerText}>
                    Total de <Text style={headerTextBold}>{total} casos</Text>.
                </Text>
            </View>

            <Text style={title}>Bem-vindo!</Text>
            <Text style={description}>
                Escolha um dos casos abaixo e salve o dia.
            </Text>

            <FlatList
                style={incidentList}
                data={incidents}
                keyExtractor={incident => String(incident.id)}
                showsVerticalScrollIndicator={false}
                onEndReached={loadIncidents}
                onEndReachedThreshold={0.2}
                renderItem={({ item: incident }) => (
                    <View style={styles.incident}>
                        <Text style={incidentProperty}>ONG:</Text>
                        <Text style={incidentValue}>{incident.name}</Text>

                        <Text style={incidentProperty}>CASO:</Text>
                        <Text style={incidentValue}>{incident.title}</Text>

                        <Text style={incidentProperty}>VALOR:</Text>
                        <Text style={incidentValue}>
                            {Intl.NumberFormat('pt-BR',{
                                style: 'currency',
                                currency: 'BRL'
                            }).format(incident.value)}
                        </Text>

                        <TouchableOpacity
                            style={detailsButton} 
                            onPress={() => navigateToDetail(incident)}
                        >
                            <Text style={detailsButtonText}>Ver mais detalhes</Text>
                            <Feather name="arrow-right" size={16} color="#e02041" />
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    )
}