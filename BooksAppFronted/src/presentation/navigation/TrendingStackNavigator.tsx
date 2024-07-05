import { createStackNavigator } from '@react-navigation/stack';
import { BookScreen } from '../screens/book/BookScreen';
import { TrendingBooksScreen } from '../screens/trending/TrendingBooksScreen';
import { BookScreenTotal } from '../screens/book/BookScreenTotal';

export type RootStackParams = {
  TrendingBooksScreen:undefined,
  BookScreen:{id:number},
};

const Stack = createStackNavigator<RootStackParams>();

export const TrendingStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
      {/* <Stack.Navigator> */}
      <Stack.Screen name="TrendingBooksScreen" component={TrendingBooksScreen} />
      <Stack.Screen name="BookScreen" component={BookScreenTotal} />
    </Stack.Navigator>
  );
}