import { View, StyleSheet, Alert, Modal } from "react-native";
import { Text, Button, TextInput, Appbar, Menu } from "react-native-paper";
import React, { useState, useEffect } from "react";
import firestore from "@react-native-firebase/firestore";

const formatDate = (timestamp) => {
    if (!timestamp) return '';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    const pad = (n) => n < 10 ? '0' + n : n;
    return `${pad(date.getDate())}/${pad(date.getMonth() + 1)}/${date.getFullYear()} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
};

const formatPrice = (price) => {
    if (!price) return '';
    return price.toLocaleString('vi-VN') + ' đ';
};

const ServiceDetail = ({ route, navigation }) => {
    const { service } = route.params || {};
    const [editModal, setEditModal] = useState(false);
    const [editName, setEditName] = useState(service?.name || "");
    const [editPrice, setEditPrice] = useState(service?.price ? service.price.toString() : "");
    const [loading, setLoading] = useState(false);
    const [menuVisible, setMenuVisible] = useState(false);

    useEffect(() => {
        if (route.params?.showEditModal) {
            setEditModal(true);
            navigation.setParams({ showEditModal: false });
        }
        if (route.params?.confirmDelete) {
            handleDelete();
            navigation.setParams({ confirmDelete: false });
        }
    }, [route.params]);

    const handleDelete = async () => {
        Alert.alert(
            "Xác nhận xoá",
            "Bạn có chắc chắn muốn xoá dịch vụ này?",
            [
                { text: "Huỷ", style: "cancel" },
                {
                    text: "Xoá", style: "destructive", onPress: async () => {
                        setLoading(true);
                        try {
                            await firestore().collection("SERVICES").doc(service.id).delete();
                            Alert.alert("Đã xoá thành công");
                            navigation.goBack();
                        } catch (e) {
                            Alert.alert("Lỗi", e.message || "Không thể xoá!");
                        }
                        setLoading(false);
                    }
                }
            ]
        );
    };

    const handleEdit = async () => {
        if (!editName.trim() || !editPrice.trim() || isNaN(editPrice) || Number(editPrice) <= 0) {
            Alert.alert("Lỗi", "Vui lòng nhập tên và giá hợp lệ!");
            return;
        }
        setLoading(true);
        try {
            await firestore().collection("SERVICES").doc(service.id).update({
                name: editName,
                price: Number(editPrice),
                updatedAt: firestore.FieldValue.serverTimestamp(),
            });
            Alert.alert("Cập nhật thành công!");
            setEditModal(false);
            navigation.goBack(); // hoặc reload lại chi tiết nếu muốn
        } catch (e) {
            Alert.alert("Lỗi", e.message || "Không thể cập nhật!");
        }
        setLoading(false);
    };

    const openMenu = () => setMenuVisible(true);
    const closeMenu = () => setMenuVisible(false);

    return (
        <>
            <View style={styles.container}>
                <Text style={styles.label}><Text style={styles.bold}>Service name:</Text> {service?.name || ''}</Text>
                <Text style={styles.label}><Text style={styles.bold}>Price:</Text> {formatPrice(service?.price)}</Text>
                <Text style={styles.label}><Text style={styles.bold}>Creator:</Text> {service?.creator || 'Unknown'}</Text>
                <Text style={styles.label}><Text style={styles.bold}>Time:</Text> {formatDate(service?.createdAt)}</Text>
                <Text style={styles.label}><Text style={styles.bold}>Final update:</Text> {formatDate(service?.updatedAt || service?.createdAt)}</Text>

                <Modal
                    visible={editModal}
                    transparent
                    animationType="slide"
                    onRequestClose={() => setEditModal(false)}
                >
                    <View style={styles.modalBg}>
                        <View style={styles.modalContent}>
                            <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 16 }}>Edit Service</Text>
                            <TextInput
                                label="Service name"
                                value={editName}
                                onChangeText={setEditName}
                                style={{ marginBottom: 12 }}
                            />
                            <TextInput
                                label="Price"
                                value={editPrice}
                                onChangeText={setEditPrice}
                                keyboardType="numeric"
                                style={{ marginBottom: 20 }}
                            />
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Button mode="contained" onPress={handleEdit} loading={loading} disabled={loading} style={styles.editBtn}>Save</Button>
                                <Button mode="outlined" onPress={() => setEditModal(false)} disabled={loading}>Cancel</Button>
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 16,
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
    },
    bold: {
        fontWeight: 'bold',
    },
    editBtn: {
        backgroundColor: '#f5586c',
        borderRadius: 8,
        minWidth: 100,
    },
    deleteBtn: {
        backgroundColor: '#b71c1c',
        borderRadius: 8,
        minWidth: 100,
    },
    modalBg: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.2)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 24,
        width: '85%',
        elevation: 5,
    },
});

export default ServiceDetail;
