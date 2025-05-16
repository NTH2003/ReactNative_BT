import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Services from './Services';
import ServiceDetail from './ServiceDetail';

const Stack = createStackNavigator();

const ServiceStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Services" component={Services} options={{ headerShown: false }} />
    <Stack.Screen name="ServiceDetail" component={ServiceDetail} options={{ headerShown: false }} />
  </Stack.Navigator>
);

export default ServiceStack;
