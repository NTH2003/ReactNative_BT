import React from "react";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Icon } from 'react-native-paper';
import ServiceStack from './ServiceStack';
import MyAppointments from './MyAppointments';
import Profile from './Profile';

const Drawer = createDrawerNavigator();

const CustomerDrawer = () => (
  <Drawer.Navigator 
    initialRouteName="Services"
    screenOptions={{
      headerStyle: {
        backgroundColor: '#FF8C00',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      drawerActiveTintColor: '#FF8C00',
      drawerInactiveTintColor: '#333',
    }}
  >
    <Drawer.Screen 
      name="Services" 
      component={ServiceStack} 
      options={{ 
        title: "Dịch vụ",
        drawerIcon: ({color}) => (
          <Icon source="home" size={24} color={color} />
        )
      }} 
    />
    <Drawer.Screen 
      name="MyAppointments" 
      component={MyAppointments} 
      options={{ 
        title: "Lịch hẹn của tôi",
        drawerIcon: ({color}) => (
          <Icon source="calendar-clock" size={24} color={color} />
        )
      }} 
    />
    <Drawer.Screen 
      name="Profile" 
      component={Profile} 
      options={{ 
        title: "Tài khoản",
        drawerIcon: ({color}) => (
          <Icon source="account" size={24} color={color} />
        )
      }} 
    />
  </Drawer.Navigator>
);

export default CustomerDrawer;
