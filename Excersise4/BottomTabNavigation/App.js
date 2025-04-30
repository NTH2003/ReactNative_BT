import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MyBottomTabs from './BottomTabNavigator';
import { PaperProvider } from 'react-native-paper';

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <MyBottomTabs />
      </NavigationContainer>
    </PaperProvider>
  );
}
