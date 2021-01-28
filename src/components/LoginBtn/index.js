import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Dimensions } from 'react-native';

import Logo from '../../../assets/images/google.png';
import Title from '../Title';

const { width } = Dimensions.get('window');

const LoginBtn = ({ onPress }) => {

    const { logo, container } = styles
    return(
        <TouchableOpacity onPress={onPress}>
            <View style={container}>
                <Title size="small" content="Google Connexion"/>
                <Image source={Logo} style={logo}/>

            </View>
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: width - 80,
        alignItems: 'center',
        height: 55,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2},
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        backgroundColor: '#fff',
        borderRadius: 10
    },
    logo: {
        width: 40,
        height: 40
    }
})

export default LoginBtn;