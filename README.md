# Vizinhou - Marketplace de Condomínio

Uma plataforma web para moradores de condomínios comprarem, venderem e trocarem itens entre si.

## Funcionalidades

- Autenticação social (Google e Facebook)
- Cadastro e gerenciamento de produtos
- Sistema de trocas
- Chat entre usuários
- Notificações

## Tecnologias Utilizadas

- Next.js 14
- React
- Firebase (Authentication, Firestore, Storage)
- Tailwind CSS

## Configuração do Ambiente

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/vizinhou.git
cd vizinhou
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
- Crie um projeto no [Firebase Console](https://console.firebase.google.com)
- Ative a Authentication com Google e Facebook
- Crie um banco de dados Firestore
- Configure o Storage
- Copie as configurações do projeto para o arquivo `.env.local`

4. Execute o projeto em desenvolvimento:
```bash
npm run dev
```

## Configuração do Assistente Virtual (ChatGPT)

Para utilizar o assistente virtual, você precisa:

1. Criar uma conta na [OpenAI](https://platform.openai.com/signup)
2. Gerar uma chave de API no [painel da OpenAI](https://platform.openai.com/api-keys)
3. Copiar a chave e adicionar ao arquivo `.env.local`:
```
OPENAI_API_KEY=sua_chave_api_aqui
```

O assistente virtual ajudará os usuários com:
- Dúvidas sobre compras e vendas
- Informações sobre o funcionamento do app
- Suporte para trocas e negociações
- Dicas de uso da plataforma

## Estrutura do Projeto

```
src/
  ├── app/              # Páginas da aplicação
  ├── components/       # Componentes reutilizáveis
  ├── lib/             # Configurações e utilitários
  └── types/           # Definições de tipos TypeScript
```

## Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes. 