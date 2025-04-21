"use client"

import { useState } from "react"
import {
  Image,
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native"
import { HelperText, Text, TextInput, Button } from "react-native-paper"

const Login = () => {
  const [email, setEmail] = useState("2124802010269@student.tdmu.edu.vn")
  const [password, setPassword] = useState("123")
  const [showPassword, setShowPassword] = useState(false)

  // Kiểm tra định dạng email hợp lệ
  const checkEmail = () => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return !regex.test(email)
  }

  // Kiểm tra độ mạnh password
  const checkPassword = () => {
    const regularExpression = /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{6,16}$/
    return !regularExpression.test(password)
  }

  const emailError = checkEmail()
  const passwordError = checkPassword()

  const handleLogin = () => {
    if (!emailError && !passwordError) {
      console.log("Login with", email, password)
      // TODO: gọi API đăng nhập hoặc điều hướng
    }
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
        <View style={styles.logoContainer}>
          <Image source={require("../images/logo.png")} style={styles.logo} resizeMode="contain" />
        </View>

        <Text style={styles.welcomeText}>Welcome back!</Text>

        <View style={styles.inputContainer}>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Enter email"
            left={<TextInput.Icon icon="email" />}
            style={styles.input}
            mode="outlined"
            outlineColor="#ddd"
            activeOutlineColor="#FF8C00"
          />
          {emailError && (
            <HelperText type="error" visible={emailError} style={styles.errorText}>
              Email không hợp lệ
            </HelperText>
          )}
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            placeholder="Enter password"
            left={<TextInput.Icon icon="key" />}
            right={
              <TextInput.Icon
                icon={showPassword ? "eye-off" : "eye"}
                onPress={() => setShowPassword(!showPassword)}
              />
            }
            style={styles.input}
            mode="outlined"
            outlineColor="#ddd"
            activeOutlineColor="#FF8C00"
          />
          {passwordError && (
            <HelperText type="error" visible={passwordError} style={styles.errorText}>
              Password 6-16 ký tự, gồm chữ cái, số và ký tự đặc biệt
            </HelperText>
          )}
        </View>

        <Button
          mode="contained"
          onPress={handleLogin}
          disabled={emailError || passwordError}
          style={styles.loginButton}
          contentStyle={styles.loginButtonContent}
          labelStyle={styles.loginButtonText}
        >
          Login
        </Button>

        <TouchableOpacity style={styles.createAccountButton}>
          <Text style={styles.createAccountText}>Create a new account</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.forgotPasswordButton}>
          <Text style={styles.forgotPasswordText}>Forgot Password</Text>
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Free Premium Starter Pack: Based on Premium Functions
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default Login

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 20,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  logo: {
    height: 100,
    width: 100,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
    color: "#333",
  },
  inputContainer: {
    width: "100%",
    marginBottom: 15,
  },
  input: {
    width: "100%",
    backgroundColor: "#f9f9f9",
  },
  errorText: {
    color: "#FF6347",
    fontSize: 12,
    marginTop: 2,
    marginLeft: 5,
  },
  loginButton: {
    width: "100%",
    marginTop: 10,
    marginBottom: 15,
    backgroundColor: "#FF8C00",
    borderRadius: 8,
  },
  loginButtonContent: {
    height: 50,
  },
  loginButtonText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  createAccountButton: {
    marginBottom: 10,
  },
  createAccountText: {
    color: "#FF8C00",
    fontSize: 16,
  },
  forgotPasswordButton: {
    marginBottom: 30,
  },
  forgotPasswordText: {
    color: "#3498db",
    fontSize: 16,
  },
  footer: {
    position: "absolute",
    bottom: 30,
    width: "100%",
    alignItems: "center",
  },
  footerText: {
    color: "#FF8C00",
    fontSize: 12,
    textAlign: "center",
  },
})
