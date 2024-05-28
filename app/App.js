import React from 'react';
import HomeScreen from './src/screens/home';
import FormScreen from './src/screens/form';
import {Button} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const defaultOptions = {
  headerStyle: {
    backgroundColor: '#0F84FF',
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
};

const App = () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={({navigation}) => ({
          ...defaultOptions,
          title: 'Registros',
          headerRight: () => (
            <Button
              onPress={() => navigation.navigate('Form')}
              title="+"
              color="#fff"
            />
          ),
        })}
      />
      <Stack.Screen
        name="Form"
        component={FormScreen}
        options={({ navigation }) => ({
          ...defaultOptions,
          title: 'Registrar gasto',
        })}
      />
    </Stack.Navigator>
  </NavigationContainer>
);

export default App;
