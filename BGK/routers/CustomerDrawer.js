import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Customers from "../screens/Customers";
import Cart from "../screens/Cart";

const Drawer = createDrawerNavigator();

const CustomerDrawer = () => (
  <Drawer.Navigator initialRouteName="Customers">
    <Drawer.Screen name="Customers" component={Customers} options={{ title: "Thực đơn" }} />
    <Drawer.Screen name="Cart" component={Cart} options={{ title: "Giỏ hàng" }} />
  </Drawer.Navigator>
);

export default CustomerDrawer;
