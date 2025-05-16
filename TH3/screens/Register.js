import { Alert, View, StyleSheet } from "react-native";
import { Button, HelperText, Text, TextInput } from "react-native-paper";
import { useState } from "react";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";

const Register = ({ navigation }) => {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [hiddenPassword, setHiddenPassword] = useState(true);
    const [hiddenPasswordConfirm, setHiddenPasswordConfirm] = useState(true);
    
    const [touched, setTouched] = useState({
        fullName: false,
        email: false,
        password: false,
        passwordConfirm: false,
        phone: false,
        address: false
    });

    const hasErrorFullName = () => touched.fullName && fullName.trim() === "";
    const hasErrorEmail = () => touched.email && !/^\S+@\S+\.\S+$/.test(email);
    const hasErrorPassword = () => touched.password && password.length < 6;
    const hasErrorPasswordConfirm = () => touched.passwordConfirm && passwordConfirm !== password;
    const hasErrorPhone = () => touched.phone && (phone.trim() === "" || phone.length < 8);
    const hasErrorAddress = () => touched.address && address.trim() === "";

    const USERS = firestore().collection("USERS");

    const handleCreateAccount = () => {
        setTouched({
            fullName: true,
            email: true,
            password: true,
            passwordConfirm: true,
            phone: true,
            address: true
        });

        if (
            fullName.trim() === "" ||
            !/^\S+@\S+\.\S+$/.test(email) ||
            password.length < 6 ||
            passwordConfirm !== password ||
            phone.trim() === "" || phone.length < 8 ||
            address.trim() === ""
        ) {
            return;
        }

        USERS.where("email", "==", email)
            .get()
            .then((querySnapshot) => {
                if (!querySnapshot.empty) {
                    Alert.alert("Tài khoản đã tồn tại", "Email này đã được đăng ký. Vui lòng sử dụng email khác.");
                } else {
                    auth()
                        .createUserWithEmailAndPassword(email, password)
                        .then(response => {
                            USERS.doc(email).set({
                                fullName,
                                email,
                                password,
                                phone,
                                address,
                                role: "customer"
                            });
                            Alert.alert("Thành công", "Đăng ký tài khoản thành công!");
                            navigation.navigate("Login");
                        })
                        .catch(e => {
                            console.error("Lỗi khi tạo tài khoản:", e.message);
                            Alert.alert("Lỗi", e.message);
                        });
                }
            })
            .catch((error) => {
                console.error("Lỗi khi kiểm tra email:", error.message);
                Alert.alert("Lỗi", "Đã xảy ra lỗi khi kiểm tra email.");
            });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Register</Text>
            <TextInput
                label="Full Name"
                value={fullName}
                onChangeText={setFullName}
                onBlur={() => setTouched(prev => ({...prev, fullName: true}))}
                style={styles.input}
                mode="outlined"
                outlineColor="#f0f0f0"
                activeOutlineColor="#f05a77"
                theme={{ colors: { primary: '#f05a77' } }}
            />
            {hasErrorFullName() && (
                <HelperText type="error" visible={hasErrorFullName()} style={styles.helperText}>
                    Họ tên không được để trống
                </HelperText>
            )}
            <TextInput
                label="Email"
                value={email}
                onChangeText={setEmail}
                onBlur={() => setTouched(prev => ({...prev, email: true}))}
                style={styles.input}
                mode="outlined"
                outlineColor="#f0f0f0"
                activeOutlineColor="#f05a77"
                theme={{ colors: { primary: '#f05a77' } }}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            {hasErrorEmail() && (
                <HelperText type="error" visible={hasErrorEmail()} style={styles.helperText}>
                    Email không hợp lệ
                </HelperText>
            )}
            <TextInput
                label="Password"
                value={password}
                onChangeText={setPassword}
                onBlur={() => setTouched(prev => ({...prev, password: true}))}
                secureTextEntry={hiddenPassword}
                style={styles.input}
                mode="outlined"
                outlineColor="#f0f0f0"
                activeOutlineColor="#f05a77"
                theme={{ colors: { primary: '#f05a77' } }}
                right={
                    <TextInput.Icon
                        icon="eye"
                        onPress={() => setHiddenPassword(!hiddenPassword)}
                        color="#aaa"
                    />
                }
            />
            {hasErrorPassword() && (
                <HelperText type="error" visible={hasErrorPassword()} style={styles.helperText}>
                    Password ít nhất 6 kí tự
                </HelperText>
            )}
            <TextInput
                label="Confirm Password"
                value={passwordConfirm}
                onChangeText={setPasswordConfirm}
                onBlur={() => setTouched(prev => ({...prev, passwordConfirm: true}))}
                secureTextEntry={hiddenPasswordConfirm}
                style={styles.input}
                mode="outlined"
                outlineColor="#f0f0f0"
                activeOutlineColor="#f05a77"
                theme={{ colors: { primary: '#f05a77' } }}
                right={
                    <TextInput.Icon
                        icon="eye"
                        onPress={() => setHiddenPasswordConfirm(!hiddenPasswordConfirm)}
                        color="#aaa"
                    />
                }
            />
            {hasErrorPasswordConfirm() && (
                <HelperText type="error" visible={hasErrorPasswordConfirm()} style={styles.helperText}>
                    Confirm Password phải so khớp với password
                </HelperText>
            )}
            <TextInput
                label="Phone"
                value={phone}
                onChangeText={setPhone}
                onBlur={() => setTouched(prev => ({...prev, phone: true}))}
                style={styles.input}
                mode="outlined"
                outlineColor="#f0f0f0"
                activeOutlineColor="#f05a77"
                theme={{ colors: { primary: '#f05a77' } }}
                keyboardType="phone-pad"
            />
            {hasErrorPhone() && (
                <HelperText type="error" visible={hasErrorPhone()} style={styles.helperText}>
                    Số điện thoại không hợp lệ
                </HelperText>
            )}
            <TextInput
                label="Address"
                value={address}
                onChangeText={setAddress}
                onBlur={() => setTouched(prev => ({...prev, address: true}))}
                style={styles.input}
                mode="outlined"
                outlineColor="#f0f0f0"
                activeOutlineColor="#f05a77"
                theme={{ colors: { primary: '#f05a77' } }}
            />
            {hasErrorAddress() && (
                <HelperText type="error" visible={hasErrorAddress()} style={styles.helperText}>
                    Địa chỉ không được để trống
                </HelperText>
            )}
            <Button 
                mode="contained" 
                onPress={handleCreateAccount} 
                style={styles.button}
                buttonColor="#f05a77"
            >
                Register
            </Button>
            <View style={styles.loginContainer}>
                <Text style={styles.loginText}>Do you have an account?</Text>
                <Button 
                    onPress={() => navigation.navigate("Login")}
                    textColor="#f05a77"
                >
                    Login
                </Button>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f8f8f8',
        justifyContent: 'center',
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        alignSelf: "center",
        color: "#f05a77",
        marginBottom: 30,
    },
    input: {
        marginBottom: 5,
        backgroundColor: 'white',
    },
    helperText: {
        marginBottom: 10,
        fontSize: 12,
    },
    button: {
        marginTop: 20,
        borderRadius: 8,
        paddingVertical: 3,
    },
    loginContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20,
    },
    loginText: {
        color: '#666',
    }
});

export default Register;