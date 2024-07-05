import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // Replace 'FontAwesome' with the desired icon library

export default function Rating({ rating }:any) {

  const filledStars = Math.floor(rating / 2);
  const maxStars = Array(5 - filledStars).fill('staro');
  const r = [...Array(filledStars).fill('star'), ...maxStars];

  return (
    <View style={styles.rating}>
      <Text style={styles.ratingNumber}>{rating}</Text>
      {r.map((type, index) => {
        return <Icon key={index} name={type} size={12} color="tomato" />;
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  ratingNumber: { marginRight: 4, fontFamily: 'Menlo', fontSize: 14 },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 4
  },
});