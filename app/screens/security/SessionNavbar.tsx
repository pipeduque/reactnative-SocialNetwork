import React from 'react';
import { Alert, Text, AsyncStorage, View, Image, TouchableOpacity } from "react-native";


const aggImg = require("../../../assets/icons/agg.png");
const userImg = require("../../../assets/icons/user.png");
const homeImg = require("../../../assets/icons/home.png");
const logoutImg = require("../../../assets/icons/logout.png");

export default class SessionNavbar extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        isLoggedIn: false,
        id: "",
        name: ""
    };

    async componentDidMount() {
        let session = await AsyncStorage.getItem("session");

        if (session) {
            this.setState({
                isLoggedIn: true,
                id: JSON.parse(session).data.id,
                name: JSON.parse(session).data.firstName
            });
        }
    }

    signOut = () => {
        Alert.alert("Desconectar", "Te vas?", [
            {
                text: "Sí",
                onPress: () => {
                    AsyncStorage.removeItem("session");
                    this.setState({
                        isLoggedIn: false,
                        id: "",
                        name: ""
                    });
                }
            },
            {
                text: "No"
            }
        ]);
    };

    render() {
        if (this.state.isLoggedIn) {
            return <View style={{

                position: 'absolute',
                backgroundColor: 'grey',
                border: 2,
                radius: 3,
                shadowOpacity: 0.3,
                shadowRadius: 3,
                shadowOffset: {

                    height: 3, width: 3
                },
                x: 0,
                y: 0,
                style: { marginVertical: 5 },
                bottom: 0,
                width: '100%',
                height: 70,
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingVertical: 10,
                paddingHorizontal: 25
            }}>
                <View style={{
                    flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
                }}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate("INICIO")}>
                        <Image
                            style={{ width: 30, height: 30 }}
                            source={homeImg}
                        />
                    </TouchableOpacity>
                    <Text style={{ justifyContent: 'center', alignItems: 'center' }}>Inicio</Text>
                </View>

                <View style={{
                    flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
                }}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate("Profile")}>
                        <Image
                            style={{ width: 30, height: 30 }}
                            source={aggImg}
                        />
                    </TouchableOpacity>
                    <Text style={{ justifyContent: 'center', alignItems: 'center' }}>Publicar</Text>
                </View>
                <View style={{
                    flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
                }}>
                    <TouchableOpacity onPress={() => this.props.navigation.push("Profile", { id: this.state.id })}>
                        <Image
                            style={{ width: 30, height: 30 }}
                            source={userImg}
                        />
                    </TouchableOpacity>
                    <Text style={{ justifyContent: 'center', alignItems: 'center' }}>Perfil</Text>
                </View>



                <View style={{
                    flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end',

                }}>
                    <TouchableOpacity
                        onPress={this.signOut}>
                        <Image
                            source={logoutImg}

                            style={{ marginHorizontal: 16, width: 30, height: 30 }}
                        />
                    </TouchableOpacity>
                    <Text style={{ justifyContent: 'center', alignItems: 'center' }}>Cerrar Sección </Text>
                </View>
            </View>
        } else {
            return (

                <View style={{

                    position: 'absolute',
                    backgroundColor: 'grey',
                    border: 2,
                    radius: 3,
                    shadowOpacity: 0.3,
                    shadowRadius: 3,
                    shadowOffset: {

                        height: 3, width: 3
                    },
                    x: 0,
                    y: 0,
                    style: { marginVertical: 5 },
                    bottom: 0,
                    width: '100%',
                    height: 70,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingVertical: 10,
                    paddingHorizontal: 25
                }}>
                    <View style={{
                        flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
                    }}>
                        <TouchableOpacity onPress={() => this.props.navigation.push("INICIO")}>
                            <Image
                                style={{ width: 30, height: 30 }}
                                source={homeImg}
                            />
                        </TouchableOpacity>
                        <Text style={{ justifyContent: 'center', alignItems: 'center' }}>Inicio</Text>
                    </View>

                    <View style={{
                        flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end',

                    }}>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate("Login")}>
                            <Image
                                source={userImg}
                                style={{ marginHorizontal: 16, width: 30, height: 30 }}
                            /></TouchableOpacity>
                        <Text style={{ justifyContent: 'center', alignItems: 'center' }}>Iniciar Sección </Text>

                    </View>
                </View>
            )
        }
    }
}

