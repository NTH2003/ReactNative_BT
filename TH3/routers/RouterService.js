import { createStackNavigator } from '@react-navigation/stack';
import Services from '../screens/Services';
import AddNewService from '../screens/AddNewService';
import ServiceDetail from '../screens/ServiceDetail';
import { useMyContextController } from '../store';
import { IconButton, Appbar, Menu } from 'react-native-paper';
import React, { useState } from 'react';

const Stack = createStackNavigator();

const RouterService = () => {
  const [controller] = useMyContextController();
  const { userLogin } = controller;
  const [menuVisible, setMenuVisible] = useState(false);

  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

  return (
    <Stack.Navigator
      initialRouteName="Services"
      screenOptions={{
        title: userLogin?.name,
        headerTitleAlign: 'center',
        headerStyle: { backgroundColor: 'pink' },
        headerRight: () => <IconButton icon="account" />,
      }}
    >
      <Stack.Screen name="Services" component={Services} />
      <Stack.Screen name="AddNewService" component={AddNewService} />
      <Stack.Screen
        name="ServiceDetail"
        component={ServiceDetail}
        options={({ navigation, route }) => ({
          headerTitle: "Service detail",
          headerRight: () => (
            <Menu
              visible={menuVisible}
              onDismiss={closeMenu}
              anchor={
                <Appbar.Action icon="dots-vertical" color="black" onPress={openMenu} />
              }
            >
              <Menu.Item
                onPress={() => {
                  closeMenu();
                  navigation.setParams({ showEditModal: true });
                }}
                title="Edit"
              />
              <Menu.Item
                onPress={() => {
                  closeMenu();
                  navigation.setParams({ confirmDelete: true });
                }}
                title="Delete"
              />
            </Menu>
          ),
        })}
      />
    </Stack.Navigator>
  );
};

export default RouterService;
