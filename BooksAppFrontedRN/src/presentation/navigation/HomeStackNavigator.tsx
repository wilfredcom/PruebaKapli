import { createStackNavigator } from '@react-navigation/stack';
import { BookScreen } from '../screens/book/BookScreen';
import { HomeScreen } from '../screens/home/HomeScreen';
import { BookScreenTotal } from '../screens/book/BookScreenTotal';
import { ChaptersScreen } from '../screens/chapter/ChaptersScreen';

export type RootStackParams = {
  HomeScreen:undefined,
  BookScreen:{id:number},
  ChaptersScreen:{bookId:number}
};

const Stack = createStackNavigator<RootStackParams>();

export const HomeStackNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
    {/* // <Stack.Navigator> */}
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen 
        name="BookScreen" 
        component={BookScreenTotal} 
      />
      <Stack.Screen 
        name="ChaptersScreen" 
        component={ChaptersScreen} 
        options={{ 
          headerShown: true,
          title: "Chapters"
        }} 
      />
  
    </Stack.Navigator>
  );
}