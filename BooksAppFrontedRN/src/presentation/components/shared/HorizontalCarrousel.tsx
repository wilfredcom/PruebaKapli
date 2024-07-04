import { FlatList, NativeScrollEvent, NativeSyntheticEvent, View } from "react-native";
import { Book } from "../../../domain/entities/Books"
import { useState } from "react";
import { BookCard } from "./BookCard";

interface Props {
    books:Book[];
    loadNextPage?:() => void;
};

export const HorizontalCarrousel = ({
    books,
    loadNextPage
}:Props) => {

	const [isLoading, setIsLoading] = useState(false);
    
	const onScroll = (event:NativeSyntheticEvent<NativeScrollEvent>) => {

    if(isLoading) return;

    //Determinar la posicion
    const { contentOffset,layoutMeasurement,contentSize } = event.nativeEvent;
    const isEndReached = ( contentOffset.x + layoutMeasurement.width + 600) >= contentSize.width;
    if(!isEndReached) return;

    //Cargar las siguientes peliculas!
    // isLoading.current = true;
    setIsLoading(true);
    loadNextPage && loadNextPage();

  }

  return (
    <View>
      <FlatList
        data={books}                
				renderItem={({ item,}) => (
					<BookCard book={item} />
        )}
        keyExtractor={(item,index) => `${item.id.toString()}-${index}`}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  )

}
