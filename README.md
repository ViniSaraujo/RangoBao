# 🍳 RangoBão - App de Receitas

O **RangoBão** é um aplicativo mobile moderno para gerenciamento e consulta de receitas, desenvolvido como projeto acadêmico. O app permite visualizar cardápios, buscar receitas específicas, conferir detalhes de preparo e cadastrar novas sugestões.

---

## 📸 Screenshots do Projeto

Aqui estão as principais interfaces do aplicativo:

## Login: https://github.com/ViniSaraujo/RangoBao/blob/main/screenshot/Screenshot/login_RB.png

## Cadastro : https://github.com/ViniSaraujo/RangoBao/blob/main/screenshot/Screenshot/Cadastro_RB.png

## Home : https://github.com/ViniSaraujo/RangoBao/blob/main/screenshot/Screenshot/Home_RB.png

## Tela Receitas : https://github.com/ViniSaraujo/RangoBao/blob/main/screenshot/Screenshot/TelaReceitas_RB.png

## Receita : https://github.com/ViniSaraujo/RangoBao/blob/main/screenshot/Screenshot/Receita_RB.png

---

## 🚀 Tecnologias Utilizadas

- **Frontend:** React Native & TypeScript
- **Navegação:** React Navigation (Stack & Tabs)
- **Backend Simulado:** JSON Server (API REST)
- **Motor:** Node.js & Metro Bundler

## 📱 Funcionalidades Principais

- **Autenticação:** Sistema de Login e Cadastro salvando dados no `db.json`.
- **Busca Inteligente:** Foco automático no campo de pesquisa via ícone de lupa.
- **CRUD de Receitas:** Listagem (GET) e Cadastro de novas receitas (POST).
- **Filtro Real-time:** Pesquisa de receitas conforme o usuário digita.

---

## 🛠️ Passo a Passo para Execução (Guia dos 3 Terminais)

Para rodar o projeto corretamente, você deve abrir **3 terminais simultâneos** na raiz do projeto:

### 1. Preparação
Instale as dependências antes da primeira execução:
```bash
npm install

## Execução

TERMINAL 1: Servidor de Dados (Backend)

npx json-server db.json --port 3000 --host 0.0.0.0

TERMINAL 2: Metro Bundler(Roda o servidor compactando os arquivos)

npm start

TERMINAL 3:  Instalação no Android

npm run Android

