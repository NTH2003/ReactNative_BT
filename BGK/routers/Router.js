import { createStackNavigator } from "@react-navigation/stack";
import Login from "../screens/Login";
import Register from "../screens/Register";
import CustomerDrawer from "./CustomerDrawer";
import DetailFood from "../screens/DetailFood";

const Stack = createStackNavigator();

const Router = () => {
    return (
        <Stack.Navigator
            initialRouteName="Login"
            screenOptions={{
                headerShown: true
            }}
        >
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="Customers" component={CustomerDrawer} />
            <Stack.Screen name="DetailFood" component={DetailFood} />
        </Stack.Navigator>
    );
};

export default Router;