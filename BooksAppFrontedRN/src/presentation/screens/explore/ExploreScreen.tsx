import React, { useEffect, useState } from 'react';
import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Svg, { RadialGradient, Defs, Rect, Stop } from 'react-native-svg';
import { useBooks } from '../../hooks/useBooks';
import { FullScreenLoader } from '../../components/ui/FullScreenLoader';
import { globalTheme } from '../../../config/theme/globalTheme';
import Icon from 'react-native-vector-icons/AntDesign'; // Replace 'FontAwesome' with the desired icon library
import { useExploreBooks } from '../../hooks/useExploreBooks';
import { GenreCard } from '../../components/shared/GenreCard';
import { Book, Genre } from '../../../domain/entities/Books';
import Carousel from '../../components/explorebooks/Carousel';
import { Navbar } from '../../components/shared/Navbar';
import { useNavigation } from '@react-navigation/native';

const ExploreScreen = () => {

  const navigation = useNavigation();
  const { isLoading,genres,books } = useExploreBooks();
  const [selectedGenre, setSelectedGenre] = useState<Genre | null>(null);
  const handleGenreSelect = (genre:Genre) => {
    setSelectedGenre(genre);
  };
  const [currentBook, setCurrentBook] = useState<Book | null>(null);

  useEffect(() => {
    setSelectedGenre(genres[0]);
    setCurrentBook(books[0]);
  },[genres,books]);

	const ItemSeparator = () => <View style={{ width: 15 }} />; // Espacio entre los ítems

  if (isLoading) return <FullScreenLoader />;
  return (
    <View style={styles.container}>
      <Svg height="100%" width="100%" style={styles.svgBackground}>
        <Defs>
          <RadialGradient id="grad" cx="50%" cy="50%" rx="70%" ry="70%" fx="50%" fy="50%">
            <Stop offset="0%" stopColor={globalTheme.primaryColor.color} stopOpacity="0.20" />
            <Stop offset="0%" stopColor={globalTheme.primaryColor.color} stopOpacity="0.30" />
            <Stop offset="100%" stopColor="#000000" stopOpacity="0" />
          </RadialGradient>
        </Defs>
        <Rect x="0" y="0" width="100%" height="100%" fill="url(#grad)" />
      </Svg>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Navbar/>
        <View style={styles.genresContainer}>
          <FlatList
				 	  horizontal
        	  showsHorizontalScrollIndicator={false}
					  data={genres}
            renderItem={({ item }) => (
              <GenreCard
                genre={item}
                onPress={() => handleGenreSelect(item)}
                // containerStyle={{
                  // borderColor: selectedGenre === item ? globalTheme.primaryColor.color : "#fff",
                  // borderWidth: 2,
                // }}
              />
            )}
        	  keyExtractor={(item,index) => `${item.id.toString()}-${index}`}
            ItemSeparatorComponent={ItemSeparator} // Usando el componente de separación
				  />
        </View>
        <Carousel setCurrentBook={setCurrentBook} books={books}/>
        <View style={styles.informationBookContainer}>
          <View style={{flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}>
            <Text style={{...globalTheme.titleSemiBold,fontSize:20,color:"#fff"}}>Summary</Text>
            {/* @ts-ignore */}
            <TouchableOpacity onPress={() => navigation.navigate("BookScreen",{id:currentBook?.id})}>
              <Icon name="arrowright" color={globalTheme.primaryColor.color} size={25}/>
            </TouchableOpacity>
          </View>
          <View style={styles.informationCard}>
            <Text style={{...globalTheme.subTitleBold,color:"#fff",fontSize:20}}>{currentBook?.title}</Text>
            <Text style={{color:globalTheme.descriptionColor.color,fontSize:12,marginTop:5}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Et excepturi sint unde minus tempora voluptatibus odio id amet quam totam veritatis ipsum cum vitae enim temporibus, deleniti fugit in fugiat!</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor:"#000"
  },
  gradientBackground: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  svgBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  scrollViewContent: {
    flexGrow: 1,
    // marginTop:20,
    display:"flex",
    flexDirection:"column",
    // borderWidth:1,
    // borderColor:"blue"
  },
  searchContainer:{
    display:"flex",
    paddingHorizontal:20,
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center"
  },
  genresContainer:{
    padding:20
    // borderWidth:1,
    // borderColor:"red",
  },
  informationBookContainer:{
    flexGrow:1,
    padding:20,
    flexDirection:"column",
    gap:15,
  },
  informationCard:{
    width:"100%",
    backgroundColor:globalTheme.secondaryBgColor.color,
    borderRadius:10,
    padding:15
  }
});

export default ExploreScreen;
