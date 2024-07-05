import { StyleSheet, Text, View } from "react-native";
import { Book } from "../../../domain/entities/Books";
import { SuggestionBookCard } from "./SuggestionBookCard";
import { useEffect, useState } from "react";
import { useSharedValue } from "react-native-reanimated";

interface Props {
  books:Book[];
};

export const CardDeck = ({books}:Props) => {

  const [currentIndex,setCurrentIndex] = useState(0);
  const MAX = 5;
  const animatedValue = useSharedValue(0);
  const [ newData,setNewData ] = useState<Book[]>([]);
  /* 
    We'll created a sharedValue named animatedValue to animate the Cards 
    behind,adjusting scale translateY, and opacity
  */

  useEffect(() => {
    setNewData([...books]);
  },[books]);

  return (
    <View style={styles.cardContainer}>
      {
        newData.map((book,index) => {

          if(index > currentIndex + MAX || index < currentIndex){
            return null;
          }

          return (
            <SuggestionBookCard 
              book={book} 
              index={index} 
              dataLength={books.length}
              maxVisibleItem={MAX}
              currentIndex={currentIndex}
              animatedValue={animatedValue}
              setCurrentIndex={setCurrentIndex}
              setNewData={setNewData}
              newData={newData}
            />
          );
        })
      }
    </View>
  );
}
const styles = StyleSheet.create({
  cardContainer: {
    flex:1,
    alignItems:"center",
    marginTop:40
  },
  card: {
    width: '100%',
    height: '100%',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.07,
    shadowRadius: 3.3,
  },
  cardImg: {
    width: '100%',
    height: '100%',
    borderRadius: 13,
  },
});