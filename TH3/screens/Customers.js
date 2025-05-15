import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView, Alert } from "react-native";
import { Text, IconButton } from "react-native-paper";
import firestore from "@react-native-firebase/firestore";

const Customers = () => {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const unsubscribe = firestore()
            .collection("USERS")
            .where("role", "==", "customer")
            .onSnapshot(snapshot => {
                const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setCustomers(data);
            });
        return unsubscribe;
    }, []);

    const handleDeleteCustomer = async (id) => {
        Alert.alert(
            "Xác nhận xoá",
            "Bạn có chắc chắn muốn xoá khách hàng này?",
            [
                { text: "Huỷ", style: "cancel" },
                {
                    text: "Xoá", style: "destructive", onPress: async () => {
                        setLoading(true);
                        try {
                            await firestore().collection("USERS").doc(id).delete();
                            Alert.alert("Đã xoá thành công");
                        } catch (e) {
                            Alert.alert("Lỗi", e.message || "Không thể xoá!");
                        }
                        setLoading(false);
                    }
                }
            ]
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Danh sách khách hàng</Text>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                {customers.map((customer) => (
                    <View key={customer.id} style={styles.customerCard}>
                        <View style={styles.customerInfo}>
                            <Text style={styles.customerName}>{customer.fullName}</Text>
                            <Text style={styles.customerEmail}>{customer.email}</Text>
                            <Text style={styles.customerPhone}>{customer.phone}</Text>
                            <Text style={styles.customerAddress}>{customer.address}</Text>
                        </View>
                        <IconButton
                            icon="delete"
                            iconColor="#b71c1c"
                            size={24}
                            onPress={() => handleDeleteCustomer(customer.id)}
                        />
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 16,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    customerCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#f5f5f9',
        borderRadius: 8,
        padding: 16,
        marginBottom: 12,
    },
    customerInfo: {
        flex: 1,
    },
    customerName: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    customerEmail: {
        fontSize: 14,
        color: '#666',
        marginBottom: 2,
    },
    customerPhone: {
        fontSize: 14,
        color: '#666',
        marginBottom: 2,
    },
    customerAddress: {
        fontSize: 14,
        color: '#666',
    },
});

export default Customers;