// src/screens/LoginScreen.tsx

import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  StatusBar,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Alert, // <--- Importante para mostrar erro se a senha estiver errada
} from 'react-native';

const backgroundImage = {
  uri: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
};

export default function LoginScreen({ navigation }: { navigation: any }) {
  // Vamos assumir que o "usuario" aqui é o E-mail que ele cadastrou
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    // 1. Validação básica
    if (!email || !password) {
      Alert.alert('Atenção', 'Preencha email e senha!');
      return;
    }

    try {
      // 2. Pergunta pro json-server: "Tem alguém com esse email E essa senha?"
      // O sinal de interrogação (?) começa o filtro
      // O & serve para somar filtros (email E password)
      const response = await fetch(`http://10.0.2.2:3000/users?email=${email}&password=${password}`);
      
      const data = await response.json();

      // 3. Verifica a resposta
      if (data.length > 0) {
        // ACHOU! O array veio com dados. Pode entrar.
        // (Opcional: Você poderia salvar os dados do usuário aqui pra usar no Perfil depois)
        navigation.navigate('MainApp');
      } else {
        // NÃO ACHOU. O array veio vazio [].
        Alert.alert('Erro', 'E-mail ou senha incorretos.');
      }

    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Falha ao conectar com o servidor.');
    }
  };

  return (
    <ImageBackground
      source={backgroundImage}
      resizeMode="cover"
      style={styles.background}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Login</Text>
          
          <TextInput
            style={styles.input}
            placeholder="E-mail" // Mudei o texto pra ficar claro que é o email
            placeholderTextColor="#999"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />
          
          <TextInput
            style={styles.input}
            placeholder="Senha"
            placeholderTextColor="#999"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Entrar</Text>
          </TouchableOpacity>

          {/* Link para Cadastro */}
          <TouchableOpacity 
            style={{marginTop: 20}} 
            onPress={() => navigation.navigate('Register')}
          >
            <Text style={{color: '#555'}}>
              Não tem conta? <Text style={{fontWeight: 'bold', color: '#E67E22'}}>Cadastre-se</Text>
            </Text>
          </TouchableOpacity>

        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.4)' },
  card: { backgroundColor: 'white', width: '85%', borderRadius: 20, padding: 25, alignItems: 'center', elevation: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84 },
  cardTitle: { fontSize: 28, fontWeight: 'bold', color: '#333', marginBottom: 30 },
  input: { width: '100%', height: 50, backgroundColor: '#f0f0f0', borderRadius: 10, paddingHorizontal: 15, fontSize: 16, marginBottom: 15 },
  button: { width: '100%', height: 50, backgroundColor: '#E67E22', borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginTop: 10 },
  buttonText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
});