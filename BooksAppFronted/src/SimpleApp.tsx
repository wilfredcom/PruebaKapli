import 'react-native-gesture-handler';
import { ThemeContextProvider } from './presentation/context/ThemeContext';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Navigation from './presentation/navigation/Navigation';
import { GlobalContext } from './presentation/context/GlobalContext';
import { useState } from 'react';

export const SimpleApp = () => {

  const [usernameId, setUsernameId] = useState(0);

  return (
    <GlobalContext.Provider value={{usernameId,setUsernameId}}>
      <GestureHandlerRootView style={{flex:1}}>
        <ThemeContextProvider>
          <Navigation/>
        </ThemeContextProvider>
      </GestureHandlerRootView>
    </GlobalContext.Provider>
  );
}