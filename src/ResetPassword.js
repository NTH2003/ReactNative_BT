// ResetPassword.tsx
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

const ResetPassword = () => {
  const [email, setEmail] = useState("")

  const checkEmail = () => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return !regex.test(email)
  }

  const handleReset = () => {
    if (!checkEmail()) {
      console.log("Send reset email to:", email)
      // TODO: Gửi email reset mật khẩu
    }
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>Reset your password</Text>

        <TextInput
          label="Enter email"
          value={email}
          onChangeText={setEmail}
          mode="outlined"
          style={styles.input}
          left={<TextInput.Icon icon="email" />}
        />
        <HelperText type="error" visible={checkEmail()}>
          Email không hợp lệ
        </HelperText>

        <Button
          mode="contained"
          onPress={handleReset}
          disabled={checkEmail()}
          style={styles.button}
        >
          Send Reset Email
        </Button>

        <TouchableOpacity>
          <Text style={styles.link}>Go back to Login</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default ResetPassword

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
    color: "#3498db",
    fontSize: 16,
    textAlign: "center",
  },
})
