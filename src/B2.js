import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  StatusBar,
  ImageBackground,
  SafeAreaView,
  Alert,
} from 'react-native';

const PokemonGoLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    Alert.alert('Thông tin đăng nhập', `Username: ${username}\nPassword: ${password}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <ImageBackground
        source={{ uri: 'https://example.com/image.png' }}
        style={styles.backgroundImage}
      >
        <View style={styles.logoContainer}>
          <Image
            source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Pok%C3%A9mon_GO_logo.svg/2560px-Pok%C3%A9mon_GO_logo.svg.png' }}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        <View style={styles.formContainer}>
          <View style={styles.registerContainer}>
            <Text style={styles.registerText}>REGISTER</Text>
          </View>
          
          <TextInput
            style={styles.input}
            placeholder="USERNAME"
            placeholderTextColor="#555"
            value={username}
            onChangeText={setUsername}
          />
          
          <TextInput
            style={styles.input}
            placeholder="PASSWORD"
            placeholderTextColor="#555"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          
          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>LOGIN</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: { flex: 1 },
  backgroundImage: {
    flex: 1,
    width: '100%',
    backgroundColor: '#4CAF50',
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 80,
    marginBottom: 20,
  },
  logo: {
    width: 250,
    height: 100,
  },
  formContainer: {
    backgroundColor: '#F9CF30',
    margin: 20,
    borderRadius: 5,
    padding: 20,
    paddingTop: 30,
  },
  registerContainer: {
    position: 'absolute',
    top: 5,
    right: 10,
  },
  registerText: {
    color: '#333',
    fontWeight: 'bold',
    fontSize: 12,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 3,
    height: 50,
    marginBottom: 15,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  loginButton: {
    backgroundColor: '#E57373',
    borderRadius: 3,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PokemonGoLogin;
