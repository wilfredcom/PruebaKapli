import { FlatList, ScrollView, StyleSheet, View } from 'react-native'
import { Text, useTheme } from 'react-native-paper'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useBooks } from '../../hooks/useBooks'
import { FullScreenLoader } from '../../components/ui/FullScreenLoader'
import { HorizontalCarrousel } from '../../components/shared/HorizontalCarrousel'
import HorizontalLine from '../../components/shared/HorizontalLine'
import { globalTheme } from '../../../config/theme/globalTheme'
import { Fonts } from '../../../config/theme/fonts'
import { BookCard } from '../../components/shared/BookCard'
import { Navbar } from '../../components/shared/Navbar'
import { Defs, RadialGradient, Rect, Stop, Svg } from 'react-native-svg'

export const HomeScreen = () => {

  const { top } = useSafeAreaInsets();
  const theme = useTheme();

  const {
    isLoading,
    popularBooks,
    topRatedBooks,
    forYouBooks,
		booksUser,
    booksCreatedByMe
  }  = useBooks();

  if(isLoading) return <FullScreenLoader/>
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
      <Navbar/>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View>
          <Text style={{...globalTheme.titleSemiBold,fontSize:20,marginBottom:20,paddingLeft:10}}>Books created by me</Text>
          <HorizontalCarrousel books={booksCreatedByMe}/>
        </View>
        <View>
          <Text style={{...globalTheme.titleSemiBold,fontSize:20,marginBottom:20,paddingLeft:10}}>Recommended books</Text>
          <HorizontalCarrousel books={forYouBooks}/>
        </View>
        <View>
          <Text style={{...globalTheme.titleSemiBold,fontSize:20,marginBottom:20,paddingLeft:10}}>Popular books</Text>
          <HorizontalCarrousel books={popularBooks}/>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
	container:{
    flex: 1,
    flexDirection: 'column',
    backgroundColor:"#000"
	},
  svgBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  input: {
    fontFamily:Fonts.Merriweather['Merriweather-Regular']
    // backgroundColor: 'transparent', // Asegura que el fondo sea transparente
		// backgroundColor:"black"
  },
	list:{
    justifyContent: "center",
    alignItems: "flex-start",
	},
  scrollViewContent:{
    // padding:20
  }
});
