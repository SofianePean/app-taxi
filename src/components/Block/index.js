import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
const Block = ({}) => {

    const { container } = styles

    return(
        <View style={container}>

        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        width: width * 4 / 3,
        backgroundColor: '#2dbb54',
        borderBottomLeftRadius: width,
        borderBottomRightRadius: width,
        flexGrow: 3
    },
});

export default Block;