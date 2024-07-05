import React, { useState } from 'react'
import { Alert, ScrollView, StyleSheet, View } from 'react-native'
import { Defs, RadialGradient, Rect, Stop, Svg } from 'react-native-svg'
import { globalTheme } from '../../config/theme/globalTheme'
import { Navbar } from '../components/shared/Navbar'
import RegisterFirtsStep from '../components/registerBookScreen/RegisterFirtsStep'
import RegisterSecondStep from '../components/registerBookScreen/RegisterSecondStep'
import { createBook } from '../../actions/books/createBook'
import { booksApi } from '../../config/api/booksApi'
import Navigation from '../navigation/Navigation';
import { useNavigation } from '@react-navigation/native'

export interface INITIAL_FORM_VALUES_TYPE  {
  title:string;
  description:string;
  authorId:number;
  genresIds:number[];
  avaible:boolean;
  releaseDate:string;
  poster:string;
};

const RegisterBookScreen = () => {

  const INITIAL_FORM_VALUES:INITIAL_FORM_VALUES_TYPE = {
    poster:"",
    title:"",
    description:"",
    authorId:1,
    genresIds:[],
    avaible:true,
    releaseDate:""
  };

  const Navigation = useNavigation();
  const [formValues,setFormValues] = useState(INITIAL_FORM_VALUES);
  const [currenTab,setCurrentTab] = useState(0);

  const handleRegisterNewBook = async () => {
    try {
      const resp = await booksApi.post("books", formValues);
      setCurrentTab(0);
      setFormValues(INITIAL_FORM_VALUES);
      Alert.alert("Exito!","Libro registrado con exito!");
      {/* @ts-ignore */}
      return Navigation.navigate("BookScreen",{id:resp.data.data.book.id})
    } catch (error) {
      Alert.alert("Error","Error registrando el libro!");
    }
  };


  const steps = [
    <RegisterFirtsStep formValues={formValues} setFormValues={setFormValues} setCurrenTab={setCurrentTab}/>,
    <RegisterSecondStep formValues={formValues} setFormValues={setFormValues} setCurrenTab={setCurrentTab} handleRegister={handleRegisterNewBook}/>,
  ];

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
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Navbar/>
        {steps[currenTab]}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor:"#000"
  },
  gradientBackground: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  svgBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  scrollViewContent: {
    flexGrow: 1,
    // marginTop:20,
    display:"flex",
    flexDirection:"column",
    // borderWidth:1,
    // borderColor:"blue"
  },
});

export default RegisterBookScreen