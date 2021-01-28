import React, { useState, useEffect } from 'react';
import * as Font from 'expo-font';
import { StyleSheet, SafeAreaView, ActivityIndicator, View } from 'react-native';
import Constants from 'expo-constants';
import { renderInitialScreen } from './src/utils/constant';

// Import composant
import Navigation from './src/navigation'

export default function App() {
  const [loading, setLoading] = useState(true);
  const [initialScreen, setinitialScreen] = useState("Login");

  const loadFont = async() => {
    try {
        await Font.loadAsync({
          'Gilroy-Bold': require('./assets/fonts/Gilroy-Bold.ttf'),
          "GTSectraFineRegular": require('./assets/fonts/GT-Sectra-Fine-Regular.ttf'),
          "MontserratBlack": require('./assets/fonts/Montserrat-Black.ttf'),
          "MontserratMedium": require('./assets/fonts/Montserrat-Medium.ttf'),
        });
        const screen = await renderInitialScreen();
        if (screen) setinitialScreen(screen)
        console.log('INITIAL SCREEN',initialScreen)
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
