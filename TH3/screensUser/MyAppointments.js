import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { Text, Card, Button, IconButton, Portal, Dialog, TextInput } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import { useMyContextController } from '../store';

const MyAppointments = ({ navigation }) => {
    const [appointments, setAppointments] = useState([]);
    const [controller] = useMyContextController();
    const { userLogin } = controller;
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [updateDialogVisible, setUpdateDialogVisible] = useState(false);
    const [newDate, setNewDate] = useState('');
    const [newTime, setNewTime] = useState('');

    useEffect(() => {
        fetchAppointments();
    }, []);

    const fetchAppointments = async () => {
        try {
            const appointmentsRef = firestore()
                .collection('Appointments')
                .where('customerEmail', '==', userLogin.email)
                .orderBy('date', 'desc');

            const snapshot = await appointmentsRef.get();
            const appointmentsList = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setAppointments(appointmentsList);
        } catch (error) {
            Alert.alert('Error', 'Failed to fetch appointments');
        }
    };

    const handleDelete = async (appointmentId) => {
        try {
            await firestore().collection('Appointments').doc(appointmentId).delete();
            Alert.alert('Success', 'Appointment deleted successfully');
            fetchAppointments();
        } catch (error) {
            Alert.alert('Error', 'Failed to delete appointment');
        }
    };

    const handleUpdate = async () => {
        if (!selectedAppointment) return;

        try {
            await firestore()
                .collection('Appointments')
                .doc(selectedAppointment.id)
                .update({
                    date: newDate,
                    time: newTime,
                    status: 'pending'
                });

            setUpdateDialogVisible(false);
            Alert.alert('Success', 'Appointment updated successfully');
            fetchAppointments();
        } catch (error) {
            Alert.alert('Error', 'Failed to update appointment');
        }
    };

    const openUpdateDialog = (appointment) => {
        setSelectedAppointment(appointment);
        setNewDate(appointment.date);
        setNewTime(appointment.time);
        setUpdateDialogVisible(true);
    };

    return (
        <ScrollView style={styles.container}>
            {appointments.map((appointment) => (
                <Card key={appointment.id} style={styles.card}>
                    <Card.Content>
                        <Text style={styles.serviceName}>{appointment.serviceName}</Text>
                        <Text style={styles.dateTime}>Date: {appointment.date}</Text>
                        <Text style={styles.dateTime}>Time: {appointment.time}</Text>
                        <Text style={styles.status}>Status: {appointment.status}</Text>
                    </Card.Content>
                    <Card.Actions>
                        <Button 
                            mode="contained" 
                            onPress={() => openUpdateDialog(appointment)}
                            style={styles.updateButton}
                        >
                            Update
                        </Button>
                        <Button 
                            mode="contained" 
                            onPress={() => handleDelete(appointment.id)}
                            style={styles.deleteButton}
                        >
                            Delete
                        </Button>
                    </Card.Actions>
                </Card>
            ))}

            <Portal>
                <Dialog visible={updateDialogVisible} onDismiss={() => setUpdateDialogVisible(false)}>
                    <Dialog.Title>Update Appointment</Dialog.Title>
                    <Dialog.Content>
                        <TextInput
                            label="Date"
                            value={newDate}
                            onChangeText={setNewDate}
                            mode="outlined"
                            style={styles.input}
                        />
                        <TextInput
                            label="Time"
                            value={newTime}
                            onChangeText={setNewTime}
                            mode="outlined"
                            style={styles.input}
                        />
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={() => setUpdateDialogVisible(false)}>Cancel</Button>
                        <Button onPress={handleUpdate}>Update</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f5f5f5',
    },
    card: {
        marginBottom: 16,
        elevation: 4,
    },
    serviceName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    dateTime: {
        fontSize: 16,
        marginBottom: 4,
    },
    status: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FF8C00',
        marginTop: 8,
    },
    updateButton: {
        backgroundColor: '#FF8C00',
        marginRight: 8,
    },
    deleteButton: {
        backgroundColor: '#FF3366',
    },
    input: {
        marginBottom: 16,
    },
});

export default MyAppointments; 