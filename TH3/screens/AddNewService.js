import React, { useState } from "react";
import { View, StyleSheet, Alert, Text, TextInput, TouchableOpacity } from "react-native";
import firestore from "@react-native-firebase/firestore";

const AddNewService = () => {
    const [serviceName, setServiceName] = useState("");
    const [price, setPrice] = useState("0");

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
            setPrice("0");
        } catch (error) {
            Alert.alert("Lỗi", error.message || "Không thể thêm dịch vụ!");
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.formContainer}>
                <Text style={styles.label}>Service name <Text style={styles.required}>*</Text></Text>
                <TextInput
                    value={serviceName}
                    onChangeText={setServiceName}
                    style={styles.input}
                    placeholder="Input a service name"
                    placeholderTextColor="#A0A0A0"
                />

                <Text style={styles.label}>Price <Text style={styles.required}>*</Text></Text>
                <TextInput
                    value={price}
                    onChangeText={handlePriceChange}
                    style={styles.input}
                    keyboardType="numeric"
                />

                <TouchableOpacity
                    style={styles.button}
                    onPress={handleAddService}
                    activeOpacity={0.8}
                >
                    <Text style={styles.buttonText}>Add</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 16,
    },
    formContainer: {
        width: "100%",
    },
    label: {
        fontSize: 16,
        fontWeight: "500",
        marginBottom: 8,
        color: "#333",
    },
    required: {
        color: "#f05a77",
    },
    input: {
        backgroundColor: "#F5F5F5",
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        marginBottom: 20,
        color: "#333",
    },
    button: {
        backgroundColor: "#f05a77",
        borderRadius: 8,
        padding: 14,
        alignItems: "center",
        marginTop: 10,
    },
    buttonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "600",
    },
});

export default AddNewService;