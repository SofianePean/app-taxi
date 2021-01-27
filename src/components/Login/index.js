import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// Import composant
import Block from '../Block';

const Login = () => {

    const { container } = styles
    return(
        <View style={container}>
            <Block />
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default Login;