# Livraria EntreLinhas — Atividade Final (Web 2 + MySQL)

## Integrantes da Dupla
- **Nichollas Rafael Carvalho Neves Vieira** — Prontuário: **SP3199193**

## Tecnologias Utilizadas e Por Quê
- **HTML5 Semântico**: Estruturação clara com `<header>`, `<nav>`, `<main>`, `<section>`, `<article>` e `<footer>`, hierarquia de títulos e acessibilidade (`alt` e `<label>`).
- **Tailwind CSS + Variáveis CSS (`src/css/styles.css`)**: Estilização responsiva (celular `< 576px`, tablet `768px` e desktop `>= 1200px`) e suporte a tema claro/escuro com `darkMode: "class"`.
- **JavaScript Modular (ES Modules) + Node.js/Express + MySQL (`mysql2`)**: O catálogo de livros foi migrado para o banco relacional **MySQL** (`database/livraria.sql`), consumido via API REST (`/api/livros`) aberta em `src/config/db.js` e `server.js`.

## Estrutura do Banco de Dados (`database/livraria.sql`)
- **Banco:** `livraria_entrelinhas`
- **Tabela `categorias`:** Armazena as categorias dos livros (`id`, `nome`).
- **Tabela `livros`:** Armazena os livros (`id`, `titulo`, `autor`, `categoria_id`, `editora`, `ano`, `paginas`, `destaque`, `descricao`, `preco`, `imagem`) com chave estrangeira para `categorias(id)`.

## Como Rodar o Projeto Localmente
1. **Importe o banco de dados no MySQL:**
   - Abra o **MySQL Workbench**, **phpMyAdmin** ou o terminal do MySQL e execute o arquivo `database/livraria.sql` (ele cria o banco `livraria_entrelinhas`, as tabelas e insere os 12 livros).
2. **Configure a conexão (se necessário):**
   - Verifique o arquivo `src/config/db.js` (padrão: `host: "localhost"`, `user: "root"`, `password: ""`, `database: "livraria_entrelinhas"`).
3. **Instale as dependências e inicie o servidor:**
   ```bash
   npm install
   npm start
   ```
4. **Acesse no navegador:**
   - Abra `http://localhost:3000`.

