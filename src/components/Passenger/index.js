import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Dimensions, ActivityIndicator } from 'react-native';
import MapView from 'react-native-maps';
import * as Location from 'expo-location';

const { width, height } = Dimensions.get('window');


const Passenger = () => {
    const initialState = { latitude: null, longitude: null}
    const { container, map } = styles

    const [state, setState] = useState(initialState);

    useEffect(() => {
        getUserLocation()
    }, []);

    const { latitude, longitude } = state

    const getUserLocation = async () => {
        try {
            const {coords : { latitude, longitude }} = await Location.getCurrentPositionAsync();
            setState(prevState => ({
                ...prevState,
                latitude,
                longitude,
            }))
        } catch (e) {
            console.log('ERROR LOCATION', e)
        }
    };

    if (!latitude || !longitude) {
        return(
            <View style={container}>
                <ActivityIndicator size='large' color="#2dbb54" />
            </View>
        )
    }
    return(
        <View style={container}>
            <MapView
            style={map}
            showsUserLocation
            followsUserLocation
            initialRegion={{
                latitude: latitude,
                longitude: longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
            />
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        flexDirection: "column",
        justifyContent: 'center'
    },
    map: {
        width,
        height,
      },
});

export default Passenger;