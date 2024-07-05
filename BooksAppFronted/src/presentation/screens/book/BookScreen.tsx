import { StackScreenProps } from '@react-navigation/stack'
import React from 'react'
import { Image, ScrollView, StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'
import { RootStackParams } from '../../navigation/HomeStackNavigator'
import { useBook } from '../../hooks/useBook'
import { FullScreenLoader } from '../../components/ui/FullScreenLoader'
import { globalTheme } from '../../../config/theme/globalTheme'
import moment from 'moment'
import HorizontalLine from '../../components/shared/HorizontalLine'
import { BlurView } from '@react-native-community/blur'

interface Props {
  bookId:number;
};

export const BookScreen = ({bookId}:Props) => {

  const {
    isLoading,
    bookInfo
  } = useBook(bookId);

  if(isLoading) return <FullScreenLoader/>
  return (
    <ScrollView>
      <View style={styles.container}>
        {/* Book header */}
        <View style={styles.backgroundPosterBook}>
				  <Image
            style={{width:"100%",height:"100%"}}
					  source={{uri:"https://media.springernature.com/full/springer-static/cover-hires/book/978-3-319-24211-8"}}
				  />
          <BlurView
            style={styles.absolute}
            blurType="light"
            blurAmount={10}
          />
          <View style={styles.posterBook}>
				    <Image
              style={{width:"100%",height:"100%",objectFit:"scale-down"}}
					    source={{uri:"https://media.springernature.com/full/springer-static/cover-hires/book/978-3-319-24211-8"}}
				    />
          </View>
        </View>
        {/* Book Info */}
        <View style={styles.bookInfoContainer}>
          <Text style={globalTheme.titleBold}>{bookInfo?.title}</Text>
          <View style={styles.authorContainer}> 
			      <Image style={{width:60,height:60}} source={{uri:"https://avatar.iran.liara.run/public/42"}}/>
            <View>
              <Text style={{...globalTheme.subTitleBold,fontSize:18}}>{bookInfo?.author.name} {bookInfo?.author.lastName}</Text>
              <Text style={{...globalTheme.textSmRegular,fontSize:13,marginTop:2}}>Chapters {bookInfo?.chapters.length} * {moment(bookInfo?.release_date).format('LL')}</Text>
            </View>
          </View>
        </View>
        <HorizontalLine/>
        {/* Book stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>2.21m</Text>
            <Text style={styles.statLabel}>Views</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>23.6k</Text>
            <Text style={styles.statLabel}>Likes</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>9.42k</Text>
            <Text style={styles.statLabel}>Comments</Text>
          </View>
        </View>
        <HorizontalLine/>
        {/* Book description */}
        <View style={styles.bookDescriptionContainer}>
          {/* {bookInfo?.description} */}
          <Text style={globalTheme.textRegular}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut reprehenderit voluptates nostrum, quo repudiandae temporibus obcaecati, vero inventore impedit mollitia cumque dolorem autem hic quis id maiores quibusdam esse. Tempora.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut reprehenderit voluptates nostrum, quo repudiandae temporibus obcaecati, vero inventore impedit mollitia cumque dolorem autem hic quis id maiores quibusdam esse. Tempora.
          </Text>
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
  },
  backgroundPosterBook:{
    position:"relative",
    width:"100%",
    height:400,
    justifyContent: 'center', // Centra el contenido verticalmente
    alignItems: 'center', // Centra el contenido horizontalmente
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  posterBook:{
    width:300,
    height:"90%",
    position:"absolute",
    top:80,
  },
  bookInfoContainer:{
    marginTop:45,
    padding:10,
    display:"flex",
    justifyContent:"flex-start",
    alignItems:"flex-start",
  },
  authorContainer:{
    marginTop:10,
    display:"flex",
    flexDirection:"row",
    justifyContent:"flex-start",
    alignItems:"center",
    gap:12
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    ...globalTheme.titleBold,
    fontSize: 20,
  },
  statLabel: {
    ...globalTheme.textSmRegular,
    fontSize: 14,
  },
  bookDescriptionContainer:{
    padding:10
  }
});
