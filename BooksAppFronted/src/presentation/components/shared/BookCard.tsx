import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Book } from "../../../domain/entities/Books";
import { RootStackParams } from "../../navigation/HomeStackNavigator";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { globalTheme } from "../../../config/theme/globalTheme";

interface Props {
    book:Book;
    height?:number;
    width?:number;
};

export const BookCard = ({book,height=310,width=175}:Props) => {

	const navigation = useNavigation<NavigationProp<RootStackParams>>();

  return (
		<Pressable 
			onPress={() => navigation.navigate("BookScreen",{id:book.id})}            
			style={({pressed}) => ({
        width,
        height,
        opacity:pressed ? 0.9 : 1,
        marginHorizontal:5,
        paddingBottom:20,
        paddingHorizontal:5,
      })}
		>
			<View style={styles.imageContainer}>
				<Text numberOfLines={1} style={{...globalTheme.titleRegular,fontSize:15}}>{book.title}</Text>
				<Image
				 	style={styles.image}
					source={{uri:"https://media.springernature.com/full/springer-static/cover-hires/book/978-3-319-24211-8"}}
				/>
        <View style={styles.infoContainer}>
					<View style={styles.authorContainer}>
						<Image style={styles.authorImage} source={{uri:"https://avatar.iran.liara.run/public/42"}}/>
          	<Text style={globalTheme.textSmBold}>{book.author.name}</Text>
					</View>
					  <Text style={globalTheme.textSmBold}>{(Math.random().toFixed(2))}%</Text>
        </View>
			</View>
		</Pressable>
  )
}

const styles = StyleSheet.create({
    image:{
      flex:1,
    },
		infoContainer:{
			marginTop:8,
			display:"flex",
			flexDirection:"row",
			justifyContent:"space-between",
			alignItems:"center"
		},
		authorContainer:{
			display:"flex",
			flexDirection:"row",
			justifyContent:"space-around",
			gap:10,
			alignItems:"center"
		},
		authorImage:{
			width:25,
			height:25,
			borderRadius:18,
		},
    imageContainer:{
      flex:1,
    //   borderRadius:18,
   	 	// Eliminar cualquier sombra
    	shadowColor: 'transparent',
    	shadowOffset: { width: 0, height: 0 },
    	shadowOpacity: 0,
    	shadowRadius: 0,
    	elevation: 0,
    }
});
