import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AddAuthorScreen from './screens/AddAuthorScreen';
import AuthorsListScreen from './screens/AuthorsListScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="AuthorsList">
        <Stack.Screen name="AddAuthor" component={AddAuthorScreen} />
        <Stack.Screen name="AuthorsList" component={AuthorsListScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
