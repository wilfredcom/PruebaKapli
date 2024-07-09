import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, TextInput, Button, Text } from 'react-native';
import { login, logout } from '../redux/slices/auth';
import { RootState,AppDispatch } from '../redux/store';

const LoginForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user, isAuthenticated, error } = useSelector((state: RootState) => state.auth);
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    dispatch(login({ identifier, password }));
  };

  const handleLogout = () => {
    dispatch(logout());
    }

  return (
    <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        
    }}>
      {!isAuthenticated ? (
        <>
          <TextInput
            placeholder="Username or Email"
            value={identifier}
            onChangeText={setIdentifier}
            autoCapitalize="none"
          />
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <Button title="Login" onPress={handleLogin} />
        </>
      ) : (
        <View>
          <Text>Welcome, {user?.username}!</Text>
          <Button title="Logout" onPress={handleLogout} />
        </View>
      )}
      {error && <Text>Error: {error}</Text>}
    </View>
  );
};

export default LoginForm;