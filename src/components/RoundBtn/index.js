import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { prefix } from '../../utils/constant';




const RoundBtn = ({iconName, onPress}) => {

    const { container, iconStyle } = styles
    return(
        <TouchableOpacity onPress={onPress}>
            <View style={container}>
                <Ionicons style={iconStyle} name={iconName}/>
            </View>
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2dbb54',
        height: 80,
        width: 80,
        borderRadius: 40
    },
    iconStyle: {
        fontSize: 45,
        color: 'white'
    }
});

export default RoundBtn;