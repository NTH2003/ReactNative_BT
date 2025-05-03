import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import Contacts from './screens/Contacts';
import Profile from './screens/Profile';
import Favorites from './screens/Favorites';
import User from './screens/User';
import Options from './screens/Options';
import colors from './utility/colors';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const getDrawerItemIcon = (icon) => ({ color }) => (
    <MaterialIcons name={icon} size={22} style={{ color }} />
);

// Contacts Stack
const ContactsScreens = () => (
    <Stack.Navigator
        initialRouteName="Contacts"
        screenOptions={{
        headerTintColor: 'white',
        headerStyle: { backgroundColor: 'tomato' },
        headerTitleAlign: 'center',
        }}
    >
        <Stack.Screen name="Contacts" component={Contacts} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Options" component={Options} />
    </Stack.Navigator>
);

// Favorites Stack
const FavoritesScreens = () => (
    <Stack.Navigator initialRouteName="Favorites">
        <Stack.Screen name="Favorites" component={Favorites} />
        <Stack.Screen name="Profile" component={Profile} />
    </Stack.Navigator>
);

// User Stack
const UserScreens = () => {
    return (
        <Stack.Navigator initialRouteName="User">
            <Stack.Screen
            name="User"
            component={User}
            options={({ navigation }) => ({
                headerTitle: "Me",
                headerTintColor: 'white',
                headerStyle: {
                backgroundColor: colors.blue,
                },
                headerRight: () => (
                <MaterialIcons
                    name="settings"
                    size={24}
                    style={{ color: 'white', marginRight: 10 }}
                    onPress={() => navigation.navigate('Options')}
                />
                ),
            })}
            />
            <Stack.Screen
                name="Options"
                component={Options}
                options={{ title: "Options" }}
            />
        </Stack.Navigator>
    );
};
  

    // Drawer Navigator
const DrawerNavigator = () => (
    <NavigationContainer>
        <Drawer.Navigator
        initialRouteName="ContactsScreens"
        screenOptions={{
            drawerActiveTintColor: colors.blue,
            drawerInactiveTintColor: colors.greyDark,
        }}
        >
        <Drawer.Screen
            name="ContactsScreens"
            component={ContactsScreens}
            options={{
                title: 'Contacts',
                drawerIcon: getDrawerItemIcon('list'),
            }}
        />
        <Drawer.Screen
            name="FavoritesScreens"
            component={FavoritesScreens}
            options={{
                title: 'Favorites',
                drawerIcon: getDrawerItemIcon('star'),
            }}
        />
        <Drawer.Screen
            name="UserScreens"
            component={UserScreens}
            options={{
                title: 'User',
                drawerIcon: getDrawerItemIcon('person'),
            }}
        />
        </Drawer.Navigator>
    </NavigationContainer>
);

export default DrawerNavigator;
