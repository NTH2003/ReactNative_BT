import { View, StyleSheet } from "react-native"
import { Button, Text, TextInput } from "react-native-paper"
import { login, useMyContextController } from "../store"
import { useEffect, useState } from "react"

const Login = ({ navigation }) => {
    const [controller, dispatch] = useMyContextController()
    const { userLogin } = controller
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [hiddenPassword, setHiddenPassword] = useState(true)

    const handleLogin = () => {
        login(dispatch, email, password)
    }

    useEffect(() => {
        console.log(userLogin)
        if (userLogin != null) {
            if (userLogin.role === "admin") {
                navigation.navigate("Admin")
            } else if (userLogin.role === "customer") {
                navigation.navigate("Customers")
            }
        }
    }, [userLogin])

    return (
        <View style={styles.container}>
        <Text style={styles.title}>Login</Text>

        <TextInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            mode="outlined"
            outlineColor="#e0e0e0"
            activeOutlineColor="#f5586c"
            theme={{ colors: { primary: "#f5586c" } }}
        />

        <TextInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={hiddenPassword}
            style={styles.input}
            mode="outlined"
            outlineColor="#e0e0e0"
            activeOutlineColor="#f5586c"
            theme={{ colors: { primary: "#f5586c" } }}
            right={
            <TextInput.Icon
                icon={hiddenPassword ? "eye" : "eye-off"}
                onPress={() => setHiddenPassword(!hiddenPassword)}
                color="#888"
            />
            }
        />

        <Button mode="contained" style={styles.loginButton} labelStyle={styles.loginButtonText} onPress={handleLogin}>
            Login
        </Button>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#f5f5f5",
        justifyContent: "flex-start",
        paddingTop: 100,
    },
    title: {
        fontSize: 36,
        fontWeight: "bold",
        textAlign: "center",
        color: "#f5586c",
        marginBottom: 40,
    },
    input: {
        marginBottom: 15,
        backgroundColor: "white",
    },
    loginButton: {
        marginTop: 10,
        backgroundColor: "#f5586c",
        borderRadius: 8,
        height: 50,
        justifyContent: "center",
    },
    loginButtonText: {
        fontSize: 16,
        fontWeight: "bold",
    },
})

export default Login
