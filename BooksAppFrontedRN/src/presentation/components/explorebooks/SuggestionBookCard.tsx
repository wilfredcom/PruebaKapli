import { Image, StyleSheet, Text, View, useWindowDimensions } from "react-native";
import { Book } from "../../../domain/entities/Books";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, { SharedValue, interpolate, runOnJS, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

interface Props {
  book:Book;
  index:number;
  dataLength:number;
  maxVisibleItem:number;
  currentIndex:number;
  animatedValue:SharedValue<number>;
  setCurrentIndex:React.Dispatch<React.SetStateAction<number>>;
  setNewData:React.Dispatch<React.SetStateAction<Book[]>>;
  newData:Book[];
};

export const SuggestionBookCard = ({
  book,
  index,
  dataLength,
  maxVisibleItem,
  currentIndex,
  animatedValue,
  setCurrentIndex,
  setNewData,
  newData
}:Props) => {


  const { width } = useWindowDimensions();

  const styles = StyleSheet.create({
    card: {
      position:"absolute",
      width: 250,
      height: 350,
      borderRadius: 10,
      zIndex:dataLength - index,
    },
    image: {
      width: '100%',
      height: '100%',
    },
  });

  const translateX = useSharedValue(0);
  //Creating a SharedValue called "direction" to store the swipe direction, where 1 represents rightward and -1 represents leftward
  const direction = useSharedValue(0);


  const pan = Gesture.Pan()
  .onUpdate(e => {
    //Swipe to left = Negative
    //Swipe to right postive
    const isWipeRight = e.translationX > 0;
    direction.value = isWipeRight ? 1 : -1;
   if(currentIndex === index){
      'worklet'
      translateX.value = e.translationX;
      animatedValue.value = interpolate(
        Math.abs(e.translationX),
        [0,width],
        [index,index + 1]
      )
    }
  })
  .onEnd(e => {
    if(currentIndex === index){
      /*If translateX is greather than 150 , the card will be fully swiped 
        otherwirse, it will return to its original position
      */
      if(Math.abs(e.translationX) > 150 || Math.abs(e.velocityX) > 1000){
        translateX.value = withTiming(width * direction.value,{},() => {
          runOnJS(setCurrentIndex)(currentIndex + 1);
          runOnJS(setNewData)([...newData,newData[currentIndex]]);
        });
        animatedValue.value = withTiming(currentIndex + 1);
      }else{
        translateX.value = withTiming(0,{duration:500})
        animatedValue.value = withTiming(currentIndex);
      }
    }
  })
  ;

  /*nos ayuda a crear objetos de estilos similar a StyleSheet , 
  pero pueden ser animados usando shareValues
  */
  const animatedStyle = useAnimatedStyle(() => {
    const currentItem = index === currentIndex;

    const rotateZ = interpolate(
      Math.abs(translateX.value),
      [0,width],
      [0,20]
    );

    const translateY = interpolate(
      animatedValue.value,
      [index-1,index],
      [-30,0]
    );

    const scale = interpolate(
      animatedValue.value,
      [index-1,index],
      [0.9,1]
    );

    const opacity = interpolate(
      animatedValue.value + maxVisibleItem,
      [index,index + 1],
      [0,1]
    );


    return {
      transform:[
        {translateX:translateX.value},
        {scale:currentItem ? 1 : scale},
        {translateY:currentItem ? 0 : translateY},
        {rotateZ:currentItem ? `${direction.value * rotateZ}deg` : `0deg`}
      ],
      opacity:index < maxVisibleItem + currentIndex ? 1 : opacity
    };
  });



  return (
    <GestureDetector gesture={pan}>
      <Animated.View 
        style={[styles.card,animatedStyle]}
      >
        <Image 
				  source={{uri:"https://media.springernature.com/full/springer-static/cover-hires/book/978-3-319-24211-8"}}
          style={styles.image} 
        />
      </Animated.View>
    </GestureDetector>
  );
}
