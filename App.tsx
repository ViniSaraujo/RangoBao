// App.tsx (O NOVO "Diretor")

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// 1. Importa a tela de Login
import LoginScreen from './src/screens/LoginScreen';
// 2. Importa o nosso NOVO navegador de abas (o "Coração")
import MainTabNavigator from './src/screens/MainTabNavigator';
import RecipeListScreen from './src/screens/RecipeListScreen';
import RecipeDetailScreen from './src/screens/RecipeDetailScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import RecipeAddScreen from './src/screens/RecipeAddScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{ headerShown: false }}>
        
        {/* O app agora tem duas "rotas" principais: */}
        
        {/* 1. A tela de Login (quando está "logado") */}
        <Stack.Screen name="Login" component={LoginScreen} />

        {/* 2. onde consegue criar uma conta nova) */}
        <Stack.Screen name="Register" component={RegisterScreen} />
        
        {/* 3. O "Coração do App" (que contém todas as outras telas) */}
        <Stack.Screen name="MainApp" component={MainTabNavigator} />

        <Stack.Screen name="RecipeAdd" component={RecipeAddScreen} />
        
        <Stack.Screen name="RecipeList" component={RecipeListScreen} />

        <Stack.Screen name="RecipeDetail" component={RecipeDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}