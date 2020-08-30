import React from 'react';
import { StyleSheet, Alert, Text, TouchableOpacity, TextInput, ImageBackground, SafeAreaView, AsyncStorage } from "react-native";

import * as Crypto from 'expo-crypto';
import { ServiceConfig } from '../../config/service-config';


const bgImg = require("../../../assets/bg/bg.png");

export default class Login extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    email: "",
    password: "",
    url: `${ServiceConfig.BASE_URL}login`
  };

  async onLogin() {
    const e = this.state.email;
    const p = await Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA512, this.state.password);
    fetch(this.state.url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        email: e,
        password: p,
      }),
    })
      .then((data) => data.json())
      .then((data) => {
        console.log(data)
        if (data.error) {
          Alert.alert("VIVIENDA COMPARTIDA", "Datos invalidos");
        } else {
          this.state.email = "";
          this.state.password = "";
          AsyncStorage.setItem("session", JSON.stringify(data));
          this.props.navigation.push("INICIO");
        }
      })

      .catch((err) => {
        Alert.alert("VIVIENDA COMPARTIDA", "Datos invalidos");
      });
  }


  render() {
    const { navigation } = this.props;
    return (
      <ImageBackground source={bgImg} style={styles.backgroundApp}>
        <SafeAreaView style={styles.container}>
          <Text style={styles.titleText}>Hola, Bienvenido</Text>
          <TextInput
            value={this.state.email}
            keyboardType="default"
            onChangeText={(email) => this.setState({ email })}
            placeholder="Correo electrónico"
            placeholderTextColor="gray"
            style={styles.input}
          />
          <TextInput
            value={this.state.password}
            onChangeText={(password) => this.setState({ password })}
            placeholder="Contraseña"
            secureTextEntry={true}
            placeholderTextColor="gray"
            style={styles.input}
          />

          <TouchableOpacity
            style={styles.button}
            onPress={this.onLogin.bind(this)}
          >
            <Text style={styles.buttonText}> Iniciar Sección </Text>
          </TouchableOpacity>
          <Text style={styles.text} onPress={() => this.props.navigation.push("Register")}>¿No tienes una cuenta?</Text>
          
        </SafeAreaView>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  backgroundApp: {
    flex: 1,
    width: "100%",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  titleText: {
    fontSize: 50,
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
  },
  text: {
    fontSize: 25,
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
  },
  button: {
    alignItems: "center",
    backgroundColor: "powderblue",
    width: 200,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 25,
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    width: 200,
    fontSize: 20,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: "white",
    backgroundColor: "#fff",
    marginVertical: 10,
  },
});