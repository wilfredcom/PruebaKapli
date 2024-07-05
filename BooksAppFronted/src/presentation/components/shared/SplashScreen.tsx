import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { Image, StyleSheet, View, TextStyle, Text } from 'react-native';
// @ts-ignore
import logo from "../../../assets/imgs/Logo.png";
import { globalTheme } from '../../../config/theme/globalTheme';
import { useGlobalContext } from '../../context/GlobalContext';
import { booksApi } from '../../../config/api/booksApi';

const SplashScreen = () => {

  const navigation = useNavigation();
  const { usernameId } = useGlobalContext();

  useEffect(() => {
    const timer = setTimeout(() => {
      //@ts-ignore
      navigation.navigate("MenuTab") 
    }, 3000);

    return () => clearTimeout(timer);
  },[]);


  return (
    <View style={styles.container}>
      <Image resizeMode='contain' style={styles.logoRayo} source={logo} />
      <Text style={{fontWeight:"bold",color:"#fff"}}>APLICACION DE PRUEBA PARA ENTREVISTA TECNICA</Text>
      {/* @ts-ignore */}
      <Text style={{fontWeight:"bold",color:"#fff"}}>Seccion iniciada con el id {usernameId}</Text>
    </View>
  )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#000',
      alignItems: 'center',
      justifyContent: 'center',
    },
    logoRayo: {
      width: 100,
      height: 100
  }
});

export default SplashScreen