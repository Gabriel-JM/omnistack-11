import React from 'react'
import { View, Text, Image, TouchableOpacity, Linking } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Feather } from '@expo/vector-icons'
import { composeAsync as MailComposer } from 'expo-mail-composer'

import styles from './styles'
import logoImg from '../../assets/logo.png'

const { container, header, incidentProperty } = styles
const { incidentValue, contactBox, heroTitle, heroDescription } = styles
const { actions, action, actionText } = styles

export default function Detail() {
    const route = useRoute()
    const navigation = useNavigation()

    const { incident } = route.params
    const message = `Óla ${incident.name}, estou entrando em contato pois gostaria de ajudar 
    no caso "${incident.title}" com o valor de ${Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(incident.value)}`

    function sendMail() {
        MailComposer({
            subject: `Heroi do caso: ${incident.title}`,
            recipients: [incident.email],
            body: message
        })
    }

    function sendWhatsappMessage() {
        Linking.openURL(`whatsapp://send?phone=${incident.whatsapp}&text=${message}`)
    }

    return (
        <View style={container}>
            <View style={header}>
                <Image source={logoImg} />
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Feather name="arrow-left" size={28} color="#e02041" />
                </TouchableOpacity>
            </View>

            <View style={styles.incident}>
                <Text style={[incidentProperty, { marginTop: 0 }]}>ONG:</Text>
                <Text style={incidentValue}>
                    {incident.name} de {incident.city} - {incident.uf}
                </Text>

                <Text style={incidentProperty}>CASO:</Text>
                <Text style={incidentValue}>{incident.title}</Text>

                <Text style={incidentProperty}>VALOR:</Text>
                <Text style={incidentValue}>
                    {Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                    }).format(incident.value)}
                </Text>
            </View>

            <View style={contactBox}>
                <Text style={heroTitle}>Salve o dia!</Text>
                <Text style={heroTitle}>Seja o herói desse caso.</Text>

                <Text style={heroDescription}>Entre em contato:</Text>

                <View style={actions}>
                    <TouchableOpacity style={action} onPress={sendWhatsappMessage}>
                        <Text style={actionText}>Whatsapp</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={action} onPress={sendMail}>
                        <Text style={actionText}>E-mail</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}