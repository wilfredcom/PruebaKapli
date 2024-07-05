import { ScrollView, StyleSheet, Text, View, Dimensions } from "react-native";
import { useBook } from "../../hooks/useBook";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParams } from "../../navigation/HomeStackNavigator";
import { FullScreenLoader } from "../../components/ui/FullScreenLoader";
import { useLayoutEffect, useRef } from "react";
import { Image } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { BookNavbar } from "../../components/bookscreen/Navbar";
import { BookHeader } from "../../components/bookscreen/BookHeader";
import { BookChapters } from "../../components/bookscreen/BookChapters";
import { BookFooter } from "../../components/bookscreen/BookFooter";
import { BookScreen } from "./BookScreen";
import { GenreCard } from "../../components/shared/GenreCard";
import { globalTheme } from '../../../config/theme/globalTheme';
import HorizontalLine from "../../components/shared/HorizontalLine";

// Interfaz para las opciones de navegación
interface NavigationOptions {
  headerShown: boolean;
  title: string;
  tabBarVisible?: boolean; // Opcional si no se usa en todos los componentes
}

const BookScreenTotal = ({ route, navigation }: any) => {
  const { isLoading, bookInfo } = useBook(route.params.id);

  const scrollViewRef = useRef<ScrollView>(null);

  const handleFooterPress = () => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  };

  useLayoutEffect(() => {
    const options: NavigationOptions = {
      headerShown: false,
      title: bookInfo ? bookInfo.title : "Cargando...", // Cambiar título basado en datos del libro
      tabBarVisible: false, // Ocultar la barra de pestañas inferior
    };
    navigation.setOptions(options);
  }, [navigation, bookInfo]);

  if (isLoading) return <FullScreenLoader />;
  return (
    <View style={styles.container}>
      <Image
        style={styles.backgroundIMG}
        source={{
          uri: "https://m.media-amazon.com/images/I/81rEhhwbubL._AC_UF894,1000_QL80_.jpg",
        }}
      />
      <LinearGradient
        colors={["rgba(0,0,0,0.85)", "rgba(0,0,0,0.7)", "rgba(0,0,0,0.85)"]}
        style={styles.contentContainer}
      >
        <ScrollView
          ref={scrollViewRef}
          contentContainerStyle={styles.scrollViewContent}
        >
          <View style={styles.screen}>
            <View style={styles.basicInformation}>
              <BookNavbar bookTitle={bookInfo?.title!} />
              <BookHeader book={bookInfo!} />
              <View style={styles.genresContainer}>
                {
                  bookInfo?.genres.map(genre => (
                    <GenreCard
                      key={genre.id}
                      onPress={() => console.log()}
                      genre={genre}
                      customStyles={{container:{borderWidth:0}}}
                      // textStyle={{ ...globalTheme.titleBold,color: "#fff",fontSize:12}}
                    />
                  ))
                }
                </View>
              <View style={styles.flexEnd}>
                <BookChapters bookId={bookInfo?.id!} chapters={bookInfo?.chapters!} />
                <BookFooter onPress={handleFooterPress} />
              </View>
            </View>
            <View style={styles.detailBookContainer}>
              <View>
                {/* <Text style={{...globalTheme.titleBold,color:globalTheme.primaryColor.color,fontSize:12}}>#2 On trending</Text> */}
                <Text style={{...globalTheme.titleBold,color:"#fff"}}>{"Details"}</Text>
              </View>
              <View>
                <Text style={{...globalTheme.titleSemiBold,color:"#fff",fontSize:16}}>Summary</Text>
                <Text style={{...globalTheme.textRegular,color:globalTheme.descriptionColor.color,fontSize:12,marginTop:6}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda aperiam, itaque, pariatur saepe maxime nemo atque magnam omnis aut doloribus veniam nobis. Blanditiis, ipsum quam ut facilis nulla pariatur a.</Text>
              </View>
              <View>
                <Text style={{...globalTheme.titleSemiBold,color:"#fff",fontSize:16}}>About the autor</Text>
                <Text style={{...globalTheme.textRegular,color:globalTheme.descriptionColor.color,fontSize:12,marginTop:6}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda aperiam, itaque, pariatur saepe maxime nemo atque magnam omnis aut doloribus veniam nobis. Blanditiis, ipsum quam ut facilis nulla pariatur a.</Text>
              </View>
              {/* Book stats */}
              <HorizontalLine/>
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
              <View>
              </View>
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    width:"100%",
  },
  backgroundIMG: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  contentContainer: {
    flex: 1,
    width: "100%",
    height: "100%",
    position: "absolute",
    left: 0,
    top: 0,
    zIndex: 1,
  },
  genresContainer:{
    display:"flex",
    flexDirection:"row",
    gap:5
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  screen: {
    flex: 1,
  },
  basicInformation: {
    width: "100%",
    height: Dimensions.get("window").height, // Ocupa toda la pantalla
    // borderWidth:1,
    // borderColor:"blue",
    display: "flex",
    flexDirection: "column",
    gap:20,
    paddingVertical:15,
    paddingHorizontal:15
  },
  flexEnd:{
    flex: 1,
    justifyContent: "flex-end",
  },
  detailBookContainer: {
    width: "100%",
    height: Dimensions.get("window").height, // Ocupa toda la pantalla
    padding: 20,
    display:"flex",
    flexDirection:"column",
    gap:20,
    backgroundColor: 'rgba(0, 0, 0, 0.85)', // Asegura que el fondo sea consistente
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    ...globalTheme.titleBold,
    fontSize: 20,
    color:"#fff"
  },
  statLabel: {
    ...globalTheme.textSmRegular,
    fontSize: 14,
    color:"#fff"
  },
  bookDescriptionContainer:{
    padding:10
  }
});

export default BookScreenTotal;