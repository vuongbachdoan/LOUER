import * as React from 'react';
import { NativeBaseProvider } from "native-base";
import { MainNavigator } from './src/navigator/MainNavigator';

import { MainNavLessor } from "./src/navigator/MainNavLessor";

const App = () => {
  return (
      <NativeBaseProvider>
        {/* <MainNavigator /> */}
        <MainNavLessor />
      </NativeBaseProvider>
  );
};

export default App;

