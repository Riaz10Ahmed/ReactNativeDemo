import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }) => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('https://iconnect.nethradhama.in/auths', {
        login:userId,
        password:password,
      });
      console.log('Response:', response.data);
      await AsyncStorage.setItem('token', response.data.token);
      navigation.navigate('Home');
    } catch (err) {
      if (axios.isAxiosError(error)) {
        console.log('Axios Error:', error.message);
        console.log('Error Code:', error.code);
        console.log('Request Config:', error.config);
        if (error.response) {
          console.log('Response Data:', error.response.data);
          console.log('Response Status:', error.response.status);
          console.log('Response Headers:', error.response.headers);
        } else if (error.request) {
          console.log('Request Data:', error.request);
        } else {
          console.log('Error Message:', error.message);
        }
      } else {
        console.log('Non-Axios Error:', error);
      }
      setError('Login failed. Please check your credentials.');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="User Id"
        value={userId}
        onChangeText={setUserId}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  error: {
    color: 'red',
    marginBottom: 12,
  },
});

export default LoginScreen;