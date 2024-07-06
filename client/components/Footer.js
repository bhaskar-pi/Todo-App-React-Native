import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Entypo } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { colors } from "../styles/colors";
import { BlurView } from 'expo-blur';
import { getToken } from "./utils";


const Footer = ({ navigation }) => {
  const navigateToProfile = async (path) => {
    const token = await getToken();
    if (token) {
      navigation.navigate(path);
    } else {
      navigation.navigate('login');
    }
  };
    return (
      <BlurView intensity={90} style={styles.footerContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('home')}>
          <Entypo name="home" size={23} color={colors.primaryM} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigateToProfile('tasks')}>
          <FontAwesome5 name="calendar-alt" size={23} color={colors.primaryM} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigateToProfile('create-new')}>
          <AntDesign name="pluscircle" style={styles.plus} size={25} color={colors.primaryM} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigateToProfile('profile')}>
          <Ionicons name="person" size={23} color={colors.primaryM} />
        </TouchableOpacity>
      </BlurView>
    );
  };

const styles = StyleSheet.create({
    footerContainer: {
        backgroundColor: colors.primaryL,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        width: '100%',
        position: 'absolute',
        bottom: 0,
        minHeight: 50,
    },
    plusCircleContainer: {
        position: 'relative',
        top: -15,
        backgroundColor: colors.primaryD,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        width: 65,
        height: 65,
    },
})

export default Footer;