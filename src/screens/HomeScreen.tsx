// src/screens/HomeScreen.tsx

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
} from 'react-native';

// import Feather from 'react-native-vector-icons/Feather';

// Tipagem do TypeScript para a prop 'navigation'
// (Resolve a linha vermelha que você viu antes)
export default function HomeScreen({ navigation }: { navigation: any }) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <Text style={styles.headerText}>Perfil</Text>
        <View style={styles.activeHeaderItem}>
          <Text style={[styles.headerText, styles.activeHeaderText]}>Home</Text>
        </View>
        <Text style={styles.headerText}>Histórico</Text>
        <Text style={styles.headerText}>Ajuda</Text>
      </View>

      <View style={styles.body}>
        <Text style={styles.title}>O que vamos comer hoje? 😉</Text>
        <TouchableOpacity 
          style={styles.searchButton}
          onPress={() => navigation.navigate('RecipeList', { focusSearch: true } as any)} // <-- AGORA ESTÁ DENTRO DA TAG
        >
          {/* emoji de lupa */}
          <Text style={{fontSize: 24}}>🔍</Text>
        </TouchableOpacity>
        <Text style={styles.subtitle}>Poucos ingredientes?</Text>
        <TouchableOpacity 
          style={styles.secondaryButton} 
          onPress={() => navigation.navigate('RecipeList')}
        >
          <Text style={styles.secondaryButtonText}>Sim? clique aqui</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.footerText}>Trocar conta</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

// Estilos da HomeScreen
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f8f8', alignItems: 'center', justifyContent: 'space-between' },
  header: { width: '100%', flexDirection: 'row', justifyContent: 'space-around', paddingTop: 20, paddingBottom: 15, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#eee' },
  headerText: { fontSize: 16, color: '#a0a0a0' },
  activeHeaderItem: { borderBottomWidth: 3, borderBottomColor: '#2ECC71', paddingBottom: 5 },
  activeHeaderText: { color: '#333', fontWeight: '600' },
  body: { flex: 1, width: '85%', alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 28, fontWeight: 'bold', color: '#333', textAlign: 'center', marginBottom: 30 },
  searchButton: { backgroundColor: '#E67E22', width: '100%', padding: 18, borderRadius: 15, alignItems: 'center', marginBottom: 60, elevation: 3 },
  subtitle: { fontSize: 20, color: '#555', marginBottom: 15 },
  secondaryButton: { backgroundColor: '#E67E22', width: '100%', padding: 18, borderRadius: 15, alignItems: 'center', elevation: 3 },
  secondaryButtonText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
  footer: { width: '100%', alignItems: 'center', paddingBottom: 40 },
  footerText: { fontSize: 16, color: '#a0a0a0' },
});