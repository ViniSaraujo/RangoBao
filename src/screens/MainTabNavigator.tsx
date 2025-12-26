// src/navigation/MainTabNavigator.tsx

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Importa as telas que vão virar abas
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';

// import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

export default function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false, // Esconde o cabeçalho de cada aba
        tabBarActiveTintColor: '#E67E22', // Cor laranja para a aba ativa
        tabBarInactiveTintColor: 'gray', // Cor cinza para as inativas
        
        
        // Vamos arrumar isso no próximo passo!
        tabBarIcon: ({ color, size }) => {
          let iconName = 'ellipse-outline'; // Ícone padrão

          if (route.name === 'Home') {
            iconName = 'home-outline'; // Ícone de casa
          } else if (route.name === 'Profile') {
            iconName = 'person-outline'; // Ícone de pessoa
          }

          // (Ainda não temos o 'Ionicons', então isso vai falhar)
          // return <Ionicons name={iconName} size={size} color={color} />;
          
          // Por enquanto, vamos retornar nulo
          return null; 
        },
      })}
    >
      {/* Nossas duas abas */}
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}