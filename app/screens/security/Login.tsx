import React from 'react';
import { StyleSheet, Alert, Text, TouchableOpacity, TextInput, ImageBackground, SafeAreaView, AsyncStorage } from "react-native";

export default class Login extends React.Component {
    constructor(props) {
        super(props); 
    }

    state = {
        username: "",
        password: "",
        url: "http://192.168.1.13:3000/login"
    };

    async onLogin() {
        const u = this.state.username;
    }
}