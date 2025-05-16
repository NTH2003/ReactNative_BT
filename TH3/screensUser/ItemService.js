import React from "react";
import { StyleSheet, View,Alert,Platform } from "react-native";
import { Button, Text } from "react-native-paper";

const ItemService = ({id,ServiceName,Price,onPress}) => {

    return(
       <View style={{borderWidth:1,borderRadius:4,margin:10,flexDirection:'row'} }>
            <View style={{flex:2,padding:5,margin:10}}>
                <Text style = {mystyle.ItemText} >{ServiceName}</Text>
            </View>
            <View style={{flex:1,padding:5,margin:10}}>
                <Text style = {mystyle.ItemText} >{Number(Price).toLocaleString()} d</Text>
                </View>
            <View style={{flex:1,padding:5,margin:10}}>
                <Button
                    style = {mystyle.ItemButon} 
                    labelStyle = {mystyle.ItemButonText}
                    onPress={onPress}
                >Booking</Button>
            </View>
       </View>
    );
}

export default ItemService;

const mystyle = StyleSheet.create({
    ItemText:{
        fontSize:13,
        fontWeight:'bold',
        color:'red',
    },
    ItemButon:{
        borderRadius:8,
        fontSize:18,
        backgroundColor: "#FF3366",
    },
    ItemButonText:{
        color:'#FFFFFF',
        fontWeight:'bold',
    },
})