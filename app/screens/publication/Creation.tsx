import React from 'react';
import { StyleSheet, Alert, Text, View, Image, TouchableOpacity, TextInput, ImageBackground, SafeAreaView, AsyncStorage } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

import { ServiceConfig } from '../../config/service-config';


const bgImg = require("../../../assets/bg/bg2.jpg");

export default class Creation extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        content: "",
        location: "",
        filename: "",
        pathImage: "",
        title: "",
        date: "",
        userId: "",
        url: `${ServiceConfig.BASE_URL}publication`,
        urlImg: `${ServiceConfig.BASE_URL}publicationImg`
    };

    selectPicture = async () => {
        await Permissions.askAsync(Permissions.CAMERA_ROLL);
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1
            });
            if (!result.cancelled) {
                var fileName = result.uri.split("/").pop();
                var pathImage = new File([result.uri], result.uri, { type: "image/png" })
                this.setState({ filename: fileName ,pathImage: pathImage});
            }
        } catch (E) {
            console.log(E);
        }
    };

    takePicture = async () => {
        await Permissions.askAsync(Permissions.CAMERA);
        const { cancelled, uri } = await ImagePicker.launchCameraAsync({
            allowsEditing: false,
        });
        this.setState({ pathImage: uri });
        console.log(uri)
    };

    async onLogin() {
        const formData = new FormData();
        formData.append('file', this.state.pathImage);
        formData.append('filename', this.state.filename);
        fetch(this.state.urlImg, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-type": "multipart/form-data",
            },
            body: formData
        })
            .then((datos) => datos.json())
            .then((datos) => {
                console.log(datos, 'ee')
                if (datos.error) {
                    Alert.alert("VIVIENDA COMPARTIDA", "No se subió la imagen");
                } else {

                }
            })

            .catch((err) => {
                Alert.alert("VIVIENDA COMPARTIDA", "No se subió la imagen");
            });

        const c = this.state.content;
        const u = this.state.location;
        const t = this.state.title;
        const d = new Date().toISOString().substr(0, 10);
        const ui = this.props.route.params.id;
        fetch(this.state.url, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                content: c,
                location: u,
                pathImage: "notfound.png",
                title: t,
                date: d,
                userId: ui
            }),
        })
            .then((data) => data.json())
            .then((data) => {
                console.log(data, 'oo')
                if (data.error) {
                    Alert.alert("VIVIENDA COMPARTIDA", "Datos invalidos");
                } else {
                    Alert.alert("VIVIENDA COMPARTIDA", "Publicación creada")
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
                    <Text style={styles.titleText}>Crear</Text>
                    <TextInput
                        value={this.state.title}
                        keyboardType="default"
                        onChangeText={(title) => this.setState({ title })}
                        placeholder="Título"
                        placeholderTextColor="gray"
                        style={styles.input}
                    />
                    <TextInput
                        value={this.state.content}
                        keyboardType="default"
                        onChangeText={(content) => this.setState({ content })}
                        placeholder="Descripción"
                        placeholderTextColor="gray"
                        style={styles.input}
                    />
                    <TextInput
                        value={this.state.location}
                        keyboardType="default"
                        onChangeText={(location) => this.setState({ location })}
                        placeholder="Ubicación"
                        placeholderTextColor="gray"
                        style={styles.input}
                    />

                    <View style={styles.container2}>
                        <Image style={styles.image} source={{ uri: this.state.pathImage }} />
                        <View style={styles.row}>
                            <Button onPress={this.selectPicture}>Galeria</Button>
                            <Button onPress={this.takePicture}>Camara</Button>
                        </View>
                    </View>

                    <TouchableOpacity
                        style={styles.button}
                        onPress={this.onLogin.bind(this)}
                    >
                        <Text style={styles.buttonText}> Crear </Text>
                    </TouchableOpacity>



                </SafeAreaView>
            </ImageBackground>
        );
    }
}


const Button = ({ onPress, children }) => (
    <TouchableOpacity style={styles.button2} onPress={onPress}>
        <Text style={styles.text2}>{children}</Text>
    </TouchableOpacity>
);

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

    text2: {
        fontSize: 10,
    },
    row: { flexDirection: 'row' },
    image: { width: 100, height: 100, backgroundColor: 'gray' },
    button2: {
        padding: 13,
        margin: 15,
        backgroundColor: '#dddddd',
    },
    container2: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

