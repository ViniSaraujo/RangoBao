// src/screens/RecipeDetailScreen.tsx
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  Image, // 1. ADICIONEI O IMPORT AQUI
} from 'react-native';

export default function RecipeDetailScreen({ route, navigation }: { route: any, navigation: any }) {
  const { item } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>{"< Voltar"}</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>{item.title}</Text>
        
        {/* Imagem da Receita */}
        <Image 
          source={{ uri: item.image }} 
          style={styles.recipeImage}
          resizeMode="cover"
        />

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ingredientes:</Text>
          {item.ingredients.map((ingrediente: string, index: number) => (
            <Text key={index} style={styles.text}>• {ingrediente}</Text>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Modo de Preparo:</Text>
          {item.steps.map((passo: string, index: number) => (
            <Text key={index} style={styles.text}>{index + 1}. {passo}</Text>
          ))}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionButtonText}>Adicionar aos Favoritos ❤️</Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { padding: 15, borderBottomWidth: 1, borderBottomColor: '#eee' },
  backButton: { fontSize: 18, color: '#E67E22', fontWeight: 'bold' },
  scrollContent: { padding: 20 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#333', marginBottom: 20, textAlign: 'center' },
  
  recipeImage: { 
    width: '100%', 
    height: 250, 
    borderRadius: 15, 
    marginBottom: 25 
  },

  section: { marginBottom: 25 },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', color: '#E67E22', marginBottom: 10 },
  text: { fontSize: 16, color: '#555', lineHeight: 24, marginBottom: 5 },
  footer: { padding: 20, borderTopWidth: 1, borderTopColor: '#eee' },
  actionButton: { backgroundColor: '#E67E22', padding: 15, borderRadius: 10, alignItems: 'center' },
  actionButtonText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
});