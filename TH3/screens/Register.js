import { Alert, View } from "react-native";
import { Button, HelperText, Text, TextInput } from "react-native-paper";
import { useState } from "react";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";

const Register = ({ navigation }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [hiddenPassword, setHiddenPassword] = useState(true);
    const [hiddenPasswordConfirm, setHiddenPasswordConfirm] = useState(true);

    const hasErrorUsername = () => username === "";
    const hasErrorPassword = () => password.length < 6;
    const hasErrorPasswordConfirm = () => passwordConfirm !== password;

    const USERS = firestore().collection("USERS");

    const handleCreateAccount = () => {
        // Check if username already exists
        USERS.where("username", "==", username)
            .get()
            .then((querySnapshot) => {
                if (!querySnapshot.empty) {
                    Alert.alert("Tài khoản đã tồn tại", "Username này đã được đăng ký. Vui lòng sử dụng username khác.");
                } else {
                    // Create new account with email (using username as email)
                    const email = `${username}@example.com`; // Using a dummy email domain
                    auth()
                        .createUserWithEmailAndPassword(email, password)
                        .then(response => {
                            USERS.doc(username).set({
                                username,
                                password,
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
                console.error("Lỗi khi kiểm tra username:", error.message);
                Alert.alert("Lỗi", "Đã xảy ra lỗi khi kiểm tra username.");
            });
    };

    return (
        <View style={{ flex: 1, padding: 10 }}>
            <Text
                style={{
                    fontSize: 30,
                    fontWeight: "bold",
                    alignSelf: "center",
                    color: "pink",
                    marginTop: 50,
                    marginBottom: 50,
                }}
            >
                Register New Account
            </Text>
            <TextInput
                label="Username"
                value={username}
                onChangeText={setUsername}
            />
            <HelperText type="error" visible={hasErrorUsername()}>
                Username không được phép để trống
            </HelperText>
            <TextInput
                label="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={hiddenPassword}
                right={
                    <TextInput.Icon
                        icon="eye"
                        onPress={() => setHiddenPassword(!hiddenPassword)}
                    />
                }
            />
            <HelperText type="error" visible={hasErrorPassword()}>
                Password ít nhất 6 kí tự
            </HelperText>
            <TextInput
                label="Confirm Password"
                value={passwordConfirm}
                onChangeText={setPasswordConfirm}
                secureTextEntry={hiddenPasswordConfirm}
                right={
                    <TextInput.Icon
                        icon="eye"
                        onPress={() => setHiddenPasswordConfirm(!hiddenPasswordConfirm)}
                    />
                }
            />
            <HelperText type="error" visible={hasErrorPasswordConfirm()}>
                Confirm Password phải so khớp với password
            </HelperText>
            <Button mode="contained" onPress={handleCreateAccount} style={{ marginTop: 20 }}>
                Create New Account
            </Button>
            <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", marginTop: 20 }}>
                <Text>Do you have an account ?</Text>
                <Button onPress={() => navigation.navigate("Login")}>
                    Login Account
                </Button>
            </View>
        </View>
    );
};

export default Register;
