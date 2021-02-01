import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { prefix, BASE_URL, API_KEY } from "../../utils/constant";
import axios from "axios";
import { ScreenStackHeaderRightView } from "react-native-screens";

// Import composant
import Prediction from "../Prediction";

const { width } = Dimensions.get("window");

const initialState = {
  place: "",
  predictions: [],
  loading: false,
};

const PlaceInput = ({ latitude, longitude, onPredictionPress }) => {
  const [state, setState] = useState(initialState);
  const { container, icon, input, inputContainer } = styles;
  const { place, loading, predictions } = state;

  const renderPredictions = () => {
    return predictions.map((prediction) => {
      const { structured_formatting, id, place_id } = prediction;
      return (
        <Prediction
          main_text={structured_formatting.main_text}
          secondary_text={structured_formatting.secondary_text}
          key={id}
          onPress={() => {
            onPredictionPress(place_id);
            setState((prevState) => ({
              ...prevState,
              predictions: [],
              place: structured_formatting.main_text,
            }));
          }}
        />
      );
    });
  };

  const search = async (url) => {
    try {
      console.log("url search", url);
      const {
        data: { predictions },
      } = await axios.get(url);
      setState((prevState) => ({
        ...prevState,
        predictions,
        loading: false,
      }));
    } catch (e) {
      console.log("error search", e);
    }
  };

  const handleChangeText = (value) => {
    setState((prevState) => ({
      ...prevState,
      place: value,
      loading: true,
    }));

    const url = `${BASE_URL}/place/autocomplete/json?input=${place}&location=${latitude},${longitude}&radius=500&key=${API_KEY}`;
    search(url);
  };
  return (
    <View style={container}>
      <View style={inputContainer}>
        <TextInput
          style={input}
          value={place}
          onChangeText={handleChangeText}
        />
        {!loading && <Ionicons style={icon} name={`${prefix}-search`} />}
        {loading && <ActivityIndicator size="small" color="#d6d6d6" />}
      </View>
      {!loading && predictions.length > 0 ? renderPredictions() : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 20,
    width: width - 50,
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  icon: {
    fontSize: 25,
    color: "#d6d6d6",
  },
  input: {
    fontSize: 16,
    color: "#303030",
    maxWidth: "70%",
    minWidth: "30%",
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
});

export default PlaceInput;
