import React, { useState, useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import MapView, { Polyline, Marker } from "react-native-maps";
import * as Location from "expo-location";
import { BASE_URL, API_KEY, getRoute, decodePoint } from "../../utils/constant";

// Import composant
import PlaceInput from "../PlaceInput";

const { width, height } = Dimensions.get("window");

const Passenger = () => {
    const mapView = useRef();

  const initialState = {
    latitude: null,
    longitude: null,
    coordinates: [],
    destinationCoords: null,
  };
  const { container, map } = styles;

  const [state, setState] = useState(initialState);

  useEffect(() => {
    getUserLocation();
  }, []);

  const { latitude, longitude, coordinates, destinationCoords } = state;

  const getUserLocation = async () => {
    try {
      const {
        coords: { latitude, longitude },
      } = await Location.getCurrentPositionAsync();
      setState((prevState) => ({
        ...prevState,
        latitude,
        longitude,
      }));
    } catch (e) {
      console.log("ERROR LOCATION", e);
    }
  };

  const handlePredictionPress = async (place_id) => {
    try {
      const url = `${BASE_URL}/directions/json?key=${API_KEY}&destination=place_id:${place_id}&origin=${latitude},${longitude}`;
      const points = await getRoute(url);
      const coordinates = decodePoint(points);
      setState((prevState) => ({
        ...prevState,
        coordinates,
        destinationCoords: coordinates[coordinates.length - 1],
      }));
      mapView.current.fitToCoordinates(coordinates, {
          animated: true,
          edgePadding: {
              top: 100,
              bottom: 40,
              left: 40,
              right: 40
          }
      });
    } catch (e) {
      console.log("prediction place_id", e);
    }
  };

  if (!latitude || !longitude) {
    return (
      <View style={container}>
        <ActivityIndicator size="large" color="#2dbb54" />
      </View>
    );
  }
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={container}>
        <MapView
        ref={mapView}
          style={map}
          showsUserLocation
          followsUserLocation
          initialRegion={{
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          {coordinates.length > 0 && (
            <Polyline
              coordinates={coordinates}
              strokeWidth={6}
              strokeColor="#2dbb54"
            />
          )}
          {destinationCoords && <Marker coordinate={destinationCoords} />}
        </MapView>
        <PlaceInput
          latitude={latitude}
          longitude={longitude}
          onPredictionPress={handlePredictionPress}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
  },
  map: {
    width,
    height,
  },
});

export default Passenger;
