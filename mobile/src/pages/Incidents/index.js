import React from 'react'
import { View, FlatList, Image, Text, TouchableOpacity } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

import logoImg from '../../assets/logo.png'

import styles from './styles'

const { container, header, headerText, headerTextBold } = styles
const { title, description, incidentList, incident } = styles
const { incidentProperty, incidentValue } = styles
const { detailsButton, detailsButtonText } = styles

export default function Incidents() {
    const navigation = useNavigation()

    function navigateToDetail() {
        navigation.navigate('Detail')
    }

    return (
        <View style={container}>
            <View style={header}>
                <Image source={logoImg} />
                <Text style={headerText}>
                    Total de <Text style={headerTextBold}>0 casos</Text>.
                </Text>
            </View>

            <Text style={title}>Bem-vindo!</Text>
            <Text style={description}>
                Escolha um dos casos abaixo e salve o dia.
            </Text>

            <FlatList
                style={incidentList}
                data={[1, 2, 3, 4, 5]}
                keyExtractor={id => String(id)}
                showsVerticalScrollIndicator={false}
                renderItem={() => (
                    <View style={incident}>
                        <Text style={incidentProperty}>ONG:</Text>
                        <Text style={incidentValue}>APAD</Text>

                        <Text style={incidentProperty}>CASO:</Text>
                        <Text style={incidentValue}>Caso teste</Text>

                        <Text style={incidentProperty}>VALOR:</Text>
                        <Text style={incidentValue}>R$ 120,00</Text>

                        <TouchableOpacity
                            style={detailsButton} 
                            onPress={navigateToDetail}
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