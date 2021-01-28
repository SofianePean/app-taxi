import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
const Block = ({children}) => {

    const { container } = styles

    return(
        <View style={container}>
            {children}
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        width: (width * 4) / 3,
        backgroundColor: '#2dbb54',
        borderBottomLeftRadius: width,
        borderBottomRightRadius: width,
        flexGrow: 3,
        justifyContent: 'center',
        alignItems: 'center',
        // height:500
    },
});

export default Block;