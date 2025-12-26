// src/screens/ProfileScreen.tsx
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
} from 'react-native';

// Tipagem do TypeScript para a prop 'navigation'
export default function ProfileScreen({ navigation }: { navigation: any }) {
  
  const handleLogout = () => {
    // Reseta a navegação e volta para a tela de Login
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <View style={styles.content}>
        <Text style={styles.title}>Meu Perfil</Text>
        <Text style={styles.subtitle}>Minhas Receitas Favoritas (em breve)</Text>
        <Text style={styles.subtitle}>Configurações (em breve)</Text>
        
        {/* Botão Sair */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Sair (Logout)</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 40,
  },
  subtitle: {
    fontSize: 18,
    color: '#888',
    marginBottom: 20,
  },
  logoutButton: {
    marginTop: 50,
    width: '100%',
    backgroundColor: '#e74c3c', // Um vermelho para "Sair"
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});