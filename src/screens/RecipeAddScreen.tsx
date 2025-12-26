// src/screens/RecipeAddScreen.tsx

import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert, // Para mostrar sucesso/erro
} from 'react-native';

export default function RecipeAddScreen({ navigation }: { navigation: any }) {
  const [title, setTitle] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [ingredients, setIngredients] = useState(''); // Simplificado como uma string grande
  const [steps, setSteps] = useState(''); // Simplificado como uma string grande

  const handleSave = async () => {
    if (!title || !ingredients || !steps) {
      Alert.alert('Atenção', 'Preencha Título, Ingredientes e Modo de Preparo.');
      return;
    }

    const newRecipe = {
      // O ID será criado automaticamente pelo json-server
      title: title,
      image: imageUrl || 'https://images.unsplash.com/photo-1498837148560-bf8c6ad1e847?auto=format&fit=crop&w=800&q=80', // Default image
      ingredients: ingredients.split('\n').filter(i => i.trim() !== ''), // Transforma string em array por quebra de linha
      steps: steps.split('\n').filter(s => s.trim() !== ''), // Transforma string em array por quebra de linha
    };

    try {
      //  Método POST
      const response = await fetch('http://10.0.2.2:3000/recipes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newRecipe),
      });

      if (response.ok) {
        Alert.alert('Sucesso!', `Receita '${title}' adicionada ao banco de dados.`);
        navigation.goBack(); // Volta para a lista
      } else {
        Alert.alert('Erro', 'Falha ao salvar a receita no servidor.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Erro de Conexão', 'Não foi possível conectar ao servidor (json-server).');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>{"< Voltar"}</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Nova Receita</Text>
        <View style={{ width: 50 }} />
      </View>
      
      <ScrollView style={styles.formContainer}>
        <Text style={styles.label}>Título da Receita:</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: Torta de Frango Rápida"
          value={title}
          onChangeText={setTitle}
        />

        <Text style={styles.label}>URL da Imagem (Opcional):</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: https://minhafoto.com/torta.jpg"
          value={imageUrl}
          onChangeText={setImageUrl}
        />

        <Text style={styles.label}>Ingredientes (Um por linha):</Text>
        <TextInput
          style={[styles.input, styles.multilineInput]}
          placeholder="Ex: 2 xícaras de farinha\n3 ovos"
          multiline
          value={ingredients}
          onChangeText={setIngredients}
        />
        
        <Text style={styles.label}>Modo de Preparo (Um passo por linha):</Text>
        <TextInput
          style={[styles.input, styles.multilineInput]}
          placeholder="Ex: 1. Misture os secos.\n2. Leve ao forno."
          multiline
          value={steps}
          onChangeText={setSteps}
        />

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>SALVAR RECEITA</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 15, paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#eee' },
  backButton: { fontSize: 18, color: '#E67E22' },
  title: { fontSize: 20, fontWeight: 'bold', color: '#333' },
  formContainer: { padding: 20 },
  label: { fontSize: 16, fontWeight: '600', color: '#555', marginTop: 10, marginBottom: 5 },
  input: { height: 50, backgroundColor: '#f0f0f0', borderRadius: 10, paddingHorizontal: 15, fontSize: 16, marginBottom: 15 },
  multilineInput: { height: 120, paddingTop: 10, textAlignVertical: 'top' }, // Para campos de texto grandes
  saveButton: { height: 50, backgroundColor: '#2ECC71', borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginTop: 20, marginBottom: 40 },
  saveButtonText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
});