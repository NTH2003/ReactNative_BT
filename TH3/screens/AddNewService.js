import React, { useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { Text, TextInput, Button } from "react-native-paper";
import firestore from "@react-native-firebase/firestore";

const AddNewService = () => {
    const [serviceName, setServiceName] = useState("");
    const [price, setPrice] = useState("");

    const formatInputPrice = (value) => {
        const numeric = value.replace(/\D/g, "");
        return numeric.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };

    const handlePriceChange = (value) => {
        setPrice(formatInputPrice(value));
    };

    const handleAddService = async () => {
        const rawPrice = price.replace(/\./g, "");
        if (!serviceName.trim() || !rawPrice.trim() || isNaN(rawPrice) || Number(rawPrice) <= 0) {
            Alert.alert("Lỗi", "Vui lòng nhập tên dịch vụ và giá hợp lệ!");
            return;
        }
        try {
            await firestore().collection("SERVICES").add({
                name: serviceName,
                price: Number(rawPrice),
                createdAt: firestore.FieldValue.serverTimestamp(),
            });
            Alert.alert("Thành công", "Đã thêm dịch vụ mới!");
            setServiceName("");
            setPrice("");
        } catch (error) {
            Alert.alert("Lỗi", error.message || "Không thể thêm dịch vụ!");
        }
    };

    return (
        <View style={styles.container}>
            <Text variant="titleLarge" style={styles.title}>
                Add New Service
            </Text>

            <TextInput
                label="Service Name"
                value={serviceName}
                onChangeText={setServiceName}
                mode="outlined"
                style={styles.input}
            />

            <TextInput
                label="Price"
                value={price}
                onChangeText={handlePriceChange}
                mode="outlined"
                keyboardType="numeric"
                style={styles.input}
            />

            <Button
                mode="contained"
                onPress={handleAddService}
                style={styles.button}
            >
                Add
            </Button>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        flex: 1,
        backgroundColor: "#fff",
        justifyContent: "center",
    },
    title: {
        marginBottom: 24,
        textAlign: "center",
    },
    input: {
        marginBottom: 16,
    },
    button: {
        marginTop: 8,
    },
});

export default AddNewService;
