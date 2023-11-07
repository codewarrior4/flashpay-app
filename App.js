import React, { useEffect, useRef, useState } from 'react';
import { BackHandler, View, Text, Alert } from 'react-native';
import { WebView } from 'react-native-webview';
import NetInfo from '@react-native-community/netinfo';
import Splash from './Splash';

const App = () => {
  const WEBVIEW_REF = useRef(null);
  const [canGoBack, setCanGoBack] = useState(false);
  const [isConnected, setIsConnected] = useState(true);
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // Simulate a splash screen by showing it for a few seconds
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const onNavigationStateChange = (navState) => {
    setCanGoBack(navState.canGoBack);
  };

  useEffect(() => {
    const handleBackButton = () => {
      if (WEBVIEW_REF.current && canGoBack) {
        WEBVIEW_REF.current.goBack();
        return true;
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackButton);

    return () => {
      backHandler.remove();
    };
  }, [canGoBack]);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      if (!state.isConnected) {
        setIsConnected(false);
        Alert.alert(
          'No Internet Connection',
          'Please check your internet connection and try again.',
          [{ text: 'OK' }]
        );
      } else {
        setIsConnected(true);
      }

      if (!state.isConnected && WEBVIEW_REF.current) {
        // If there's no internet connection, navigate back in the WebView
        WEBVIEW_REF.current.goBack();
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {showSplash ? (
        // Render your splash screen component here
        <Splash />
      ) : isConnected ? (
        // If connected, show the WebView
        <WebView
          source={{ uri: 'https://flashpay.ng/login' }}
          ref={WEBVIEW_REF}
          onNavigationStateChange={onNavigationStateChange}
        />
      ) : (
        // If not connected, display a message
        <Text style={{ textAlign: 'center', justifyContent: 'center', alignItems: 'center' }}>
          No internet connection
        </Text>
      )}
    </View>
  );
};

export default App;
