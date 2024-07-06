import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native";

import {StyleSheet } from "react-native";
import {LinearGradient} from "expo-linear-gradient"

export default GlobalLayout = ({children}) => {
    return(
        <SafeAreaView style={styles.safeArea}>
            <LinearGradient 
                colors={['#fafae0', '#e9f6fc', "#f4fdf8",]}
                style={styles.linearGradient}
            >
            <StatusBar style="auto" />
            {children}
            </LinearGradient>
            
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safeArea : {
        flex : 1,
        
    },
    linearGradient: {
        flex: 1,
        width: '100%',
      },
})