import React from 'react';
import { StyleSheet, Alert, Text, Button, AsyncStorage } from "react-native";

export default class SessionNavbar extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        isLoggedIn: false,
        name: ""
    };

    async componentDidMount() {
        let session = await AsyncStorage.getItem("session");

        if (session) {
            this.setState({
                isLoggedIn: true,
                name: JSON.parse(session).data.username
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
            return <Text onPress={this.signOut}>Session activa {this.state.name}</Text>
        } else {
            return (
                <Button
                    title="Iniciar Sección"
                    onPress={() => this.props.navigation.navigate("Login")}
                />
            );
        }
    }
}

