import { Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Book } from "../../../domain/entities/Books";
import { globalTheme } from "../../../config/theme/globalTheme";
import { GenreCard } from "../shared/GenreCard";
import HorizontalLine from "../shared/HorizontalLine";
import { useNavigation } from "@react-navigation/native";

interface Props {
  book:Book,
  height?:number;
  width?:number;
  index:number;
};

export const TrendingBookCard = ({book,index,width,height}:Props) => {

  const navigation = useNavigation();

  return (
    <Pressable>
      <View style={styles.container}>
        <View>
          <Text style={{...globalTheme.titleThin,fontSize:40}}>{index+1}.</Text>
        </View>
        {/*@ts-ignore*/}
        <TouchableOpacity onPress={() => navigation.navigate("BookScreen",{id:book.id}) }>
          <View style={styles.imgContainer}>
				    <Image
				 	    style={styles.image}
					    source={{uri:"https://media.springernature.com/full/springer-static/cover-hires/book/978-3-319-24211-8"}}
				    />
          </View>
        </TouchableOpacity>
        <View style={styles.infoContainer}>
          <Text style={{...globalTheme.titleBold,fontSize:16}}>{book.title.slice(0,20)}</Text>
          <Text style={{...globalTheme.textRegular,fontSize:12}}>{book.author?.name}</Text>
          <HorizontalLine/>
          <View style={styles.genresContainer}>
            {
              book.genres.map(genre => (
                <GenreCard  
                  onPress={() => {}}
              		customStyles={{container:{padding:10,borderColor:"#fff"},text:{color:"#fff"}}} 
                  genre={genre}
                />
              ))
            }
          </View>
        </View>
      </View>
    </Pressable>
  );

}

const styles = StyleSheet.create({
  container:{
    height:180,
    display:"flex",
    justifyContent:"flex-start",
    alignItems:"flex-start",
    flexDirection:"row",
    gap:15
  },
  imgContainer:{
  },
  genresContainer:{
    display:"flex",
    justifyContent:"flex-start",
    gap:5,
    flexDirection:"row",
  },
  image:{
    width:120,
    height:180
  },
  infoContainer:{

  }
});