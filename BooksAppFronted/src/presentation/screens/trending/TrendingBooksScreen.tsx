import React from 'react'
import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native'
import { Navbar } from '../../components/shared/Navbar'
import HorizontalLine from '../../components/shared/HorizontalLine'
import { globalTheme } from '../../../config/theme/globalTheme'
import { useTrendingBooks } from '../../hooks/useTrendingBooks'
import { FullScreenLoader } from '../../components/ui/FullScreenLoader'
import { GenreCard } from '../../components/shared/GenreCard'
import { TrendingBookCard } from '../../components/trendingbooks/TrendingBookCard'
import { Defs, RadialGradient, Rect, Stop, Svg } from 'react-native-svg'

export const TrendingBooksScreen = () => {
	const ItemSeparator = () => <View style={{ width: 5 }} />; // Espacio entre los ítems

	const {
		isLoading,
		genres,
		trendingBooks
	} = useTrendingBooks();


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
						<Text style={{...globalTheme.titleBold,color:"#fff"}}>Most Talked About</Text>
						<FlatList
				 			horizontal
        			showsHorizontalScrollIndicator={false}
							data={genres}
							contentContainerStyle={{marginTop:10}}
							renderItem={({item}) => (
								<GenreCard 
								 	onPress={() => {}}
									genre={item}
              		customStyles={{container:{padding:10,borderColor:"#fff"},text:{color:"#fff"}}} 
								/>
							)}
        			keyExtractor={(item,index) => `${item.id.toString()}-${index}`}
          		ItemSeparatorComponent={ItemSeparator} // Usando el componente de separación
						/>
					</View>
					<HorizontalLine/>
					<FlatList
						data={trendingBooks.slice(0,10)}
          	ItemSeparatorComponent={HorizontalLine} // Usando el componente de separación
						renderItem={({item,index}) => (
							<TrendingBookCard book={item} index={index}/>
						)}
        		keyExtractor={(item,index) => `${item.id.toString()}-${index}`}
					/>
					<HorizontalLine/>
				</ScrollView>
			</View>
  )
}

const styles = StyleSheet.create({
	container:{
    flex: 1,
    flexDirection: 'column',
    backgroundColor:"#000",
	},
  svgBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  scrollViewContent: {
    display:"flex",
    flexDirection:"column",
		gap:10,
		paddingHorizontal:20,
    // borderWidth:1,
    // borderColor:"blue"
  },
});