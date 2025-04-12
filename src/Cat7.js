import React from "react";
import { Text,View } from "react-native";

const Cat = props => {
    return(
        <View>
            <Text> Hello, i am {props.name} </Text>
        </View>
    );
}

const Cafe = () => {
    return(
        <View>
            <Cat name = "Maru"/>
             <Cat name = "Jeillorums"/>
              <Cat name = "Spot"/>
        </View>
    );
}

export default Cafe;