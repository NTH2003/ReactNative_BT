import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, Button, Divider } from 'react-native-paper';

const ServiceDetail = ({ route, navigation }) => {
    const { service } = route.params;

    const formatPrice = (price) => {
        if (!price) return '';
        return price.toLocaleString("vi-VN") + " đ";
    };

    const handleBookAppointment = () => {
        navigation.navigate('Appointment', { service });
    };

    return (
        <ScrollView style={styles.container}>
            <Card style={styles.card}>
                <Card.Content>
                    <Text style={styles.serviceName}>{service.ServiceName}</Text>
                    <Divider style={styles.divider} />
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Giá dịch vụ</Text>
                        <Text style={styles.price}>{formatPrice(service.Price)}</Text>
                    </View>
                </Card.Content>
            </Card>
            <View style={styles.buttonContainer}>
                <Button
                    mode="contained"
                    onPress={handleBookAppointment}
                    style={styles.bookButton}
                    contentStyle={styles.bookButtonContent}
                >
                    Đặt lịch ngay
                </Button>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        padding: 16,
    },
    card: {
        marginBottom: 16,
        elevation: 4,
    },
    serviceName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 8,
    },
    divider: {
        marginVertical: 16,
        backgroundColor: '#ddd',
    },
    section: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FF8C00',
        marginBottom: 8,
    },
    price: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FF8C00',
    },
    buttonContainer: {
        padding: 16,
    },
    bookButton: {
        backgroundColor: '#FF8C00',
        borderRadius: 8,
    },
    bookButtonContent: {
        paddingVertical: 8,
    },
});

export default ServiceDetail;