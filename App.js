import React, { useEffect, useRef, useState } from 'react';
import { BackHandler } from 'react-native';
import WebView from 'react-native-webview';
import Splash from './Splash';

const WebViewMoviezSpace = () => {
  const WEBVIEW_REF = useRef(null);
  const [canGoBack, setCanGoBack] = useState(false);
  const [showSplash, setShowSplash] = useState(true);

  // Use useEffect to transition to the WebView component after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

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

  const onNavigationStateChange = (navState) => {
    setCanGoBack(navState.canGoBack);
  };

  return (
    <React.Fragment>
      {showSplash ? (
        <Splash />
      ) : (
        <WebView
          source={{ uri: 'https://coxwellhospital.com' }}
          ref={WEBVIEW_REF}
          onNavigationStateChange={onNavigationStateChange}
        />
      )}
    </React.Fragment>
  );
};

export default WebViewMoviezSpace;
