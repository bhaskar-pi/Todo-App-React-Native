import React from "react";
import { View, Image, Text, StyleSheet, ScrollView } from "react-native";
import { colors } from "../styles/colors";
import {CustomButton} from "../components/CustomButton";
import Footer from "../components/Footer";

export default Home = ({navigation}) => {
    return(
        <>
        <ScrollView style={styles.view}>
            <View style={styles.homeContainer}>
                <Image style={styles.image} source={require('../assets/images/task.png')} />
                <View style={styles.textContainer}>
                    <Text style={styles.heading}>Task Manager</Text>
                    <Text style={styles.description}> Boost your productivity with our comprehensive task management tool. 
                            Organize your projects, set priorities, and keep track of your progress effortlessly. 
                            Start now to experience a new level of efficiency and convenience.</Text>
                    <CustomButton title="Let's Start" onPress={() => navigation.navigate('create-new')} />
                </View>
            </View>
        </ScrollView>
        <Footer navigation={navigation} />
        </>
    )
}

const styles = StyleSheet.create({
    view: {
        paddingHorizontal: 10,
    },
    image: {
        marginTop: 60,
        width: 350,
        height: 350,
        display: "flex",
        alignSelf: "center",
    },
    heading : {
        fontSize: 36,
        fontWeight: "bold",
        fontFamily:"Roboto",
        color: colors.dark,
        marginVertical: 15,
        textAlign: 'center',
    },
    description: {
        fontSize: 25,
        fontWeight: "300",
        fontFamily:"Roboto",
        color: colors.dark,
        textAlign: 'center',
    },
    homeContainer: {
        alignItems: 'center',
        justifyContent: 'space-between',
        flex: 1,
    },
    description: {
        textAlign: 'center',
        marginBottom: 20,
    },
    textContainer: {
        flex: 1,
        alignItems: 'center',
        marginTop: 20,
    } 
})