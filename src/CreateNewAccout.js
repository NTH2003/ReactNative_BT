"use client"

import React, { useState } from "react"
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
} from "react-native"
import { Text, TextInput, Button, HelperText } from "react-native-paper"

const CreateNewAccount = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const checkEmail = () => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return !regex.test(email)
  }

  const checkPassword = () => {
    return password.length < 6
  }

  const checkConfirmPassword = () => {
    return password !== confirmPassword
  }

  const handleSignup = () => {
    if (!checkEmail() && !checkPassword() && !checkConfirmPassword()) {
      console.log("Create account with", email, password)
      // TODO: Gửi yêu cầu tạo tài khoản
    }
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>Create a new account!</Text>

        <TextInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          mode="outlined"
          style={styles.input}
          left={<TextInput.Icon icon="email" />}
        />
        <HelperText type="error" visible={checkEmail()}>
          Email không hợp lệ
        </HelperText>

        <TextInput
          label="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
          mode="outlined"
          style={styles.input}
          left={<TextInput.Icon icon="lock" />}
          right={
            <TextInput.Icon
              icon={showPassword ? "eye-off" : "eye"}
              onPress={() => setShowPassword(!showPassword)}
            />
          }
        />
        <HelperText type="error" visible={checkPassword()}>
          Mật khẩu phải có ít nhất 6 ký tự
        </HelperText>

        <TextInput
          label="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry={!showConfirmPassword}
          mode="outlined"
          style={styles.input}
          left={<TextInput.Icon icon="lock-check" />}
          right={
            <TextInput.Icon
              icon={showConfirmPassword ? "eye-off" : "eye"}
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
            />
          }
        />
        <HelperText type="error" visible={checkConfirmPassword()}>
          Mật khẩu không khớp
        </HelperText>

        <Button
          mode="contained"
          onPress={handleSignup}
          disabled={checkEmail() || checkPassword() || checkConfirmPassword()}
          style={styles.button}
        >
          Signup
        </Button>

        <TouchableOpacity>
          <Text style={styles.link}>Already have an account?</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default CreateNewAccount

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  scrollContainer: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 30,
  },
  input: {
    width: "100%",
    marginBottom: 10,
    backgroundColor: "#f9f9f9",
  },
  button: {
    width: "100%",
    marginVertical: 15,
    backgroundColor: "#FF8C00",
  },
  link: {
    color: "#FF8C00",
    fontSize: 16,
    textAlign: "center",
  },
})
