import * as React from 'react';
import { NativeBaseProvider } from "native-base";
import { MainNavigator } from './src/navigator/MainNavigator';
import { useEffect } from 'react';

import {ClerkProvider, } from '@clerk/clerk-expo';

const App = () => {
  // useEffect(() => {
  //   document.body.style.overflowY = "hidden";
  // }, []);

  return (
    <NativeBaseProvider>
      <MainNavigator />
    </NativeBaseProvider>
  );
};

export default App;

