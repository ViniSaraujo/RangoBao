// src/screens/RegisterScreen.tsx
import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Alert, // Para mostrar avisos
  StatusBar,
} from 'react-native';

export default function RegisterScreen({ navigation }: { navigation: any }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    if (!name || !email || !password) {
      Alert.alert('Erro', 'Preencha todos os campos!');
      return;
    }

    const newUser = {
      name: name,
      email: email,
      password: password,
    };

    try {
      // AQUI ESTÁ A MÁGICA: Enviando dados para o json-server
      const response = await fetch('http://10.0.2.2:3000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });

      if (response.ok) {
        Alert.alert('Sucesso', 'Conta criada com sucesso!');
        navigation.goBack(); // Volta para o Login
      } else {
        Alert.alert('Erro', 'Não foi possível cadastrar.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Falha na conexão com o servidor.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.content}>
        <Text style={styles.title}>Criar Conta</Text>
        
        <TextInput
          style={styles.input}
          placeholder="Nome Completo"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="E-mail"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>CADASTRAR</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.linkButton}>
          <Text style={styles.linkText}>Já tenho conta. Voltar.</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', justifyContent: 'center' },
  content: { padding: 20 },
  title: { fontSize: 32, fontWeight: 'bold', color: '#E67E22', marginBottom: 30, textAlign: 'center' },
  input: { height: 50, backgroundColor: '#f0f0f0', borderRadius: 10, paddingHorizontal: 15, marginBottom: 15, fontSize: 16 },
  button: { height: 50, backgroundColor: '#E67E22', borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginTop: 10 },
  buttonText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
  linkButton: { marginTop: 20, alignItems: 'center' },
  linkText: { color: '#888', fontSize: 16 },
});