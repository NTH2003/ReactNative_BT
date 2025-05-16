import {  Alert,View,StyleSheet, ScrollView } from "react-native"
import { IconButton,Text,Avatar, Menu,Button,TextInput,Dialog,Portal } from "react-native-paper"
import { logout, useMyContextController } from "../store"
import React, { useEffect,useCallback } from "react"
import fireStore from "@react-native-firebase/firestore"
import auth from "@react-native-firebase/auth";


const Profile = ({ navigation }) => {
    const [address,setAddress] = React.useState("");
    const [fullName,setFullName] = React.useState("");
    const [phone,setPhone] = React.useState("");
    const [newPassword,setNewPassword] = React.useState("");
    const [showNewPassword, setShowPassword] = React.useState(false)
    const [controller, dispatch] = useMyContextController();
    const [changePassVisible, setChangePassVisible] = React.useState(false);
    const [menuVisible, setMenuVisible] = React.useState(false);
    const { userLogin } = controller;
    const handleLogout = useCallback(() => {
        logout(dispatch);
    }, [dispatch]);
    const fetchData = useCallback(async () => {
        const EMAIl = userLogin.email;
        const doc = await fireStore().collection("Users").doc(EMAIl).get();
        if (doc.exists) {
            const data = doc.data();
            setAddress(data.address || "")
            setFullName(data.fullName || "")
            setPhone(data.phone || "")
        }
    }, [userLogin]);

    const Update = async() =>{
        try {
        const EMAIl = userLogin.email;
        await fireStore().collection("Users").doc(EMAIl).update({
            address: address,
            fullName: fullName,
            phone: phone,
        });
        Alert.alert("Thành công", "Cập nhật thông tin thành công!");
        fetchData()
    } catch (error) {
        Alert.alert("Lỗi", "Cập nhật thất bại!");
    }
    };
    const handleChangePassword = async () => {
        try {
        const user = auth().currentUser;
        await user.updatePassword(newPassword);
        setChangePassVisible(false);
        setNewPassword("");
            Alert.alert("Thành công", "Đổi mật khẩu thành công!");
        } catch (error) {
            Alert.alert("Lỗi", "Đổi mật khẩu thất bại! Có thể bạn cần đăng nhập lại.");
        }
    };

    useEffect(() => {
        if (userLogin == null)
            navigation.navigate("Logins")
    }, [userLogin,navigation])

    useEffect(() => {
        fetchData();
    },[userLogin,fetchData])

    useEffect(() =>{
        navigation.setOptions({
            headerRight: () => (
                <Menu
                    visible={menuVisible}
                    onDismiss={() => setMenuVisible(false)}
                    anchor={
                        <IconButton
                            icon="dots-vertical"
                            onPress={() => setMenuVisible(true)}
                            iconColor="black"
                        />
                    }
                >
                    <Menu.Item onPress={handleLogout} title="Logout" />
                    <Menu.Item onPress={() => { setMenuVisible(false); setChangePassVisible(true); }} title="Change Password" />
                </Menu>
            ),
            title: "ME"
        });
    },[navigation,menuVisible,handleLogout])

    return (
        <ScrollView style={{flex:1}}>
        <View style={{flex:1}}>
            <View style={myStyle.Card}>
                <Text style={myStyle.CardText}>Address *</Text>
                <TextInput
                    value={address}
                    placeholder="Address"
                    mode="outlined"
                    outlineColor="#ddd"
                    activeOutlineColor="#FF8C00"
                    style={myStyle.CardInput}
                    onChangeText={setAddress}
                />
            </View>
            <View style={myStyle.Card}>
                <Text style={myStyle.CardText}>Full Name *</Text>
                <TextInput
                    value={fullName}
                    placeholder="Address"
                    mode="outlined"
                    outlineColor="#ddd"
                    activeOutlineColor="#FF8C00"
                    style={myStyle.CardInput}
                    onChangeText={setFullName}
                />
            </View>
            <View style={myStyle.Card}>
                <Text style={myStyle.CardText}>Phone *</Text>
                <TextInput
                    value={phone}
                    placeholder="Address"
                    mode="outlined"
                    outlineColor="#ddd"
                    activeOutlineColor="#FF8C00"
                    style={myStyle.CardInput}
                    onChangeText={setPhone}
                />
            </View>
        </View>
        <View style={{ flex: 1, justifyContent: "center", margin:20 }}>
            <Button mode="contained"
               style = {myStyle.AddButton}
               onPress={Update}
            >
                update
            </Button>
        </View>
            {/* Dialog đổi mật khẩu */}
            <Portal>
                <Dialog visible={changePassVisible} onDismiss={() => setChangePassVisible(false)}>
                    <Dialog.Title>Đổi mật khẩu</Dialog.Title>
                    <Dialog.Content>
                        <TextInput
                            label="Mật khẩu mới"
                            value={newPassword}
                            onChangeText={setNewPassword}
                            secureTextEntry = {!showNewPassword}
                            mode="outlined"
                            right={
                            <TextInput.Icon icon={showNewPassword ? "eye-off" : "eye"} onPress={() => setShowPassword(!showNewPassword)} />
                            }
                        />
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={() => setChangePassVisible(false)}>Hủy</Button>
                        <Button onPress={handleChangePassword} disabled={newPassword === ""}>Xác nhận</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </ScrollView>
    )
}

export default Profile;

const myStyle = StyleSheet.create({
    Card: {
        margin: 10,
        padding: 10,
    },
    CardText: {
        color: 'black',
        fontWeight: 'bold',
        marginBottom: 8,
    },
    CardInput: {
        width: "100%",
    },
    AddButton: {
        width: "100%",
        marginTop: 10,
        marginBottom: 15,
        backgroundColor: "#FF3366",
        borderRadius: 8,
    },
    AddButtonContent: {
        height: 50,
    },
    AddButtonText: {
        fontSize: 18,
        fontWeight: "bold",
    },
});