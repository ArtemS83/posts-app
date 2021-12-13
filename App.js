import React, { useState, useEffect } from 'react';
import {} from 'react-native';

// import { AppLoading } from 'expo';
import AppLoading from 'expo-app-loading';
import { NavigationContainer } from '@react-navigation/native';

import { loadApplicationFonts } from './src/hooks/loadApplicationFonts';

import useRoute from './src/router';

export default function App() {
  const [isReady, setIsReady] = useState(false);

  const routing = useRoute(true);

  if (!isReady) {
    return (
      <AppLoading
        startAsync={loadApplicationFonts}
        onFinish={() => setIsReady(true)}
        onError={console.warn}
      />
    );
  }

  return <NavigationContainer>{routing}</NavigationContainer>;
}
