import React, { useState, useEffect } from 'react';
import * as Font from 'expo-font';
import * as Permissions from 'expo-permissions'
import { StyleSheet, SafeAreaView, ActivityIndicator, View } from 'react-native';
import Constants from 'expo-constants';
import { renderInitialScreen } from './src/utils/constant';

// Import composant
import Navigation from './src/navigation'

export default function App() {
  const [loading, setLoading] = useState(true);
  const [initialScreen, setinitialScreen] = useState("Login");

  const loadFont = async() => {
    const result = await new Promise.all([
      await Font.loadAsync({
        'Gilroy-Bold': require('./assets/fonts/Gilroy-Bold.ttf'),
        "GTSectraFineRegular": require('./assets/fonts/GT-Sectra-Fine-Regular.ttf'),
        "MontserratBlack": require('./assets/fonts/Montserrat-Black.ttf'),
        "MontserratMedium": require('./assets/fonts/Montserrat-Medium.ttf'),
      }),
      renderInitialScreen(),
      Permissions.askAsync(Permissions.LOCATION)
    ]);
    const route = result[1];
    const status = result[2].status;
    if (route && status === "granted") {
      setinitialScreen(route)
      setLoading(false)
    }
    try {
        setLoading(false);
    } catch (e) {
        console.log(e)
        setLoading(false);
    }
  }
  
  useEffect(() => {
    loadFont();
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      { loading ? 
        <View style={styles.container}>
          <ActivityIndicator />
        </View>
        :
        <Navigation initialRouteName={initialScreen}/>
      }
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight
  },
});
