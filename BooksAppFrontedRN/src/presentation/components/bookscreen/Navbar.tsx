import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { globalTheme } from '../../../config/theme/globalTheme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // Replace 'FontAwesome' with the desired icon library
import { useNavigation } from "@react-navigation/native";



interface Props {
  bookTitle:string;
};


export const BookNavbar = ({bookTitle}:Props) => {

  const navigation = useNavigation();

  const styles = StyleSheet.create({
    container:{
      width:"100%",
      height:80,
      // padding:20,
      display:"flex",
      flexDirection:"row",
      justifyContent:"space-between",
      alignItems:"center",
    },
    title:{
      ...globalTheme.titleBold,
      color:"white",
      fontSize:22,
    },
    addBookBtn:{
      borderRadius:10,
      backgroundColor:globalTheme.primaryColor.color,
      padding:6,
    }
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Icon name="arrow-left" size={25} color="#fff" />
      </TouchableOpacity>
      {/* <Text style={styles.title}>{"One Piece"}</Text>  */}
      <View style={styles.addBookBtn}>
       <TouchableOpacity onPress={() => console.log("Pressed book icon")}>
          <Icon name="book-plus-multiple-outline" size={25} color="#000" />
        </TouchableOpacity>
      </View>
    </View>
  );

}

