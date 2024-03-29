import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import HomeScreen from "./app/screens/Main";
import LoginScreen from "./app/screens/security/Login";
import RegisterScreen from "./app/screens/security/Register";
import ProfileScreen from "./app/screens/user/Profile";
import CreationScreen from "./app/screens/publication/Creation";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="INICIO">
        <Stack.Screen name="INICIO" component={HomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name = "Profile" component = {ProfileScreen} />
        <Stack.Screen name = "Creation" component = {CreationScreen} />
      </Stack.Navigator>
      
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
