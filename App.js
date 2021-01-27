import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import Constants from 'expo-constants';
import * as Font from 'expo-font';

// Import composant
import Navigation from './src/navigation'

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Navigation />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight
  },
});
