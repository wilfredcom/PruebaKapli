import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { globalTheme } from "../../../config/theme/globalTheme";
import Icon from 'react-native-vector-icons/AntDesign'; // Replace 'FontAwesome' with the desired icon library

interface BookFooterProps {
  onPress: () => void;
};

export const BookFooter = ({ onPress }: BookFooterProps) => {
  return (
    <TouchableOpacity 
      style={styles.footer} 
      onPress={() => {
        console.log("Pressed");
        onPress();
      }}
    >
      <Text style={styles.footerText}>View more information</Text>
      <Icon name="down" size={20} color="#fff" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  footer: {
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },
  footerText: {
    ...globalTheme.textRegular,
    color: "#fff",
  },
});