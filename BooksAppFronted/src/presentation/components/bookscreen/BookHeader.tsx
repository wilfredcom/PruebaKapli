import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Book } from "../../../domain/entities/Books";
import { globalTheme } from "../../../config/theme/globalTheme";
import moment from "moment";

interface Props {
  book: Book;
}

export const BookHeader = ({ book }: Props) => {

  return (
    <View style={styles.container}>
      <Text style={styles.authorName}>Created by {book.author.name} {book.author.lastName}</Text>
      <View>
        <Text style={{...globalTheme.titleSemiBold,color:globalTheme.primaryColor.color,fontSize:12,marginBottom:5}}>#2 on Trending</Text>
        <Text style={styles.bookPhrase}>{book.title}</Text>
      </View>

      <View>
        <Text style={styles.textRegular}>Released on {book.release_date}</Text>
        <Text style={{...styles.textRegular,marginTop:3}}>Edicion especial</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
  },
  authorName: {
    ...globalTheme.textRegular,
    color: "#fff",
    fontSize: 16,
  },
  bookPhrase: {
    ...globalTheme.titleBold,
    color: "#fff",
    fontSize: 45,
    lineHeight: 50, // Estableciendo la altura de línea a 60 puntos
  },
  textRegular:{
    ...globalTheme.textRegular,
    color: "#fff",
    fontSize: 16,
  }
});
