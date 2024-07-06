import { FontAwesome } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

export default () => {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: 'blue' }}>
      <Tabs.Screen
        name="Listado"
        options={{
          title: 'Listado',
          href:"./Listado",
          headerShown: false,
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="Registrar"
        options={{
          title: 'Registrar',
          href: "./Registrar",
          headerShown: false,
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="cog" color={color} />,
        }}
      />
    </Tabs>
  );
}