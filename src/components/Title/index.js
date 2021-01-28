import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Title = ({ content, size }) => {

    const { container, title, small, medium } = styles

    const getTitleSize = () => {
        switch(size) {
            case "big" :
                return title;
            case "small" :
                return small
            case "medium" :
                return medium
        }
    }

    return(
        <View style={container}>
            <Text style={getTitleSize()}>{content}</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
    },
    title: {
        fontSize: 30,
        color: 'white',
        fontWeight: 'bold',
    },
    small: {
        color: 'rgba(0,0,0,0.6)',
        fontSize: 12,
        fontWeight: '700',
        lineHeight: 28
    },
    medium: {
        fontSize: 24,
        fontWeight: 'bold',
        lineHeight: 28
    }
});

export default Title;