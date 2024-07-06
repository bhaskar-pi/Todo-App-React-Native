import React, { useCallback, useState } from "react";
import { ScrollView, Text, TextInput, View, StyleSheet} from "react-native";
import {CustomButton} from "../components/CustomButton";
import { loginApi, registerApi } from "../services/users.services";
import { storeToken } from "../components/utils";
import { colors } from "../styles/colors";
import { ActivityIndicator } from "react-native-paper";
import Toast from "react-native-toast-message";
import Footer from "../components/Footer";

export default RegisterOrLoginForm = ({navigation}) => {
    const [isRegister, setIsRegister] = useState(false);
    const [userData, setUserData] = useState({
        username: '',
        name: '',
        password: ''
    });
    const [loading, setLoading] = useState(false)

    let n;
    

    const _onChange = (value, prop) => {
        setUserData({...userData, [prop]: value})
    }

    const _openRegisterForm = useCallback(() => {
        setIsRegister(true);
    }, []);

    const _handleRegister = useCallback(async() => {
        const { username, password, name } = userData;
        console.log({userData})
        if (!username || !name || !password) {
            return Toast.show({
                type: 'success',
                text1: 'Registered successfully.',
                swipeable: true,
              });
        }

        try {
            setLoading(true)
            const response = await registerApi(userData)
            if (response.success){
                setIsRegister(false)
                Toast.show({
                    type: 'success',
                    text1: response.message,
                    swipeable: true,
                })
            }else {
                Toast.show({
                    type: 'error',
                    text1: response.message,
                    swipeable: true,
                })
            }
            
        } catch (error) {
            throw error;
        }finally{
            setLoading(false)
        }
        
    }, [userData]);

    const _handleLogin = useCallback(async() => {
        const { username, password } = userData;
        console.log({userData})
        if (!username || !password) {
            return Toast.show({
                type: 'info',
                text1: 'Missing login details.',
                swipeable: true,
            })
        }

        try {
            setLoading(true)
            const response = await loginApi({username, password})
            if (response.success){
                await storeToken(response.token)
                navigation.navigate('home')
                Toast.show({
                    type: 'success',
                    text1: 'Login successfull.',
                    swipeable: true,
                })
            }else {
                Toast.show({
                    type: 'error',
                    text1: 'Login failed.',
                    swipeable: true,
                })
            }
            
        } catch (error) {
            console.log(error)
        }finally{
            setLoading(false)
        }
        
    }, [userData]);


    const Login = () => (
        <>
         {
            loading ? (
                <View  style={[styles.tasksScreen, styles.loginscreen, {marginTop: 300}]}>
                    <ActivityIndicator size={'large'} color={colors.primaryD} />
                </View>
            ) : (
                <ScrollView style={[styles.tasksScreen, styles.loginscreen]}>
            <View style={styles.loginContainer}>
                <Text style={styles.loginText}>Task Manager</Text>
                <TextInput
                    placeholder="Enter Username"
                    style={styles.input}
                    onChangeText={(val)=>n = val}
                    onEndEditing={()=>_onChange(n, 'username')}
                    defaultValue={userData.username}
                />
                <TextInput
                    placeholder="Enter Password"
                    style={styles.input}
                    onChangeText={(val)=>n = val}
                    onEndEditing={()=>_onChange(n, 'password')}
                    defaultValue={userData.password}
                    secureTextEntry
                />
            </View>
            <CustomButton title="Login" onPress={_handleLogin}/>
            <CustomButton title="Create an account" onPress={_openRegisterForm} />
        </ScrollView>
            )
         }
        </>
    );
    
    const RegisterForm = () => (
        <>
             {loading ?(<View style={[styles.tasksScreen, styles.loginscreen, {marginTop: 300,}]}>
                <ActivityIndicator size={'large'} color={colors.primaryD} />
            </View>) : (
                <ScrollView style={[styles.tasksScreen, styles.loginscreen]}>
            <View style={styles.loginContainer}>
                <Text style={styles.loginText}>Task Manager</Text>
                <TextInput
                    placeholder="Enter Username"
                    style={styles.input}
                    onChangeText={(val)=>n = val}
                    onEndEditing={()=>_onChange(n, 'name')}
                    defaultValue={userData.name}
                />
                <TextInput
                    placeholder="Enter Username"
                    style={styles.input}
                    onChangeText={(val)=>n = val}
                    onEndEditing={()=>_onChange(n, 'username')}
                    defaultValue={userData.username}
                />
                <TextInput
                    placeholder="Enter Password"
                    style={styles.input}
                    onChangeText={(val)=>n = val}
                    onEndEditing={()=>_onChange(n, 'password')}
                    defaultValue={userData.password}
                    secureTextEntry
                />
            </View>
            <CustomButton title="Create an account" onPress={_handleRegister} />
        </ScrollView>
            )}
        </>
    );


    if (isRegister) {
        return <>
            <RegisterForm />
            <Footer navigation={navigation} />
        </>;
    }
    return <>
        <Login />
        <Footer navigation={navigation} />
    </>;
};


const styles = StyleSheet.create({
    tasksScreen: {
        flex: 1,
        paddingHorizontal: 14,
        paddingTop: 40,
        
    },
    loginscreen: {
        backgroundColor: colors.primaryL
    },
    loginContainer:{
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        marginTop: '50%',
        
    },

    loginText:{
        fontSize: 30,
        fontWeight: '700',
        marginBottom: 10,
    },
    input:{
        borderWidth: 1,
        borderColor: colors.darkL,
        width: '100%',
        height: 55,
        paddingLeft: 10,
        marginVertical: 10,
        borderRadius: 10,

    },
})