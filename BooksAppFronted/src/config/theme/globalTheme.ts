import { StyleSheet } from 'react-native';
import { Fonts } from './fonts';

export const globalTheme = StyleSheet.create({
  primaryColor:{
    // color:"#dfef6a"
    color:"#b7c754"
  },

  secondaryColor:{
    color:"#6b5232"
  },
  primaryBgColor:{
    color:"#fdfaf1"
  },
  secondaryBgColor:{
    color:"#201f1f"
  },
  descriptionColor:{
    color:"#727272"
  },
  globalMargin: {
    marginHorizontal: 20
  },
  titleBold:{
    color:"white",
    fontSize:30,
    fontFamily:Fonts.Merriweather['Merriweather-Black'],
  },
  titleSemiBold:{
    color:"white",
    fontSize:30,
    fontFamily:Fonts.Merriweather['Merriweather-Bold'],
  },
  titleRegular:{
    color:"white",
    fontSize:30,
    fontFamily:Fonts.Merriweather['Merriweather-Regular'],
    marginHorizontal:10,
    marginBottom:10
  },
  titleThin:{
    color:"white",
    fontSize:40,
    fontFamily:Fonts.Merriweather["Merriweather-Light"],
  },
  subTitleBold:{
    color:"black",
    fontSize:20,
    fontFamily:"Merriweather-Bold",
  },
  text:{
    fontSize:18,
    color:"black",
    fontFamily:Fonts.Merriweather['Merriweather-Bold']
  },
  textRegular:{
    fontSize:16,
    color:"white",
    fontFamily:Fonts.Merriweather['Merriweather-Regular']
  },
  textBold:{
    fontSize:18,
    color:"black",
    fontWeight:"700"
  },
  textSmBold:{
    fontSize:14,
    fontWeight:"700",
    color:"white",
    fontFamily:Fonts.Merriweather['Merriweather-Bold']
  },
  textSmRegular:{
    fontSize:14,
    color:"white",
    fontFamily:Fonts.Merriweather["Merriweather-Regular"]
  }
})