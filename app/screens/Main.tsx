import React from "react";
import { StyleSheet, Alert, View, Text, FlatList, Image, TouchableHighlight, Button, ImageBackground } from "react-native";
import SessionNavbar from './security/SessionNavbar';
import { ServiceConfig } from '../config/service-config';

const bgImg = require("../../assets/bg/bg2.jpg");

export default class Main extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            publications: [],
            url: `${ServiceConfig.BASE_URL}publication`
        };
    }

    componentDidMount = () => {
        this.getPublication();
    };

    getPublication = () => {
        this.setState({ loading: true });
        fetch(this.state.url)
            .then((data) => data.json())
            .then((data) => {
                this.setState({
                    publications: data,
                    loading: false
                });
            })
            .catch((err) => {
                Alert.alert("Error", "Error al cargar las publicaciones");
            });
    };

    render() {
        const { navigation } = this.props;
        if (this.state.loading) {
            return (
                <View style={styles.dataViewLoading}>
                    <Text>Cargando publicaciones..</Text>
                </View>
            );
        } else {
            return (
                <ImageBackground source={bgImg} style={styles.backgroundApp}>
                    <View style={styles.publicationsView}>
                        <FlatList showsVerticalScrollIndicator={false} style={styles.flatList} data={this.state.publications}
                            renderItem={({ item }) => (
                                <View style={styles.publicationViewContent}>

                                    <Text style={styles.publicationTitle} onPress={() => this.props.navigation.navigate("Profile", { id: item.userId })}> {item.title} </Text>
                                    <TouchableHighlight
                                        onPress={() => {
                                            Alert.alert("Descripción", item.content);
                                        }}>
                                        <Image source={{
                                            width: 200,
                                            height: 150,
                                            uri: `${ServiceConfig.BASE_URL}files/publication/${item.id}`
                                        }}
                                        ></Image>
                                    </TouchableHighlight>
                                    <Text>{item.location}</Text>
                                </View>
                            )}
                        ></FlatList>
                        <SessionNavbar navigation={navigation}></SessionNavbar>
                    </View>
                </ImageBackground>
            );
        }
    }
}

const styles = StyleSheet.create({
    backgroundApp: {
        flex: 1,
        width: "100%",
    },
    publicationViewContent: {
        backgroundColor: "gray",
        borderColor: "gray",
        borderWidth: 2,
        borderRadius: 5,
        margin: 5,
        marginTop: 32,
        alignItems: "center",
        justifyContent: "center"
    },
    publicationTitle: {
        fontSize: 18,
        color: "#ff0000"
    },
    publicationsView: {
        alignItems: "center",
        alignContent: "center",
        flex: 1
    },
    dataViewLoading: {
        alignItems: "center",
        alignContent: "center",
        flex: 1
    },
    flatList: {
        alignContent: "center",
        textAlign: "center",
        alignSelf: "center",
        marginBottom: 70
    }
});