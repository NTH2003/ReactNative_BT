import { NavigationContainer } from "@react-navigation/native";
import Router from "./routers/Router";
import { MyContextControllerProvider } from "./store/index";
import { LogBox } from 'react-native';

LogBox.ignoreLogs([
  'ViewPropTypes will be removed',
  'ColorPropType will be removed',
]);

const App = () => {
    return (
        <MyContextControllerProvider>
            <NavigationContainer>
                <Router />
            </NavigationContainer>
        </MyContextControllerProvider>
    );
};

export default App;
