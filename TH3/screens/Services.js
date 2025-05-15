import React, { useEffect, useState } from "react";
import { Image, View, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { IconButton, Text } from "react-native-paper";
import firestore from "@react-native-firebase/firestore";

const Services = ({ navigation }) => {
    const [services, setServices] = useState([]);

    useEffect(() => {
        const unsubscribe = firestore()
            .collection("SERVICES")
            .orderBy("createdAt", "desc")
            .onSnapshot(snapshot => {
                const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setServices(data);
            });
        return unsubscribe;
    }, []);

    const formatPrice = (price) => {
        return price.toLocaleString("vi-VN") + " đ";
    };

    return (
        <View style={{ flex: 1, padding: 20, backgroundColor: '#fff' }}>
            <Image
                source={require("../asset/logo.png")}
                style={{
                    alignSelf: "center",
                    marginVertical: 20,
                    width: 180,
                    height: 70,
                    resizeMode: "contain"
                }}
            />
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                <Text style={{ fontSize: 20, fontWeight: "bold" }}>Danh sách dịch vụ</Text>
                <IconButton
                    icon="plus-circle"
                    iconColor="red"
                    size={32}
                    onPress={() => navigation.navigate("AddNewService")}
                    style={{ marginRight: 0 }}
                />
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                {services.map((item) => (
                    <TouchableOpacity
                        key={item.id}
                        style={styles.card}
                        activeOpacity={0.7}
                        onPress={() => navigation.navigate('ServiceDetail', { service: item })}
                    >
                        <Text numberOfLines={1} style={styles.serviceName}>{item.name}</Text>
                        <Text style={styles.price}>{formatPrice(item.price)}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        borderRadius: 12,
        paddingVertical: 12,
        paddingHorizontal: 16,
        marginBottom: 12,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        borderWidth: 1,
        borderColor: '#eee',
    },
    serviceName: {
        fontSize: 16,
        fontWeight: '500',
        flex: 1,
        marginRight: 10,
        color: '#222',
    },
    price: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#f5586c',
        minWidth: 80,
        textAlign: 'right',
    },
});

export default Services;
