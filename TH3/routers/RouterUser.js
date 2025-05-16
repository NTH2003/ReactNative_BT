import { createStackNavigator } from '@react-navigation/stack';
import Services from '../screensUser/Services';
import ServiceDetail from '../screensUser/ServiceDetail';
// ... các màn hình khác

const Stack = createStackNavigator();

const RouterUser = () => (
  <Stack.Navigator>
    <Stack.Screen name="Services" component={Services} />
    <Stack.Screen name="ServiceDetail" component={ServiceDetail} />
    {/* ... các màn hình khác */}
  </Stack.Navigator>
);

export default RouterUser;
