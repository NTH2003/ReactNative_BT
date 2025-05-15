import React, { useEffect, useState, useContext } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { Text, Button } from "react-native-paper";
import firestore from "@react-native-firebase/firestore";
import { useMyContextController } from "../store"; 

const DetailFood = ({ route }) => {
    const { cuisineId, cuisineName } = route.params;
    const [dishes, setDishes] = useState([]);
    const [controller, dispatch] = useMyContextController();

    useEffect(() => {
        const unsubscribe = firestore()
        .collection("dishes")
        .onSnapshot(snapshot => {
            const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            // Lọc trên client: foodID là số hoặc chuỗi, so sánh với cuisineId
            const filtered = data.filter(item => String(item.foodID) === String(cuisineId));
            setDishes(filtered);
        });

        return () => unsubscribe();
    }, [cuisineId]);

    const renderItem = ({ item }) => (
        <View style={styles.card}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.description}>{cuisineName}</Text>
            </View>
            <Text style={styles.price}>₫ {item.price}</Text>
        </View>
        <Button
            mode="text"
            style={styles.button}
            labelStyle={{ color: '#3498DB', fontWeight: 'bold' }}
            onPress={() => dispatch({ type: 'ADD_TO_CART', value: item })}

        >
            ADD TO CART
        </Button>
        </View>
    );

    return (
        <View style={styles.container}>
        <FlatList
            data={dishes}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            contentContainerStyle={{ paddingBottom: 20 }}
        />
        </View>
        
    );
    };

    const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#fff", padding: 16 },
    card: {
        backgroundColor: "#f2f2f2",
        borderRadius: 10,
        padding: 12,
        marginBottom: 15,
    },
    name: { fontSize: 16, fontWeight: "bold", marginBottom: 6, color:'red' },
    description: { fontSize: 14, color: "#333", marginBottom: 8 },
    price: { fontSize: 14, color: "#333", marginBottom: 8 },
    button: { alignSelf: "flex-start", borderRadius: 6 },
});

export default DetailFood;