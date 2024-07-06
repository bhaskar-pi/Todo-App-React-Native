import React from "react";
import { View } from "react-native";
import { colors } from "../styles/colors";
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default Icon = ({category , bg = false, size=24}) =>{
    const renderIcon = () => {
        switch (true) {
            case category==="Work":
                return (
                    <>
                    {
                        bg ? (
                            <View style={{
                                backgroundColor: colors.workL,
                                height: 45,
                                width: 45,
                               flexDirection: "column",
                               alignItems: 'center',
                               justifyContent: 'center',
                               borderRadius: 100,
                               marginHorizontal: 10,
                            
                            }}>
                                <MaterialIcons name="work" size={size} color={colors.workD} />
                            </View>
                        ):  <MaterialIcons name="work" size={size} color={colors.workD} />
                    }
                    </>
                )
            case category==="Office": 
                return(
                    <>
                    {
                        bg ? (
                            <View style={{
                                backgroundColor: colors.officeL,
                                height: 45,
                                width: 45,
                               flexDirection: "column",
                               alignItems: 'center',
                               justifyContent: 'center',
                               borderRadius: 100,
                               marginHorizontal: 10,
                            
                            }}>
                                <MaterialCommunityIcons name="microsoft-office" size={size} color={colors.officeD} />
                            </View>
                        ):  <MaterialCommunityIcons name="microsoft-office" size={size} color={colors.officeD} />
                    }
                    </>
                    
                )  
                case category==="Personal": 
                return(
                    <>
                    {
                        bg ? (
                            <View style={{
                                backgroundColor: colors.personalL,
                                height: 45,
                                width: 45,
                               flexDirection: "column",
                               alignItems: 'center',
                               justifyContent: 'center',
                               borderRadius: 100,
                               marginHorizontal: 10,
                            
                            }}>
                                <AntDesign name="team" size={size} color={colors.personalD} />
                            </View>
                        ):  <AntDesign name="team" size={size} olor={colors.personalD} />
                    }
                    </>
                    
                ) 
                
                case category==="Education": 
                return(
                    <>
                    {
                        bg ? (
                            <View style={{
                                backgroundColor: colors.educationL,
                                height: 45,
                                width: 45,
                               flexDirection: "column",
                               alignItems: 'center',
                               justifyContent: 'center',
                               borderRadius: 100,
                               marginHorizontal: 10,
                            
                            }}>
                                    <Entypo name="open-book" size={size} color={colors.educationD} />
                            </View>
                        ):  <Entypo name="open-book" size={size} color={colors.educationD} />
                    }
                    </>
                    
                ) 

                case category==="Health": 
                return(
                    <>
                    {
                        bg ? (
                            <View style={{
                                backgroundColor: colors.healthL,
                                height: 45,
                                width: 45,
                               flexDirection: "column",
                               alignItems: 'center',
                               justifyContent: 'center',
                               borderRadius: 100,
                               marginHorizontal: 10,
                            
                            }}>
                                    <AntDesign name="medicinebox" size={size} color={colors.healthD} />
                            </View>
                        ):  <AntDesign name="medicinebox" size={size} color={colors.healthD} />
                    }
                    </>
                    
                ) 
        }
    }
    return(
        <View>
            {renderIcon()}
        </View>
    )
}