# Fluffy Notes

Fluffy Notes é um aplicativo web de anotações fofinhas, feito com Next.js, Firebase, React, Tailwind CSS e shadcn/ui.

## Funcionalidades
- Cadastro e login de usuários (email/senha)
- Recuperação de senha
- Criação, edição e exclusão de notas
- Seleção de "mood" para cada nota
- Favoritar notas
- Visualização de notas sumarizadas
- Interface responsiva e animada

## Tecnologias
- Next.js
- React
- Firebase (Auth & Firestore)
- Tailwind CSS
- shadcn/ui
- Reactfire

## Como rodar localmente
1. Clone o repositório:
   ```bash
   git clone <url-do-repo>
   cd fluffy-notes
   ```
2. Instale as dependências:
   ```bash
   npm install
   # ou
   yarn
   ```
3. Configure o Firebase:
   - Crie um projeto no [Firebase Console](https://console.firebase.google.com/)
   - Ative Auth (Email/Senha) e Firestore
   - Copie as credenciais para o arquivo de configuração em `components/firebase-providers.tsx`
   - Ajuste as regras do Firestore conforme o README ou sua necessidade
4. Rode o projeto:
   ```bash
   npm run dev
   # ou
   yarn dev
   ```
5. Acesse [http://localhost:3000](http://localhost:3000)

## Estrutura de coleções do Firestore
- `users`: dados do usuário (name, email, photoURL...)
- `notes`: cada nota com title, content, moodId, userId, createdAt, favorite
- `moods`: lista de moods disponíveis (name, color, imageURL)

## Regras recomendadas do Firestore
```js
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /notes/{noteId} {
      allow create: if request.auth != null && request.auth.uid == request.resource.data.userId;
      allow read, update, delete: if request.auth != null && request.auth.uid == resource.data.userId;
    }
    match /moods/{moodId} {
      allow read: if true;
    }
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

## 🎨 Sistema de Temas

O Fluffy Notes possui um sistema de temas inspirado nos personagens da Sanrio:

### Temas Disponíveis

- **Hello Kitty** - Rosa fofo e adorável
- **My Melody** - Rosa suave e delicado  
- **Kuromi** - Roxo misterioso e elegante
- **Cinnamonroll** - Bege aconchegante e caloroso
- **Pompompurin** - Amarelo alegre e ensolarado
- **Keroppi** - Verde fresco e natural
- **Pochacco** - Azul tranquilo e sereno

### Como Usar

1. Clique no ícone de paleta na navbar
2. Escolha seu personagem favorito da Sanrio
3. O tema será aplicado automaticamente e salvo no localStorage

### Adicionando Novos Temas

Para adicionar um novo tema, edite o arquivo `components/theme-provider.tsx`:

```typescript
{
  id: "novo-tema",
  name: "Nome do Tema",
  colors: {
    primary: "#cor-principal",
    secondary: "#cor-secundaria", 
    accent: "#cor-destaque",
    background: "#cor-fundo",
    text: "#cor-texto",
    cardBg: "#cor-card-transparente",
  },
  wallpaper: "/caminho-para-wallpaper.png",
}
```

As imagens de fundo devem ser colocadas na pasta `public/`.

## Licença
MIT