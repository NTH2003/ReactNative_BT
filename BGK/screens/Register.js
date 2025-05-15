import { useState } from "react"
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView } from "react-native"
import { createAccount } from "../store/index"
import Icon from 'react-native-vector-icons/Feather'
import Feather from 'react-native-vector-icons/Feather'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'

const Register = ({ navigation }) => {
    const [email, setEmail] = useState('')
    const [fullName, setFullName] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const handleRegister = () => {
        if (!email || !fullName || !password || !confirmPassword) {
            alert('Vui lòng điền đầy đủ thông tin')
            return
        }

        if (password !== confirmPassword) {
            alert('Mật khẩu xác nhận không khớp')
            return
        }

        if (password.length < 6) {
            alert('Mật khẩu phải có ít nhất 6 ký tự')
            return
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) {
            alert('Email không hợp lệ')
            return
        }

        createAccount(email, password, fullName, navigation)
    }

    const createAdminAccount = async () => {
        const email = 'admin@gmail.com'
        const password = '123456'
        const fullName = 'Admin'

        try {
            // Tạo tài khoản trên Authentication
            await auth().createUserWithEmailAndPassword(email, password)
            // Thêm thông tin vào Firestore
            await firestore().collection('USERS').doc(email).set({
                email,
                fullName,
                role: 'admin',
                createdAt: firestore.FieldValue.serverTimestamp(),
            })
            console.log('Tạo tài khoản admin thành công!')
        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                // Nếu đã tồn tại, chỉ cập nhật role trên Firestore
                await firestore().collection('USERS').doc(email).set({
                    email,
                    fullName,
                    role: 'admin',
                    createdAt: firestore.FieldValue.serverTimestamp(),
                })
                console.log('Tài khoản admin đã tồn tại, cập nhật role thành admin!')
            } else {
                console.error(error)
            }
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.form}>
                <Text style={styles.title}>Sign Up</Text>
                
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    placeholderTextColor="#CCCCCC"
                />

                <TextInput
                    style={styles.input}
                    placeholder="Họ và tên"
                    value={fullName}
                    onChangeText={setFullName}
                    placeholderTextColor="#CCCCCC"
                />

                <View style={styles.passwordContainer}>
                    <TextInput
                        style={[styles.input, styles.passwordInput]}
                        placeholder="Mật khẩu"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={!showPassword}
                        placeholderTextColor="#CCCCCC"
                    />
                    <TouchableOpacity 
                        style={styles.showButton}
                        onPress={() => setShowPassword(!showPassword)}
                    >
                        <Feather name={showPassword ? 'eye-off' : 'eye'} size={22} color="#007AFF" />
                    </TouchableOpacity>
                </View>

                <View style={styles.passwordContainer}>
                    <TextInput
                        style={[styles.input, styles.passwordInput]}
                        placeholder="Xác nhận mật khẩu"
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        secureTextEntry={!showConfirmPassword}
                        placeholderTextColor="#CCCCCC"
                    />
                    <TouchableOpacity 
                        style={styles.showButton}
                        onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                        <Feather name={showConfirmPassword ? 'eye-off' : 'eye'} size={22} color="#007AFF" />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.button} onPress={handleRegister}>
                    <Text style={styles.buttonText}>Sign Up</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    form: {
        flex: 1,
        paddingHorizontal: 30,
        paddingTop: 20,
        justifyContent: 'center',
        marginTop: -40,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 40,
        textAlign: 'center',
        color: '#C41E3A',
        fontFamily: 'serif',
    },
    input: {
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
        padding: 12,
        marginBottom: 20,
        fontSize: 16,
        color: '#333333',
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
        marginBottom: 20,
    },
    passwordInput: {
        flex: 1,
        borderBottomWidth: 0,
        marginBottom: 0,
        padding: 12,
    },
    showButton: {
        padding: 12,
    },
    button: {
        backgroundColor: '#DDDDDD',
        padding: 15,
        borderRadius: 30,
        marginTop: 10,
        marginBottom: 15,
        height: 55,
        justifyContent: 'center',
    },
    buttonText: {
        color: '#FFFFFF',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16,
    },
    link: {
        color: '#007AFF',
        textAlign: 'center',
    },
})

export default Register
