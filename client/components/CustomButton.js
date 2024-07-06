import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { colors } from "../styles/colors";

export const CustomButton = ({ title, onPress, }) => {
  return (
    <TouchableOpacity style={[styles.button]} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primaryD,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 9,
    marginTop: 10,
    marginBottom: 5,
    minWidth: '90%',
  },
  buttonText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: "400",
    textAlign: "center",
  },
});

