import React from "react";
import { StyleSheet, Alert, View, Text, FlatList, Image, TouchableHighlight } from "react-native";
import SessionNavbar from './security/SessionNavbar';

export default class Main extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            publications: [],
            url: 'http://192.168.1.13:3000/publication'
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
                <View style={styles.publicationsView}>
                    <SessionNavbar navigation={navigation}></SessionNavbar>
                    <Text>Publicaciones</Text>
                    <FlatList style={styles.flatList} data={this.state.publications}
                        renderItem={({ item }) => (
                            <View style={styles.publicationViewContent}>
                                <TouchableHighlight
                                    onPress={() => {
                                        Alert.alert("Imagen tocada", `Publicación: ${item.title}`);
                                    }}>
                                    <Image source={{
                                        width: 200,
                                        height: 150,
                                        uri: `http://192.168.1.13:3000/files/publication/${item.id}`
                                    }}
                                    ></Image>
                                </TouchableHighlight>
                                <Text style={styles.publicationTitle}>{item.title}</Text>
                                <Text numberOfLines={1}>{item.content}</Text>
                                <Text> Usuario: {item.userId}</Text>
                            </View>
                        )}
                    ></FlatList>
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    publicationViewContent: {
        borderColor: "gray",
        borderWidth: 2,
        borderRadius: 5,
        margin: 5,
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
        alignSelf: "center"
    }
});