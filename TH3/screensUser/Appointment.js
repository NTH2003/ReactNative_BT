import React, { useEffect, useState } from "react";
import {View,FlatList,Alert,Platform,TouchableOpacity,StyleSheet,} from "react-native";
import { Text } from "react-native-paper";
import { useMyContextController } from "../store";
import firestore from "@react-native-firebase/firestore";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const Appointment = ({ route, navigation }) => {
  const [controller] = useMyContextController();
  const { userLogin } = controller;
  const { service } = route.params;

  const [appointments, setAppointments] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [isTimePickerVisible, setTimePickerVisible] = useState(false);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection("Bookings")
      .where("username", "==", userLogin.fullName)
      .onSnapshot((querySnapshot) => {
        const data = [];
        querySnapshot.forEach((doc) => {
          data.push({ id: doc.id, ...doc.data() });
        });
        setAppointments(data);
      });

    return () => unsubscribe();
  }, [userLogin.fullName]);

  const handleDelete = async (id) => {
    try {
      await firestore().collection("Bookings").doc(id).delete();
      Alert.alert("Thành công", "Đã hủy lịch hẹn");
    } catch (error) {
      console.error("Lỗi khi xóa:", error);
    }
  };

  const handleUpdate = async (id) => {
    try {
      const isoString = selectedDate.toISOString();
      await firestore().collection("Bookings").doc(id).update({
        datetime: isoString,
      });
      Alert.alert("Cập nhật", "Đã cập nhật thời gian hẹn");
      setEditingId(null);
    } catch (error) {
      console.error("Lỗi cập nhật:", error);
    }
  };

  const showDatePicker = () => {
    setDatePickerVisible(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisible(false);
  };

  const handleDateConfirm = (date) => {
    setSelectedDate(date);
    hideDatePicker();
  };

  const showTimePicker = () => {
    setTimePickerVisible(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisible(false);
  };

  const handleTimeConfirm = (time) => {
    const newDate = new Date(selectedDate);
    newDate.setHours(time.getHours(), time.getMinutes());
    setSelectedDate(newDate);
    hideTimePicker();
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.text}>Dịch vụ: {item.serviceName}</Text>
      <Text style={styles.text}>Thời gian: {new Date(item.datetime).toLocaleString()}</Text>

      {editingId === item.id ? (
        <View>
          <Text style={styles.label}>Ngày mới: {selectedDate.toLocaleDateString()}</Text>
          <CustomButton text="Chọn ngày" onPress={showDatePicker} color="#6a5acd" />

          <Text style={styles.label}>Giờ mới: {selectedDate.toLocaleTimeString()}</Text>
          <CustomButton text="Chọn giờ" onPress={showTimePicker} color="#20b2aa" />

          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleDateConfirm}
            onCancel={hideDatePicker}
            date={selectedDate}
          />

          <DateTimePickerModal
            isVisible={isTimePickerVisible}
            mode="time"
            onConfirm={handleTimeConfirm}
            onCancel={hideTimePicker}
            date={selectedDate}
          />

          <CustomButton text="Cập nhật" onPress={() => handleUpdate(item.id)} color="#228b22" />
        </View>
      ) : (
        <CustomButton
          text="Sửa thời gian"
          onPress={() => {
            setEditingId(item.id);
            setSelectedDate(new Date(item.datetime));
          }}
          color="#1e90ff"
        />
      )}

      <CustomButton text="Hủy lịch" onPress={() => handleDelete(item.id)} color="#dc143c" />
    </View>
  );

  const handleBookAppointment = async () => {
    try {
      const isoString = selectedDate.toISOString();
      await firestore().collection("Bookings").add({
        serviceName: service.name,
        price: service.price,
        datetime: isoString,
        username: userLogin.fullName,
      });
      Alert.alert("Thành công", "Đã đặt lịch hẹn thành công");
      setEditingId(null);
    } catch (error) {
      console.error("Lỗi khi đặt lịch hẹn:", error);
    }
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text variant="titleLarge" style={styles.header}>Lịch hẹn của bạn</Text>
      <FlatList
        data={appointments}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
      <View style={styles.buttonContainer}>
        <CustomButton text="Đặt lịch ngay" onPress={handleBookAppointment} color="#FF8C00" />
      </View>
    </View>
  );
};

const CustomButton = ({ text, onPress, color = "#333" }) => (
  <TouchableOpacity style={[styles.button, { backgroundColor: color }]} onPress={onPress}>
    <Text style={styles.buttonText}>{text}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#f8f8f8",
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  text: {
    fontSize: 16,
    marginBottom: 6,
  },
  label: {
    marginTop: 10,
    marginBottom: 4,
    fontWeight: "bold",
  },
  header: {
    textAlign: "center",
    marginBottom: 16,
    fontSize: 20,
    fontWeight: "bold",
  },
  button: {
    paddingVertical: 10,
    borderRadius: 6,
    marginTop: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  buttonContainer: {
    padding: 16,
    alignItems: "center",
  },
});

export default Appointment;