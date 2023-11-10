import React, { useEffect, useRef, useState } from 'react';
import { BackHandler, View, Text, Alert, StatusBar } from 'react-native';
import { WebView } from 'react-native-webview';
import NetInfo from '@react-native-community/netinfo';
import Splash from './Splash';
import Onboarding from './screens/Onboarding';
import AsyncStorage from '@react-native-async-storage/async-storage';

const App = () => {
  const WEBVIEW_REF = useRef(null);
  const [canGoBack, setCanGoBack] = useState(false);
  const [isConnected, setIsConnected] = useState(true);
  const [showSplash, setShowSplash] = useState(true);
  const [isNewUser, setIsNewUser] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 5000);

    
    AsyncStorage.getItem('isNewUser').then(value => {
      if (!value || value === 'true') {
      // if (!value) {
        setIsNewUser(true);
        AsyncStorage.setItem('isNewUser', 'false');
      } else {
        setShowSplash(false);
      }
      return () => {
        clearTimeout(timer);
      }
      
    });
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
      setIsConnected(state.isConnected);

      if (!state.isConnected && WEBVIEW_REF.current) {
        WEBVIEW_REF.current.goBack();
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleOnboardingFinish = () => {
    setIsNewUser(false);
    setShowSplash(false);
  };

  const handleOnboardingSkip = () => {
    setIsNewUser(false);
    setShowSplash(false);
  };

  const handleOnboardingDone = () => {
    setIsNewUser(false);
    setShowSplash(false);
  };

  return (
    <>
    <StatusBar backgroundColor="white" barStyle="dark-content" />
    <View style={{ flex: 1 }}>
      {showSplash ? (
        <Splash />
      ) : isNewUser ? (
        <Onboarding
          onFinish={handleOnboardingFinish}
          onSkip={handleOnboardingSkip}
          onDone={handleOnboardingDone}
        />
      ) : isConnected ? (
        <WebView
          source={{ uri: 'https://flashpay.ng/login' }}
          ref={WEBVIEW_REF}
          onNavigationStateChange={onNavigationStateChange}
        />
      ) : (
        <Text style={{ textAlign: 'center' }}>No internet connection</Text>
      )}
    </View>
    </>
  );
};

export default App;
