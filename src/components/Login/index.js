import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { prefix, auth } from '../../utils/constant';

// Import composant
import Block from '../Block';
import Title from '../Title';
import LoginBtn from '../LoginBtn';

const { width } = Dimensions.get('window');

const Login = ({ navigation }) => {

    const { container, icon, container_2, titleContainer } = styles;

    const handleLogin = () => {
        auth();
        navigation.push('Home')
    }

    return(
        <View style={container}>
            <Block>
                <Ionicons name={`${prefix}-car`} style={icon}/>
                <Title content="TAXI APP" size="big" />
            </Block>
            <View style={container_2}>
                <View style={titleContainer}>
                    <Title content="Authentification" size="small" />
                    <Title content="Google Connexion" size="medium" />
                </View>
                <LoginBtn onPress={handleLogin}/>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        flexDirection: "column",
    },
    icon: {
        fontSize: 80,
        color: 'white',
    },
    container_2: {
        flexGrow: 1,
        width,
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    titleContainer: {
        width: width - 80,
        height: 50,
        justifyContent: 'center'
    }
})

export default Login;