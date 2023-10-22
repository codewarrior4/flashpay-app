import React from 'react';
import { View, Text,Image, StyleSheet } from 'react-native';

export default function Splash() {
  return (
    <View style={styles.centeredContainer}>
        {/* <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} /> */}
        <Image
        style={styles.logo}
          source={require('./src/assets/images/logo.png')} 
        />
      </View> 
  );
}

const styles = StyleSheet.create({
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#40196d',
  },

  logo:{
    width: 200,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  }
})