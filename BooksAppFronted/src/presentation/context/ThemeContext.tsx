import { PropsWithChildren, createContext } from "react";

import {
  NavigationContainer,
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';

import { PaperProvider, adaptNavigationTheme,DefaultTheme } from 'react-native-paper';
import { useColorScheme } from "react-native";
const { LightTheme, DarkTheme } = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});


export const ThemeContext = createContext({
  isDark:false,
  theme:LightTheme
});


//HOC
export const ThemeContextProvider = ({children}:PropsWithChildren) => {

  const colorScheme = useColorScheme();
  const isDarkTheme = colorScheme === "dark";
  let theme = isDarkTheme ? DarkTheme : LightTheme;
  theme = {
		...DefaultTheme,
    // Specify custom property in nested object
    colors: {
			...DefaultTheme.colors
    },
  };

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer theme={theme}>
        <ThemeContext.Provider value={{
          isDark:isDarkTheme,
          theme
        }}>
          {children}
        </ThemeContext.Provider>
      </NavigationContainer>
    </PaperProvider>
  )

}
