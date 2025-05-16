import React, { useEffect, useState } from "react";
import { View, FlatList, StyleSheet, Alert } from "react-native";
import { Text, Button, Card, Modal, TextInput } from "react-native-paper";
import firestore from "@react-native-firebase/firestore";

const Transaction = () => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editModal, setEditModal] = useState(false);
    const [editItem, setEditItem] = useState(null);
    const [editTime, setEditTime] = useState("");
    const [editService, setEditService] = useState("");

    useEffect(() => {
        const unsubscribe = firestore()
        .collection("APPOINTMENTS")
        .onSnapshot(snapshot => {
            const data = [];
            snapshot.forEach(doc => data.push({ id: doc.id, ...doc.data() }));
            setTransactions(data);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    // Accept (duyệt lịch)
    const handleAccept = async (id) => {
        try {
        await firestore().collection("APPOINTMENTS").doc(id).update({
            status: "accepted",
        });
        Alert.alert("Thành công", "Lịch hẹn đã được duyệt!");
        } catch (e) {
        Alert.alert("Lỗi", e.message);
        }
    };

    // Mở modal cập nhật
    const openEditModal = (item) => {
        setEditItem(item);
        setEditTime(item.time || "");
        setEditService(item.serviceName || "");
        setEditModal(true);
    };

    const handleUpdate = async () => {
        if (!editItem) return;
        try {
        await firestore().collection("APPOINTMENTS").doc(editItem.id).update({
            time: editTime,
            serviceName: editService,
        });
        Alert.alert("Thành công", "Cập nhật lịch hẹn thành công!");
        setEditModal(false);
        } catch (e) {
        Alert.alert("Lỗi", e.message);
        }
    };

    const renderItem = ({ item }) => (
        <Card style={styles.card}>
        <Card.Title title={item.customerName || "Khách"} subtitle={item.time} />
        <Card.Content>
            <Text>Dịch vụ: {item.serviceName}</Text>
            <Text>Trạng thái: {item.status}</Text>
        </Card.Content>
        <Card.Actions>
            {item.status !== "accepted" && (
            <Button onPress={() => handleAccept(item.id)}>Accept</Button>
            )}
            <Button onPress={() => openEditModal(item)}>Update</Button>
        </Card.Actions>
        </Card>
    );

    return (
        <View style={styles.container}>
        <Text style={styles.title}>Transaction</Text>
        <FlatList
            data={transactions}
            keyExtractor={item => item.id}
            renderItem={renderItem}
            refreshing={loading}
            onRefresh={() => setLoading(true)}
        />

        <Modal visible={editModal} onDismiss={() => setEditModal(false)} contentContainerStyle={styles.modal}>
            <Text style={{ fontWeight: "bold", fontSize: 18, marginBottom: 16 }}>Cập nhật lịch hẹn</Text>
            <TextInput
                label="Thời gian"
                value={editTime}
                onChangeText={setEditTime}
                style={{ marginBottom: 12 }}
            />
            <TextInput
                label="Dịch vụ"
                value={editService}
                onChangeText={setEditService}
                style={{ marginBottom: 20 }}
            />
            <Button mode="contained" onPress={handleUpdate} style={{ marginBottom: 10 }}>Lưu</Button>
            <Button mode="outlined" onPress={() => setEditModal(false)}>Hủy</Button>
        </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, backgroundColor: "#fff" },
    title: { fontSize: 22, fontWeight: "bold", marginBottom: 16 },
    card: { marginBottom: 12 },
    modal: {
        backgroundColor: "white",
        padding: 20,
        margin: 20,
        borderRadius: 8,
    },
});

export default Transaction;