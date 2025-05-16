import { useState } from "react"
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView } from "react-native"
import { useMyContextController, login } from "../store/index"

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [controller, dispatch] = useMyContextController()

  const handleLogin = () => {
    if (!email || !password) {
      alert("Vui lòng điền đầy đủ thông tin")
      return
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      alert("Email không hợp lệ")
      return
    }

    login(dispatch, email, password, navigation)
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.title}>Restaurant App</Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          placeholderTextColor="#AAAAAA"
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
          placeholderTextColor="#AAAAAA"
        />

        <TouchableOpacity style={styles.forgotPasswordContainer} onPress={() => navigation.navigate("ForgotPassword")}>
          <Text style={styles.forgotPassword}>Forgot Password?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.signInButton} onPress={handleLogin}>
          <Text style={styles.signInButtonText}>Sign In</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.signUpButton} onPress={() => navigation.navigate("Register")}>
          <Text style={styles.signUpButtonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  form: {
    flex: 1,
    padding: 30,
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 50,
    textAlign: "center",
    color: "#D32F2F",
    fontFamily: "serif",
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
    padding: 15,
    marginBottom: 20,
    fontSize: 16,
    color: "#333333",
  },
  forgotPasswordContainer: {
    alignItems: "center",
    marginBottom: 30,
    marginTop: 10,
  },
  forgotPassword: {
    color: "#D4AF37",
    fontSize: 16,
  },
  signInButton: {
    backgroundColor: "#DDDDDD",
    padding: 15,
    borderRadius: 30,
    marginBottom: 20,
    height: 55,
    justifyContent: "center",
  },
  signInButtonText: {
    color: "#FFFFFF",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
  signUpButton: {
    backgroundColor: "#4169E1",
    padding: 15,
    borderRadius: 30,
    height: 55,
    justifyContent: "center",
  },
  signUpButtonText: {
    color: "#FFFFFF",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
})

export default Login
