import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { Genre } from '../../../domain/entities/Books';

interface Props {
  genre: Genre;
  onPress: (genre: Genre) => void;
  customStyles?: {
    container?: ViewStyle;
    text?: TextStyle;
  };
  isSelected?: boolean;
}

export const GenreCard = ({ genre, onPress, customStyles = {}, isSelected }: Props) => {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        customStyles.container,
        isSelected ? styles.selected : {},
      ]}
      onPress={() => onPress(genre)!}
    >
      <Text style={[styles.text, customStyles.text]}>{genre.name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor:"#fff",
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
    color:"#fff"
  },
  selected: {
    borderColor: 'yellow', // Color de borde para género seleccionado
    backgroundColor: 'rgba(255, 255, 0, 0.2)', // Fondo para género seleccionado
  },
});
