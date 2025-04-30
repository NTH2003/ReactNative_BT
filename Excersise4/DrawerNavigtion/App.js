import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MyDrawer from './MyDrawer';
import { PaperProvider } from 'react-native-paper';

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <MyDrawer />
      </NavigationContainer>
    </PaperProvider>
  );
}
