import { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
// @ts-ignore
import logo from "../../../assets/imgs/Logo.png";
import IconIon from 'react-native-vector-icons/Ionicons'; // Replace 'FontAwesome' with the desired icon library
import IconAntDesign from 'react-native-vector-icons/AntDesign'; // Replace 'FontAwesome' with the desired icon library
import { globalTheme } from "../../../config/theme/globalTheme";

export const Navbar = () => {				

	const [ searchQuery,setSearchQuery ] = useState("");

  return (
 	 <View style={styles.container}>
			<Image style={{width:80,height:80,objectFit:"contain"}} source={logo}/>
			<View style={{flexDirection:"row",alignItems:"center",gap:25}}>
				<TouchableOpacity>
        	<IconAntDesign name="search1" size={25} color="#fff" />
				</TouchableOpacity>
				<TouchableOpacity>
        	<IconIon style={styles.notificationsIcon} name="notifications-outline" size={25} color="#fff" />
					<Text style={styles.notificationsText}>•</Text>
				</TouchableOpacity>
			</View>
		</View>
  )
}

const styles = StyleSheet.create({
	container:{
		flexDirection:"row",
		flexWrap:"nowrap",
		justifyContent:"space-between",
		alignItems:"center",
		gap:30,
		paddingHorizontal:20
	},
	notificationsIcon:{
		position:"relative"
	},
	notificationsText:{
		position:"absolute",
		right:0,
		top:-15,
		...globalTheme.titleBold,
		color:globalTheme.primaryColor.color,
		fontSize:30,
		zIndex:1000
	}
});