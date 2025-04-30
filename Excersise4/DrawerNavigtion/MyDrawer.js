import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

import Home from "./screens/Home";
import Profile from "./screens/Profile";
import CustomDrawerBar from "./components/CustomDrawerBar";

const Drawer = createDrawerNavigator();

const MyDrawer = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerBar {...props} />}
    >
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Profile" component={Profile} />
    </Drawer.Navigator>
  );
};

export default MyDrawer;
