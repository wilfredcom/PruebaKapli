import { Text, View } from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

//CSS and icons
import { globalTheme } from '../../config/theme/globalTheme';
import IconAntDesign from 'react-native-vector-icons/AntDesign'; // Replace 'FontAwesome' with the desired icon library
import IconMaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons'; // Replace 'FontAwesome' with the desired icon library

//Screens
import { HomeScreen } from '../screens/home/HomeScreen';
import { TrendingBooksScreen } from '../screens/trending/TrendingBooksScreen';
import RegisterBookScreen from '../screens/RegisterBookScreen';
import ExploreScreen from '../screens/explore/ExploreScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

export const BottomTabNavigator = () => {
  return (
    <Tab.Navigator 
      screenOptions={{ 
        headerShown: false,
        tabBarStyle: {
          backgroundColor: globalTheme.secondaryBgColor.color,
          position: 'absolute',
          elevation: 0, // For Android
          borderTopWidth: 0, // Remove border shadow on Android
          height: 60, // Adjust this value to match your design
          borderTopRightRadius:10,
          borderTopLeftRadius:10,
        },
        tabBarActiveTintColor: globalTheme.primaryColor.color, // Example active color
        tabBarInactiveTintColor: 'gray', // Example inactive color
        tabBarLabelStyle: {
          fontSize: 12, // Adjust this value to match your design
          display:"none"
        },
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen} 
        options={({ route }) => ({ 
          title:'Home', 
          tabBarIcon: ({ color }) => ( 
            <IconMaterialCommunity name="home-outline" size={30} color={color} />
          ),
        })} 
      />
      <Tab.Screen 
        name="Explore" 
        component={ExploreScreen} 
        options={{ 
          // title:'Explore', 
          tabBarIcon: ({ color }) => ( 
            <IconMaterialCommunity name="book-search-outline" size={30} color={color}/>
          ) 
        }} 
      />
      <Tab.Screen 
        name="Add" 
        component={RegisterBookScreen} 
        options={{ 
          // title:'Explore', 
          tabBarIcon: ({ color }) => ( 
            <View style={{backgroundColor:globalTheme.primaryColor.color,padding:10,borderRadius:20}}>
              <IconAntDesign name="plus" size={20} color={"#fff"}/>
            </View>
          ) 
        }} 
      />
      <Tab.Screen 
        name="Trending" 
        component={TrendingBooksScreen} 
        options={{ 
          // title:'Trending', 
          tabBarIcon: ({ color }) => ( 
            <IconMaterialCommunity name="fire" size={30} color={color}/>
          ) 
        }} 
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen} 
        options={{ 
          // title:'Profile', 
          tabBarIcon: ({ color }) => ( 
          <IconAntDesign name="user" size={30} color={ color } /> 
          ) 
        }} 
      />
    </Tab.Navigator>
  );
}