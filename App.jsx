import * as React from 'react';
import { NativeBaseProvider } from "native-base";
import { MainNavigator } from './src/navigator/MainNavigator';

const App = () => {
  return (
      <NativeBaseProvider>
        <MainNavigator />
      </NativeBaseProvider>
  );
};

export default App;

