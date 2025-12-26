// src/screens/RecipeListScreen.tsx
import React, { useEffect, useState, useRef } from 'react';
import { useRoute } from '@react-navigation/native';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    StatusBar,
    FlatList,
    Image,
    ActivityIndicator,
    TextInput,
    TextInput as RNTextInput, 
} from 'react-native';

// Definindo o tipo correto para o useRef
type TextInputRef = React.ElementRef<typeof RNTextInput>;

export default function RecipeListScreen({ navigation }: { navigation: any }) {
    const route = useRoute() as any; 
    const searchInputRef = useRef<TextInputRef>(null); 
    
    const [recipes, setRecipes] = useState([]); 
    const [filteredRecipes, setFilteredRecipes] = useState([]); 
    const [loading, setLoading] = useState(true);
    const [searchText, setSearchText] = useState(''); 

    // --- LÓGICA DA BUSCA ---
    const handleSearch = (text: string) => {
        setSearchText(text);
        if (text) {
            const newData = recipes.filter((item: any) => {
                const itemData = item.title ? item.title.toUpperCase() : ''.toUpperCase();
                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1;
            });
            setFilteredRecipes(newData);
        } else {
            setFilteredRecipes(recipes);
        }
    };

    // --- LÓGICA DA CONEXÃO COM API ---
    useEffect(() => {
        fetch('http://10.0.2.2:3000/recipes')
            .then(response => response.json())
            .then(data => {
                setRecipes(data); 
                setFilteredRecipes(data); 
                setLoading(false);
            })
            .catch(error => { 
                console.error("Erro ao buscar receitas:", error); 
                setLoading(false); 
            });
    }, []);

    // --- FOCO AUTOMÁTICO NA BARRA DE BUSCA ---
    useEffect(() => {
        if (route.params?.focusSearch) {
            searchInputRef.current?.focus(); 
        }
    }, [route.params?.focusSearch]);

    const renderItem = ({ item }: { item: any }) => (
        <TouchableOpacity 
            style={styles.recipeItem}
            onPress={() => navigation.navigate('RecipeDetail', { item: item })} 
        >
            <Image source={{ uri: item.image }} style={styles.thumbnail} />
            <Text style={styles.recipeTitle} numberOfLines={2}>{item.title}</Text>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" />
            
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text style={styles.backButton}>{"< Voltar"}</Text>
                </TouchableOpacity>

                <Text style={styles.title}>Cardápio</Text>
                
                {/* 👇 GRUPO DE BOTÕES DE AÇÃO (Lupa e Mais) 👇 */}
                <View style={styles.actionButtons}>
                    {/* 1. BOTÃO LUPA (Vai focar o campo de busca abaixo) */}
                    <TouchableOpacity onPress={() => searchInputRef.current?.focus()}>
                        <Text style={styles.actionButtonIcon}>🔍</Text> 
                    </TouchableOpacity>
                    
                    {/* 2. BOTÃO ADICIONAR RECEITA */}
                    <TouchableOpacity onPress={() => navigation.navigate('RecipeAdd')}>
                        <Text style={styles.actionButtonIcon}>➕</Text> 
                    </TouchableOpacity>
                </View>
            </View>

            {/* --- BARRA DE PESQUISA --- */}
            <View style={styles.searchContainer}>
                <TextInput
                    ref={searchInputRef as any}
                    style={styles.searchInput}
                    placeholder="Buscar receita... (ex: Bolo)"
                    value={searchText}
                    onChangeText={(text) => handleSearch(text)}
                />
            </View>

            {loading ? (
                <View style={styles.center}>
                    <ActivityIndicator size="large" color="#E67E22" />
                </View>
            ) : (
                <FlatList
                    data={filteredRecipes} 
                    renderItem={renderItem}
                    keyExtractor={(item: any) => item.id}
                    style={styles.list}
                />
            )}
        </SafeAreaView>
    ); 
}

// Estilos
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 15, paddingVertical: 10 },
    backButton: { fontSize: 18, color: '#E67E22' },
    title: { fontSize: 20, fontWeight: 'bold', color: '#333' },
    
    // NOVO ESTILO: Container para alinhar os 2 botões à direita
    actionButtons: {
        flexDirection: 'row', 
        width: 70, // Espaço fixo para que o título "Cardápio" fique centralizado
        justifyContent: 'space-between',
    },
    // NOVO ESTILO: Ícone para os 2 botões
    actionButtonIcon: { 
        fontSize: 24,
        color: '#E67E22', 
        fontWeight: 'bold',
    },
    
    searchContainer: { paddingHorizontal: 15, paddingBottom: 10, borderBottomWidth: 1, borderBottomColor: '#eee' },
    searchInput: { height: 45, backgroundColor: '#f2f2f2', borderRadius: 10, paddingHorizontal: 15, fontSize: 16 },
    list: { flex: 1 },
    recipeItem: { backgroundColor: '#f9f9f9', padding: 15, borderBottomWidth: 1, borderBottomColor: '#eee', flexDirection: 'row', alignItems: 'center' },
    thumbnail: { width: 70, height: 70, borderRadius: 10, marginRight: 15, backgroundColor: '#ddd' },
    recipeTitle: { fontSize: 16, fontWeight: '600', color: '#333', flex: 1 },
});