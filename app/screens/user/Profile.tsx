import React, { useReducer } from "react";
import { StyleSheet, Text, View, SafeAreaView, Image, ScrollView, Alert } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { FlatList, TouchableHighlight } from "react-native-gesture-handler";
import SessionNavbar from "../security/SessionNavbar";
import { ServiceConfig } from '../../config/service-config';


export default class Profile extends React.Component {

    userId: string;
    constructor(props) {
        super(props);

        this.userId = this.props.route.params.id;
        this.state = {
            loading: false,
            publications: [],
            email: "",
            user: "",
            cellphone: "",
            birthdate: "",
            gender: "",
            publicationUrl: `${ServiceConfig.BASE_URL}users/${this.userId}/publications`,
            userUrl: `${ServiceConfig.BASE_URL}user/${this.userId}`
        };
    }


    componentDidMount = () => {
        this.getUser();
        this.getPublication();
    };

    getUser = () => {
        this.setState({ loading: true });
        console.log(this.state.userUrl)
        fetch(this.state.userUrl)
            .then((data) => data.json())
            .then((data) => {
                this.setState({
                    email: data.email,
                    user: data.firstName + ' ' + data.secondName + ' ' + data.surname + ' ' + data.secondSurname,
                    cellphone: data.cellphone,
                    birthdate: data.birthdate,
                    gender: data.gender,
                    loading: false
                });
            })
            .catch((err) => {
                Alert.alert("Error", "Error al cargar las publicaciones");
            });
    };

    getPublication = () => {
        this.setState({ loading: true });
        fetch(this.state.publicationUrl)
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
                <SafeAreaView style={styles.container}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={styles.titleBar}>
                            <Ionicons name="md-more" size={24} color="#52575D"></Ionicons>
                        </View>

                        <View style={{ alignSelf: "center" }}>
                            <View style={styles.profileImage}>
                                <Image source={{ uri: `${ServiceConfig.BASE_URL}files/user/${this.userId}` }} style={styles.image} resizeMode="center"></Image>
                            </View>
                            <View style={styles.dm}>
                                <MaterialIcons name="chat" size={18} color="#DFD8C8"></MaterialIcons>
                            </View>
                            <View style={styles.active}></View>
                            <View style={styles.add}>
                                <Ionicons name="ios-add" size={48} color="#DFD8C8" style={{ marginTop: 6, marginLeft: 2 }}></Ionicons>
                            </View>
                        </View>

                        <View style={styles.infoContainer}>
                            <Text style={[styles.text, { fontWeight: "200", fontSize: 16 }]}>{this.state.user}</Text>
                            <Text style={[styles.text, { color: "#AEB5BC", fontSize: 14 }]}>{this.state.birthdate}</Text>
                            <Text style={[styles.text, { color: "#AEB5BC", fontSize: 14 }]}>{this.state.gender}</Text>
                        </View>

                        <View style={styles.statsContainer}>
                            <View style={styles.statsBox}>
                                <Text style={[styles.text, { fontSize: 10 }]}>{this.state.cellphone}</Text>
                                <Text style={[styles.text, styles.subText]}>Celular</Text>
                            </View>
                            <View style={[styles.statsBox, { borderColor: "#DFD8C8", borderLeftWidth: 1, borderRightWidth: 1 }]}>
                                <Text style={[styles.text, { fontSize: 10 }]}>{this.state.email}</Text>
                                <Text style={[styles.text, styles.subText]}>mail</Text>
                            </View>
                        </View>

                        <View style={{ marginTop: 32 }}>


                            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >

                                <View style={styles.mediaImageContainer}>

                                    <FlatList horizontal showsHorizontalScrollIndicator={false} style={styles.flatList} data={this.state.publications}
                                        renderItem={({ item }) => (
                                            <View style={styles.publicationViewContent}>
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
                                                <Text style={styles.publicationTitle}>{item.title}</Text>
                                            </View>
                                        )}
                                    ></FlatList>
                                </View>
                            </ScrollView>
                        </View>
                        <View style={{ alignItems: "center" }}>
                            <Text style={[styles.subText, styles.recent]}></Text>
                        </View>
                    </ScrollView>
                    <SessionNavbar navigation={navigation}></SessionNavbar>
                </SafeAreaView>

            );
        }
    }
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF"
    },
    text: {
        color: "#52575D"
    },
    image: {
        flex: 1,
        height: undefined,
        width: undefined
    },
    titleBar: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 24,
        marginHorizontal: 16
    },
    subText: {
        fontSize: 12,
        color: "#AEB5BC",
        textTransform: "uppercase",
        fontWeight: "500"
    },
    profileImage: {
        width: 150,
        height: 150,
        borderRadius: 100,
        overflow: "hidden"
    },
    dm: {
        backgroundColor: "#41444B",
        position: "absolute",
        top: 20,
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center"
    },
    active: {
        backgroundColor: "#34FFB9",
        position: "absolute",
        bottom: 28,
        left: 10,
        padding: 4,
        height: 20,
        width: 20,
        borderRadius: 10
    },
    add: {
        backgroundColor: "#41444B",
        position: "absolute",
        bottom: 0,
        right: 0,
        width: 60,
        height: 60,
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center"
    },
    infoContainer: {
        alignSelf: "center",
        alignItems: "center",
        marginTop: 16
    },
    statsContainer: {
        flexDirection: "row",
        alignSelf: "center",
        marginTop: 32
    },
    statsBox: {
        alignItems: "center",
        flex: 1
    },
    mediaImageContainer: {
        width: 350,
        height: 240,
        borderRadius: 12,
        overflow: "hidden",
        marginHorizontal: 10
    },
    mediaCount: {
        backgroundColor: "#41444B",
        position: "absolute",
        top: "50%",
        marginTop: -50,
        marginLeft: 30,
        width: 100,
        height: 100,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 12,
        shadowColor: "rgba(0, 0, 0, 0.38)",
        shadowOffset: { width: 0, height: 10 },
        shadowRadius: 20,
        shadowOpacity: 1
    },
    recent: {
        marginLeft: 22,
        marginTop: 90,
        marginBottom: 6,
        fontSize: 10
    },
    recentItem: {
        flexDirection: "row",
        alignItems: "flex-start",
        marginBottom: 16
    },
    activityIndicator: {
        backgroundColor: "#CABFAB",
        padding: 4,
        height: 12,
        width: 12,
        borderRadius: 6,
        marginTop: 3,
        marginRight: 20
    },
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