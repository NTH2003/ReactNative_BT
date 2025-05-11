import { createStackNavigator } from "@react-navigation/stack";
import Login from "../screens/Login";
import Register from "../screens/Register";
import Admin from "../screens/Admin";
import Customers from "../screens/Customers";

const Stack = createStackNavigator();

const Router = () => {
    return (
        <Stack.Navigator
            initialRouteName="Login"
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Admin" component={Admin} />
            <Stack.Screen name="Customers" component={Customers} />
            <Stack.Screen name="Register" component={Register} />
        </Stack.Navigator>
    );
};

export default Router;