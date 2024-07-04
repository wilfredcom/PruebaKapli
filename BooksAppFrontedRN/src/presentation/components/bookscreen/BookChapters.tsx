import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { globalTheme } from '../../../config/theme/globalTheme'
import { FlatList } from 'react-native'
import { Chapter } from '../../../domain/entities/Books'
import { ChapterCard } from '../shared/ChapterCard'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // Replace 'FontAwesome' with the desired icon library
import { useNavigation } from '@react-navigation/native'
import { RootStackParams } from '../../navigation/HomeStackNavigator'
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack'

interface Props {
  chapters:Chapter[];
  bookId:number;
};
type BookChaptersNavigationProp = StackNavigationProp<RootStackParams, 'ChaptersScreen'>;

export const BookChapters = ({
  chapters,
  bookId
}:Props) => {

  const navigation = useNavigation<BookChaptersNavigationProp>();

  return (
    <View style={styles.container}>
      <View style={styles.collectionTitleContainer}>
        <Text style={styles.titleChapters}>Collection</Text>
          <TouchableOpacity onPress={() => navigation.navigate('ChaptersScreen', { bookId })}>
            <Icon 
              name="arrow-right" 
              size={25} color="#fff" 
            />
          </TouchableOpacity>
      </View>
      <View style={styles.chapterContainer}>
        {chapters.length === 0 ? (
          <Text style={styles.noChaptersText}>No chapters registered yet</Text>
        ) : (
          <FlatList
            style={{ marginTop: 20 }}
            data={chapters}
            renderItem={({ item }) => (
              <ChapterCard chapter={item} />
            )}
            keyExtractor={(item, index) => `${item.id.toString()}-${index}`}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
  },
  collectionTitleContainer:{
    display:"flex",
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center"
  },
  titleChapters:{
    ...globalTheme.titleSemiBold,
    fontSize:18,
    color:"#fff"
  },
  noChaptersText: {
    marginTop: 20,
    marginBottom:20,
    fontSize: 16,
    color: "#fff",
    textAlign: "center"
  },
  chapterContainer:{
    minHeight:90,
  }
});
