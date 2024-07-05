import { Animated, Dimensions, FlatList, Image, StyleSheet, Text, View } from "react-native";
import { Book, Genre } from "../../../domain/entities/Books";
import { GenreCard } from "../shared/GenreCard";
import { useEffect, useRef, useState } from "react";
import { globalTheme } from '../../../config/theme/globalTheme';

interface Props {
  books:Book[];
  setCurrentBook:React.Dispatch<React.SetStateAction<Book | null>>;
};  
export default function Carousel ({books,setCurrentBook}:Props) {

  const { width } = Dimensions.get("window");

  const SPACING = 10;
  const ITEM_SIZE = width * 0.72;
  const SPACER_ITEM_SIZE = (width - ITEM_SIZE) / 2;

  const scrollX = useRef(new Animated.Value(0)).current;

  const styles = StyleSheet.create({
    container: {
      // flex:1,
    },
    posterImage: {
      width: '100%',
      height: ITEM_SIZE * 1.2,
      resizeMode: 'cover',
      borderRadius: 24,
      margin: 0,
      marginBottom: 10,
    },
    genresContainer:{
      flexDirection:"row",
      alignItems:"flex-start",
      gap:10
    }
  });

  const [booksData,setBooksData] =useState<Book[] | any>([]);

  useEffect(() => {
    //Set the dommy spaces between the firts movie
    //[space,movie,spacer]
    setBooksData([{key:"left-spacer"},...books,{key:"right-spacer"}]);
  },[books]);

  const handleMomentumScrollEnd = (event: any) => {
    const index = Math.floor(event.nativeEvent.contentOffset.x / ITEM_SIZE);
    // Adjust the index to account for the left spacer
    const adjustedIndex = index - 1;
    if (adjustedIndex >= 0 && adjustedIndex < books.length) {
      setCurrentBook(books[adjustedIndex]);
    }
  };

  return (
    <View style={styles.container}>
      <Animated.FlatList
        showsHorizontalScrollIndicator={false}
        data={booksData}
        keyExtractor={(item,index) => `${item.id} ${index}`}
        horizontal
        contentContainerStyle={{
          alignItems:"flex-start"
        }}
        snapToInterval={ITEM_SIZE}
        onMomentumScrollEnd={handleMomentumScrollEnd}
        decelerationRate={0} //Move each item
        bounces={false} //Bounce effect
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
        renderItem={({item,index}) => {

          if(!item.title){
            return <View style={{width:SPACER_ITEM_SIZE}}/>
          }

          const inputRange = [
            (index - 2) * ITEM_SIZE, //Previus
            (index - 1) * ITEM_SIZE, //The current
            (index) * ITEM_SIZE //Next item
          ];

          const translateY = scrollX.interpolate({
            inputRange,
            outputRange:[0,-20,0]
          });

          const opacity = scrollX.interpolate({
            inputRange: [
              (index - 2) * ITEM_SIZE,
              (index - 1) * ITEM_SIZE,
              (index) * ITEM_SIZE,
            ],
            outputRange: [0.6, 1, 0.6],
            extrapolate: 'clamp',
          });

          return (
            <View style={{width:ITEM_SIZE}}>
              <Animated.View style={{
                // marginHorizontal:SPACING,
                padding:SPACING * 2,
                alignItems:"center",
                borderRadius:34,
                opacity,
                transform:[{translateY}]
              }}>
                <Image
                  source={{
                    uri: "https://m.media-amazon.com/images/I/81rEhhwbubL._AC_UF894,1000_QL80_.jpg",
                  }}
                  style={styles.posterImage}
                />
                {/* <Text style={{...globalTheme.titleBold,color:"#fff",fontSize:20}} numberOfLines={1}>{item.title}</Text> */}
                {/* 
                <View style={styles.genresContainer}>
                  {item.genres.map((genre:Genre) => (
                    <GenreCard textStyle={{color:"#fff"}} genre={genre} key={genre.id}/>
                  ))}
                </View>
                <Text style={{color:"#fff"}} numberOfLines={3}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem nesciunt quam repellat expedita voluptatum harum impedit ab velit vitae, quos, veritatis rerum, explicabo nostrum illum numquam quas modi itaque eligendi.</Text> */}
              </Animated.View>
            </View>
          )
        }}
      />
    </View>
  );
}
