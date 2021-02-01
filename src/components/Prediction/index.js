import React, {useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';


const Prediction = ({ main_text, secondary_text, onPress }) => {
    const { container, secondary,main } = styles

    return(
        <TouchableOpacity onPress={onPress}>
            <View style={container}>
                <Text numberOfLines={1} style={secondary}>{main_text}</Text>
                <Text style={main}>{secondary_text}</Text>
            </View>
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    container: {
        width: "100%",
        borderTopWidth: 1,
        borderTopColor: "#f6f6f6",
        padding: 5
    },
    secondary: {
        color: '#d6d6d6',
        fontSize: 12,
        fontWeight: "300",
    },
    main: {
        color: '#303030',
        fontSize: 16,
        fontWeight: "700",
    },

});

export default Prediction;