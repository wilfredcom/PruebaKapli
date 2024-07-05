import { Image, StyleSheet, Text, View } from "react-native";
import { Chapter } from "../../../domain/entities/Books"
import { globalTheme } from '../../../config/theme/globalTheme';

interface Props {
  chapter:Chapter;
  showInformation?:boolean;
};

export const ChapterCard = ({
  chapter,
  showInformation = false
}:Props) => {
  return (
    <View style={styles.container}>
      <Image 
        source={{uri:"https://upload.wikimedia.org/wikipedia/en/a/a3/One_Piece%2C_Volume_1.jpg"}}
        style={styles.poster}
      />
      {showInformation && (
        <View style={styles.informationContainer}>
          <Text style={styles.tomoLabel}>TOMO 1</Text>
          <Text style={styles.titleChapter}>{chapter.title}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    width:110,
    height:250,
    borderRadius:5,
    flexDirection:"column",
    gap:5,
    marginHorizontal:8
  },
  poster:{
    width:"100%",
    height:"70%",
    borderRadius:5
  },
  informationContainer:{
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
  },
  tomoLabel:{
    ...globalTheme.titleBold,
    fontSize:9,
    color:"#fff",
    backgroundColor:"#000",
    padding:5,
    borderRadius:6
  },
  titleChapter:{
    ...globalTheme.titleBold,
    marginTop:3,
    fontSize:10,
    color:"#000"
  }
});