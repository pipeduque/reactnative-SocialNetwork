import React from 'react';
import { StyleSheet, Alert, Text, TouchableOpacity, TextInput, ImageBackground, SafeAreaView, ScrollView } from "react-native";

import * as Crypto from 'expo-crypto';

const bgImg = require("../../../assets/bg/bg.png");

export default class Register extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        email: "",
        password: "",
        firstName: "",
        secondName: "",
        surname: "",
        secondSurname: "",
        cellphone: "",
        birthdate: "",
        gender: "",
        url: "http://192.168.1.13:3000/user",
    };

    async onLogin() {
        const e = this.state.email;
        const p = await Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA512, this.state.password);
        const fn = this.state.firstName;
        const sn = this.state.secondName;
        const s = this.state.surname;
        const ss = this.state.secondSurname;
        const c = this.state.cellphone;
        const b = this.state.birthdate;
        const g = this.state.gender;
        fetch(this.state.url, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                email: e,
                password: p,
                firstName: fn,
                secondName: sn,
                surname: s,
                secondSurname: ss,
                cellphone: c,
                birthdate: b,
                gender: g
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
                    this.props.navigation.push("Login");
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
                <ScrollView>
                    <SafeAreaView style={styles.container}>
                        <Text style={styles.titleText}>Registrate</Text>
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
                        <TextInput
                            value={this.state.firstName}
                            keyboardType="default"
                            onChangeText={(firstName) => this.setState({ firstName })}
                            placeholder="Primer nombre*"
                            placeholderTextColor="gray"
                            style={styles.input}
                        />
                        <TextInput
                            value={this.state.secondName}
                            keyboardType="default"
                            onChangeText={(secondName) => this.setState({ secondName })}
                            placeholder="Segundo nombre"
                            placeholderTextColor="gray"
                            style={styles.input}
                        />
                        <TextInput
                            value={this.state.surname}
                            keyboardType="default"
                            onChangeText={(surname) => this.setState({ surname })}
                            placeholder="Primer apellido*"
                            placeholderTextColor="gray"
                            style={styles.input}
                        />
                        <TextInput
                            value={this.state.secondSurname}
                            keyboardType="default"
                            onChangeText={(secondSurname) => this.setState({ secondSurname })}
                            placeholder="Segundo apellido*"
                            placeholderTextColor="gray"
                            style={styles.input}
                        />
                        <TextInput
                            value={this.state.cellphone}
                            keyboardType="default"
                            onChangeText={(cellphone) => this.setState({ cellphone })}
                            placeholder="Celular*"
                            placeholderTextColor="gray"
                            style={styles.input}
                        />
                        <TextInput
                            value={this.state.birthdate}
                            keyboardType="default"
                            onChangeText={(birthdate) => this.setState({ birthdate })}
                            placeholder="Fecha de nacimiento*"
                            placeholderTextColor="gray"
                            style={styles.input}
                        />
                        <TextInput
                            value={this.state.gender}
                            keyboardType="default"
                            onChangeText={(gender) => this.setState({ gender })}
                            placeholder="Genero*"
                            placeholderTextColor="gray"
                            style={styles.input}
                        />
                        <TouchableOpacity
                            style={styles.button}
                            onPress={this.onLogin.bind(this)}
                        >
                            <Text style={styles.buttonText}> Registrarte </Text>
                        </TouchableOpacity>
                    </SafeAreaView>
                </ScrollView>
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
    }
});