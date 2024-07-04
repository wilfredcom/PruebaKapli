import { StackScreenProps } from "@react-navigation/stack";
import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import { RootStackParams } from "../../navigation/HomeStackNavigator";
import { useChapters } from "../../hooks/useChapters";
import { FullScreenLoader } from "../../components/ui/FullScreenLoader";
import { useEffect, useLayoutEffect } from "react";
import { globalTheme } from "../../../config/theme/globalTheme";
import { ChapterCard } from "../../components/shared/ChapterCard";

export const ChaptersScreen = ({route,navigation}:any) => {

  const {
    isLoading,
    chapters,
    bookInfo
  } = useChapters(route.params.bookId);

  useEffect(() => {
    if (bookInfo) {
      const options = { 
        headerLeft: () => null, // Quitar la flecha de volver hacia atrás
        headerShown: true, 
        headerTitle: () => (
          <View 
            style={{ 
              flexDirection: 'row', 
              justifyContent: 'space-between',
              alignItems:"center",
              width: '100%', 
              backgroundColor:globalTheme.primaryBgColor.color
            }}
          >
            <Text style={{ ...globalTheme.titleSemiBold, fontSize: 18  }}>
              {bookInfo.title}
            </Text>
            {/* <Text style={{ ...globalTheme.titleSemiBold,fontSize: 18 }}>
              25/104 Album
            </Text> */}
          </View>
        ),
        tabBarVisible: false, // Ocultar la barra de pestañas inferior
        headerStyle: {
          backgroundColor: globalTheme.primaryBgColor.color, // Color de fondo de la barra
          shadowColor: 'transparent', // Quitar la sombra (iOS)
          elevation: 0, // Quitar la sombra (Android)
        },
      };
      navigation.setOptions(options);
    }
  }, [navigation, bookInfo]);

  if(isLoading) return <FullScreenLoader/>
  return (
    <ScrollView 
      style={styles.container}
    >
      <FlatList
        data={chapters}
        renderItem={({item}) => (
          <ChapterCard chapter={item} showInformation/>
        )}
        contentContainerStyle={styles.chapterListContainer}
        numColumns={3}
        keyExtractor={(item,index) => `${item.id.toString()}-${index}`}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container:{
    padding:20,
    backgroundColor:globalTheme.primaryBgColor.color
  },
  chapterListContainer:{
    // borderWidth:1,
    // borderColor:"blue",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10, // Ajustar el espacio lateral
  },
});