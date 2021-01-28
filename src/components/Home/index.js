import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { prefix, auth } from '../../utils/constant';

// Import composant
import Block from '../Block';
import Title from '../Title';
import RoundBtn from '../RoundBtn';

const { width } = Dimensions.get('window');

const Home = ({ navigation }) => {

    const { container, icon, container_2, titleContainer,roundContainer } = styles;

    return(
        <View style={container}>
            <Block>
                <Ionicons name={`${prefix}-car`} style={icon}/>
                <Title content="TAXI APP" size="big" />
            </Block>
            <View style={container_2}>
                <View style={titleContainer}>
                    <Title content="Bienvenue" size="small" />
                    <Title content="Vous recherchez un" size="medium" />
                </View>
                <View style={roundContainer}>
                    <RoundBtn iconName={`${prefix}-car`}/>
                    <RoundBtn iconName={`${prefix}-person`} />
                </View>
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
    },
    roundContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: width - 80
    }
})

export default Home;