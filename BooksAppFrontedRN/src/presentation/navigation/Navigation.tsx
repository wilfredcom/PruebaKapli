import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BottomTabNavigator } from './BottomTabNavigator';
import BookScreenTotal from '../screens/book/BookScreenTotal';
import { ChaptersScreen } from '../screens/chapter/ChaptersScreen';
import RegisterBookScreen from '../screens/RegisterBookScreen';
import SplashScreen from '../components/shared/SplashScreen';
const Stack = createNativeStackNavigator();


const Navigation = () => {

  return (
    <Stack.Navigator screenOptions={{headerBackTitleVisible:false}}>
      <>
        <Stack.Screen options={{ headerShown: false }} name="SplashScreen" component={SplashScreen} />
        <Stack.Screen options={{headerShown:false}} name="MenuTab" component={BottomTabNavigator}/>
        <Stack.Screen options={{ title: 'Detalles del libro', headerTintColor: '#000', headerShadowVisible: false }} name="BookScreen" component={BookScreenTotal} />
        <Stack.Screen options={{ title: 'Capitulos del libro', headerTintColor: '#000', headerShadowVisible: false }} name="ChaptersScreen" component={ChaptersScreen} />
      </>
    </Stack.Navigator>
  );
}


export default Navigation;