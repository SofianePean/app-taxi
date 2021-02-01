import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  Alert,
  Platform,
  Linking,
} from "react-native";
import MapView, { Polyline, Marker } from "react-native-maps";
import * as Location from "expo-location";
import {
  BASE_URL,
  API_KEY,
  getRoute,
  decodePoint,
  SERVER_URL,
} from "../../utils/constant";
import SockerIO from "socket.io-client";

let io;

const { width, height } = Dimensions.get("window");

const Driver = () => {
  const initialState = {
    latitude: null,
    longitude: null,
    coordinates: [],
    destinationCoords: null,
  };
  const { container, map, MySpinner } = styles;

  const [state, setState] = useState(initialState);
  const openMaps = (latitude, longitude) => {
    const androidUrl = `geo:0,0?q=${latitude},${longitude}(destination)`;
    const iosUrl = `http://maps.apple.com?addr=${latitude},${longitude}`;
    const url = Platform.OS === "ios" ? iosUrl : androidUrl;
    Linking.openURL(url);
  };
  const searchPassenger = ({ lat, lng }) => {
    io = SockerIO.connect(SERVER_URL);
    io.on("connect", () => {
      console.log("connexio taxi OK ! ");
      io.emit("requestPassenger", { lat, lng });
      io.on("requestTaxi", (passInfo) => {
        setState((prevState) => ({
          ...prevState,
          destinationCoords: {
            latitude: passInfo.latitude,
            longitude: passInfo.longitude,
          },
        }));
        Alert.alert(
          "Passager trouvé",
          "Acceptez-vous la course ?",
          [
            {
              text: "Refuser",
              onPress: () => {},
            },
            {
              text: "Accepter",
              onPress: () => {
                io.emit("requestPassenger", { lat, lng });
                openMaps(passInfo.latitude, passInfo.longitude);
              },
            },
          ],
          {
            cancelable: false,
          }
        );
      });
    });
  };

  useEffect(() => {
    getUserLocation();
  }, []);

  useEffect(() => {
    return () => io.emit("quit", "taxi");
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
      searchPassenger({ latitude, longitude });
    } catch (e) {
      console.log("ERROR LOCATION", e);
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
      {!destinationCoords && (
        <View style={MySpinner}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      )}
    </View>
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
  MySpinner: {
      position: 'absolute',
      backgroundColor: "#2dbb54",
      justifyContent: 'center',
      alignItems: 'center',
      width:60,
      height:60,
      borderRadius: 30,
      bottom: 10
  }
});

export default Driver;
